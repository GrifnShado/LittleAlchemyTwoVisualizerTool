import { ComboElement, ParentPair, ConstraintPair } from "./combo_element";
import { TextToHashMaps } from "../generate_combo_map/txt_to_hash_maps";
import { BadInputError } from "../other/custom_errors";

/* Notes:
 * 
 * - Create the map in here
 * - The generation methods have their own dedicated file
 * - The manupulation methods post generation may or may not
 * have their own dedicated files.
 * 
 */

export class ComboMap {

    // So the debug combo map should call this variable from here.
    protected static canCreateDebugMap = false;

    /**
     * This is the array of strings. Each string is written as 
     * 'a, b, c', or 'a, b, c, d'.
     * 
     * combosTxtArr =>
     *
     * ['water, fire, steam', 'water, earth, mud', ...etc]
     * 
     */
    #combosTxtArr: string[]; 

    #nameToIdMap: Map<string, number>;
    #idToObjMap: Map<number, ComboElement>;
    #rowToIdsMap: Map<number, number[]>;

    constructor(rawComboStrData?: string){

        // This allows me to run the Combo Map in debug mode. This is only turned on in
        // the DebugComboMap class.
        if (ComboMap.canCreateDebugMap === true) {
            return;
        }

        try {

            // throw error here if empty
            if (rawComboStrData == undefined || rawComboStrData.length === 0) {
                throw new BadInputError('The rawComboStrData parameter is empty.');
            }

            // first, convert the raw data into a filtered array of combinations
            // However, throw an error if the combo text isn't viable.
            this.#combosTxtArr = TextToHashMaps.convertComboTextToStrArr(rawComboStrData);            

            // Generate the hash maps
            this.#convertTextStrArrToHashMaps(this.#combosTxtArr);

            // debug
            console.log(`Hash maps so far:`);
            console.log(this.getElementMapAsStr(this.#nameToIdMap));
            console.log(this.getElementMapAsStr(this.#idToObjMap));
            console.log(this.getElementMapAsStr(this.#rowToIdsMap));

            // Update the childOf/parentOf/cycChildOf/cycParentOf sets of each element
            this.updateComboElementRelations();

            // TODO
            // Generate the constraints
            
            // TODO
            // Draw the map

        } catch (error) {

            //if blah blah blah

            //for now
            console.log(error.type);
            console.log(error.message);

        }

    }//constructor
    
    /* -------------------- GETTERS AND SETTERS -------------------- */

    // These protected getters and setters are for unit testing. These are
    // used by the DebugComboMap class

    protected getNameToIdMap() {
        return this.#nameToIdMap;
    }
    protected getIdToObjMap() {
        return this.#idToObjMap;
    }
    protected getRowToIdsMap() {
        return this.#rowToIdsMap;
    }
    
    protected setNameToIdMap(map: Map<string, number>) {
        this.#nameToIdMap = map;
    }
    protected setIdToObjMap(map: Map<number, ComboElement>) {
        this.#idToObjMap = map;
    }
    protected setRowToIdsMap(map: Map<number, number[]>) {
        this.#rowToIdsMap = map;
    }

    /* -------------------------- METHODS -------------------------- */

    /**
     * This is a super method that calls other generation methods from the
     * class TextToHashMaps. 
     */
    #convertTextStrArrToHashMaps(comboTxtArr: string[]){

        this.#nameToIdMap = TextToHashMaps.createNameToIdMap(comboTxtArr);

        this.#idToObjMap = TextToHashMaps.createIdToObjMap(comboTxtArr, 
            this.#nameToIdMap);

        this.#rowToIdsMap = TextToHashMaps.createRowToIdsMap(this.#idToObjMap);

        // debug
        console.log('All maps:');
        console.log(this.#nameToIdMap);
        console.log(this.#idToObjMap);
        console.log(this.#rowToIdsMap);

    }//convertTextStrArrToHashMaps

    /**
     * Go through the idToObj map and update the childOf/parentOf sets and the
     * cyclical childOf/ParentOf sets
     */
    protected updateComboElementRelations() {

        // Go through the id to obj map

        for (let i = 1; i <= this.#idToObjMap.size; i++) {

            const elem = this.#idToObjMap.get(i);

            //console.log(`Now on elem `);

            // Base elements have their parentPairs array set to null
            if (elem.parentPairs !== null) {

                // Update the childOf set of the element and parentOf sets of the
                // element's parents
                for (let j = 0; j < elem.parentPairs.length; j++) {
                
                    const pPair = elem.parentPairs[j];
    
                    // Add the parent pair ids to the element's childOf set
                    elem.addChildOf(pPair.get(0));
                    elem.addChildOf(pPair.get(1));
    
                    // Fetch the element of the parent pair ids and add the child's
                    // id to those parent's prentOf sets
                    this.#idToObjMap.get(pPair.get(0)).addParentOf(elem.id);
                    this.#idToObjMap.get(pPair.get(1)).addParentOf(elem.id);
    
                }
            }

            // Update the cyclical childOf set of the element and parentOf sets
            // of the element's cyclical parents
            for (let k = 0; k < elem.cyclicalParentPairs.length; k++) {
                
                const pPair = elem.cyclicalParentPairs[k];

                // Add the parent pair ids to the element's childOf set
                elem.addCyclicalChildOf(pPair.get(0));
                elem.addCyclicalChildOf(pPair.get(1));

                // Fetch the element of the parent pair ids and add the child's
                // id to those parent's prentOf sets
                this.#idToObjMap.get(pPair.get(0)).addCyclicalParentOf(elem.id);
                this.#idToObjMap.get(pPair.get(1)).addCyclicalParentOf(elem.id);

            }

        }

    }//updateComboElementRelations

    /* -------------------------- PRINT METHODS -------------------------- */

    public getElementMapAsStr<K,V>(elemMap: Map<K,V>){

        // throw an error if the map is empty
        if (elemMap == null || elemMap.size === 0) {
            throw new BadInputError('The passed in map is empty.');
        }

        // Get the first key and value
        const iterator = elemMap.keys();
        let key: K = iterator.next().value;
        let value: V = elemMap.get(key);

        /**
         * Keeps track of what map type I'm working with.
         * 1 = nameToIdMap, 2 = idToObjMap, 3 = rowToIdsMap
         */
        let typeOfMapNum = 0;

        // Check the typing
        if (typeof key === 'string' && typeof value === 'number'){
            typeOfMapNum = 1;
        } else if (typeof key === 'number') {
            if (value instanceof ComboElement){
                typeOfMapNum = 2;
            } else if (value instanceof Array){
                if (typeof value[0] === 'number'){
                    typeOfMapNum = 3;
                } 
            }
        } else {
            // throw error, wrong type
            throw new BadInputError('The passed in map is the wrong type. Please ' +
                'pass in maps of type <string, number>, <number, ComboElement>, ' +
                'or <number, number[]>');
        }

        let returnStr: string = ``;

        while(key != null) {

            // Write the first part- a key
            returnStr = returnStr + `${key}\t| `;

            // Now write the value
            if (typeOfMapNum === 1) {
                returnStr = returnStr + `${value}\n`;
            } else if (typeOfMapNum === 2) {
                returnStr = returnStr + `${(value as ComboElement).getComboElementAsStr(false)}\n`;
            } else {
                returnStr = returnStr + `${(value as Array<number>).toString()}\n`;
            }

            // Advance the iterator
            key = iterator.next().value;
            value = elemMap.get(key);

        }

        // Finally, clean up the string and return
        returnStr = returnStr.substring(0, returnStr.length - 1);
        return returnStr;

    }


}// class