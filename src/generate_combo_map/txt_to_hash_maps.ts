// blah blah add fxns
import { ComboElement, ParentPair } from "../base_files/combo_element";
import { BadInputError } from "../other/custom_errors";

// DO NOT MODIFY COMBO MAP DIRECTLY
// input -> output hash maps

export class TextToHashMaps {

     /**
     * Filters and converts the combosStr from the combos file into a string 
     * array and then returns it. It will throw an error if the combosStr is 
     * invalid.
     * 
     * Note: the return string arr will look something like this:
     * 
     * [ 'water, fire, steam', 'earth, water, mud', etc.]
     * 
     * @param {string} combosStr the text data from the combos file
     */
    static convertComboTextToStrArr(combosStr: string) {

        /* The combos should look like the following:
         * a, b, c
         * d, e, f
         * So the array will break down the list by comma AND
         * by enter/return characters. It will throw an error
         * if this format isn't done (so you don't get
         * unpredictable results)
         * 
         * Side note: In the future, multiple resulting
         * combinations can be used and broken down by this code.
         * For example:
         * a, b, e, f (a + b combine into e and f)
         * can be rewritten as
         * a, b, e
         * a, b, f
         * But for now, this feature isn't added.
         */

        /* ----- Step 0: Prep the string and turn it into an array ----- */

        // Get rid of any carriage return spaces and replace them with typical
        // enter spaces. Raise your hand if you tend to carraige return more
        // than you should
        // *I raise my hand*
        let alteredText:string  = combosStr.replaceAll('\r', '\n');

        // Split the list by enter spaces
        //let alteredTextList = alteredText.split('\n');
        let alteredTextList: string[] = alteredText.split('\n');

        // There may be a better way to do this, but this is what I came up with
        // for filtering out double enters and whatnot
        let noDoubleEnterTextList: string[] = [];

        /* ----- Step 1: check if the string is valid ----- */

        for (const elementComboStr of alteredTextList) {

            // If the elementComboStr is empty due to something like double enters, skip that 
            if (elementComboStr.length === 0 || elementComboStr.length == null) {
                continue;
            } else {
                noDoubleEnterTextList.push(elementComboStr);
            }
            
            // Next, check if each element has 2 commas and 3 words
            const splitElementList: string[] = elementComboStr.split(',');

            // If there are more or less than 3 elements in the list, then there is something wrong
            if (splitElementList.length < 3 || splitElementList.length > 4) {
                throw new BadInputError(`The combination line '${splitElementList.toString()}' should have `+
                `3 or 4 terms, but it has ${splitElementList.length} terms instead.`);
            }
            
            // Now check if any of the elements are empty
            for (const elem of splitElementList) {

                if (elem.trim() == '') {
                    throw new BadInputError(`The combination line '${splitElementList.toString()}' ` +
                    `has at least 1 empty term.`);
                }
            }
            

        }//for-of alteredTextList

        // Now set alteredTextList to the noDoubleEnter string one.
        alteredTextList = noDoubleEnterTextList;

        /* ----- Step 2: clean the alteredTextList ----- */

        // Note: this is done separately because if the combos str is invalid, I don't 
        // want to do unnecessary work before finding that out.

        // Now clean the list
        for (let i: number = 0; i < alteredTextList.length; i++) {

            // Prepare for cleaning
            let newElementComboStr: string = '';

            //debug
            //console.log(`alteredTextList, step 2: ${alteredTextList}`);

            let splitElementList: string[] = alteredTextList[i].split(',');

            //debug
            //console.log(`splitElementList, step 2: ${splitElementList}`);

            // Clean each element in the element combo
            for (let j: number = 0; j < splitElementList.length; j++) {

                //debug
                //console.log(`splitElementList[j]: ${splitElementList[j]}`);

                let currentElem = splitElementList[j];

                // Get rid of extra while space
                currentElem = currentElem.trim();

                // Set the string to all lowercase to prevent unnecessary capitalization duplicates
                currentElem = currentElem.toLowerCase();

                // add the cleaned element to the new element combo string
                newElementComboStr = newElementComboStr + currentElem + ', '
                
            }//for j

            //debug
            //console.log(`newElementComboStr before , :\n ${newElementComboStr}`);

            // Take off that last ', '
            newElementComboStr = newElementComboStr.substring(0, newElementComboStr.length - 2);

            //debug
            //console.log(`newElementComboStr after , :\n ${newElementComboStr}`);

            // Now update the alteredTextList
            alteredTextList[i] = newElementComboStr;

        }//for i

        // Now return the list!
        return alteredTextList;

    }//convertComboTextToStrArr

    static createNameToIdMap(comboTxtArr: string[]){

        // Map
        const newNameToIdMap: Map<string, number> = new Map<string, number>();

        // id generation
        let idCount = 1;

        // Set for generating names
        for (const comboStr of comboTxtArr) {

            // First break up comboStr
            const elementsInComboStr: string[] = comboStr.split(',');

            // Now go through each element
            for (const elem of elementsInComboStr) {
                
                // trim (since the space is left there on purpouse)
                let editedElemStr: string = elem.trim();

                // Check if it's in the map
                if (newNameToIdMap.has(editedElemStr) === false) {

                    // Since it's not, add it to the map
                    newNameToIdMap.set(editedElemStr, idCount);

                    // Increment idCount
                    idCount++;

                }

            }// for elem in comboStr

        }//for comboTxtArr

        // Map complete, return it!
        return newNameToIdMap;

    }//createNameToIdMap


    static createIdToObjMap(comboTxtArr: string[], nameToIdMap: Map<string, number>){

        // Throw an error if the nameToId map is empty
        if (nameToIdMap == null || nameToIdMap.size === 0) {
            throw new BadInputError('The nameToIdMap parameter is empty.');
        }

        // Map
        const newIdToObjMap: Map<number, ComboElement> = new Map<number, ComboElement>();

        // Go through the comboTxtArr again, but this time I'm creating element objects    
        for (const comboStr of comboTxtArr) {

            // First break up comboStr
            const elementsInComboStr: string[] = comboStr.split(',');

            // Store the two parent ids and row nums in this arr for ease of use
            const parentIds: number[] = [];
            const parentRowNums: number[] = [];

            // Elements 1 and 2 -> get parent ids, create objs for base elements
            for (let i = 0; i < 2; i++){

                // get the element name
                const elemName: string = elementsInComboStr[i].trim();

                // Add the parent id to the parentIdsArr
                parentIds[i] = nameToIdMap.get(elemName);

                // If the parent element doesn't exist, which means it's a base element
                // (e.g. fire, water, earth, air, etc.) create it
                if (newIdToObjMap.has(parentIds[i]) === false) {

                    // create base element parent
                    newIdToObjMap.set(parentIds[i], new ComboElement(parentIds[i], elemName,
                        null, 0));

                }

            }//for i

            // Since the parent elements exist, update the parentRowNums array
            parentRowNums[0] = newIdToObjMap.get(parentIds[0]).rowNumber;
            parentRowNums[1] = newIdToObjMap.get(parentIds[1]).rowNumber;

            // Elements 3 and maybe 4 -> handle as children. I use .length
            // in case the 4th element doesn't exist.
            for (let j = 2; j < elementsInComboStr.length; j++){

                // Child element name and id
                const childName: string = elementsInComboStr[j].trim();
                const childId: number = nameToIdMap.get(childName);

                // Now handle the child element(s)
                this.handleChildElements(childName, childId, parentIds, parentRowNums, 
                    newIdToObjMap);

            }//for j

        }//for comboTxtArr

        // Now return the idToObjMap!
        return newIdToObjMap;

    } //createIdToObjMap

    static handleChildElements(childName: string, childId: number, parentIds: number[],
         parentRowNums: number[], newIdToObjMap: Map<number, ComboElement>) {

        // Qu 1: does the child element exist
        if (newIdToObjMap.has(childId) === true) {

            // Get the child row num
            const existingChildRowNum: number = newIdToObjMap.get(childId).rowNumber;

            // Qu 2: Is this a cyclical combo? (at least one of the parent's row nums
            // is equal to or larger than the pre-existing child element's row num)
            if (parentRowNums[0] >= existingChildRowNum ||
                parentRowNums[1] >= existingChildRowNum) {
                
                // add the additional parent combo to the child element on the map. 
                newIdToObjMap.get(childId).addCyclicalParentPair(null, parentIds);
            
            // Not a cyclical combo
            } else {

                // add the additional parent combo to the child element on the map. 
                newIdToObjMap.get(childId).addParentPair(null, parentIds);

                // Qu 3: Is this a smaller parent combo?
                // Ex. Let's say mud = rain (say row 5) + dirt (say row 4).
                // But if later, it's found water + earth = mud, then mud 
                // should be in row 1, not 6.    
                if (parentRowNums[0] < existingChildRowNum && 
                    parentRowNums[1] < existingChildRowNum) {

                    // calculate the child's new row number
                    const newRowNum = ComboElement.calculateRowNum(parentRowNums[0],
                        parentRowNums[1]);

                    // Update the element's row number
                    newIdToObjMap.get(childId).rowNumber = newRowNum;

                }
            }

        // The map DOES NOT have the combo element for this id,
        // so create a new child element
        } else {

            // calculate the child's row num
            const childRowNum = ComboElement.calculateRowNum(parentRowNums[0], parentRowNums[1]);

            // Create a new parent pair
            const parentPair: ParentPair = new ParentPair(parentIds[0], parentIds[1]);

            newIdToObjMap.set(childId,
                new ComboElement(childId, childName, parentPair, childRowNum));

        } // if child element exists or not

    }//handleChildElements

    static createRowToIdsMap(idToObjMap: Map<number, ComboElement>){

        const newRowToIdsMap: Map<number, number[]> = new Map<number, number[]>();

        // Throw an error if the idToObjMap is empty
        if (idToObjMap == null || idToObjMap.size === 0) {
            throw new BadInputError('The idToObjMap parameter is empty.');
        }

        let idCount: number = 1;
        
        while (idCount <= idToObjMap.size) {

            // Get the rowNum of the element
            const elemRowNum = idToObjMap.get(idCount).rowNumber;

            if (newRowToIdsMap.has(elemRowNum) === false) {

                // Create a new rowIdArr and add the rowNum to it
                const newRowArr: number[] = [];
                newRowArr.push(idCount);
                newRowToIdsMap.set(elemRowNum, newRowArr);
                
            } else {

                // The key already exists, add it to the array
                newRowToIdsMap.get(elemRowNum).push(idCount);

            }

            // increment the id count
            idCount++;
        }

        // return the new map
        return newRowToIdsMap;
    }


}//class TextToHashMaps