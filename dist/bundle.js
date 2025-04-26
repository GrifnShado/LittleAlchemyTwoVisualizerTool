/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base_files/combo_element.ts":
/*!*****************************************!*\
  !*** ./src/base_files/combo_element.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboElement: () => (/* binding */ ComboElement),
/* harmony export */   ConstraintPair: () => (/* binding */ ConstraintPair),
/* harmony export */   ParentPair: () => (/* binding */ ParentPair)
/* harmony export */ });
/* harmony import */ var _other_custom_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../other/custom_errors */ "./src/other/custom_errors.ts");
/* ================================================================= */
/* ------------------------- COMBO ELEMENT ------------------------- */
/* ================================================================= */

/**
 * Need to make a description here, too lazy rn
 */
class ComboElement {
    /* -------------------------- FIELDS -------------------------- */
    /**
     * Mainly used to generate ids for all of the elements, but
     * useful knowledge nonetheless!
     */
    static #numOfElements = 0;
    #id;
    #name;
    /**
     * The row number. The base elements fire, water, earth, wind, etc.
     * are all row 0. After that, the row number is determined by the
     * first combo listed in the combos txt file- the row number is +1
     * of the parent's with the largest row num.
     *
     * Examples:
     *
     * water + earth = mud |
     * water = 0, earth = 0, so 0 + 1 = 1, making mud = 1.
     *
     * water + lake = sea |
     * water = 0, let's say lake = 3, so 3 + 1 = 4, making sea = 4.
     */
    #rowNum;
    /**
     * This is an array of parent pairs for each listed combo. This can
     * be null for base elements, such as water and fire.
     */
    #parentPairs;
    /**
     * This set is a list of parent ids this element is a child of.
     * This can be null for base elements, such as water and fire.
     */
    #childOf;
    /**
     * This set is a list of child ids this element is a parent of.
     */
    #parentOf;
    /**
     * Sometimes a previous element can be created by later elements.
     * For example, lightening + woods = fire. Fire is still a row 0
     * element, and the map handles cyclical parents differently
     */
    #cyclicalParentPairs;
    /**
     * This set is a list of cyclical parent ids this element is a
     * cyclical child of.
     */
    #cyclicalChildOf;
    /**
     * This set is a list of cyclical child ids this element is a
     * cyclical parent of.
     */
    #cyclicalParentOf;
    /* ------------------------ CONSTRUCTOR ------------------------ */
    constructor(id, name, parentPair, rowNum) {
        // Instantiate and set the parent pair arr, or don't if it's a base
        // element. By making the whole thing null, this should prevent the 
        // issue of adding parent pairs that shouldn't be there. The same
        // thing applies to the childOf set
        if (parentPair === null) {
            this.#parentPairs = null;
            this.#childOf = null;
        }
        else {
            this.#parentPairs = [];
            this.#parentPairs.push(parentPair);
            this.#childOf = new Set();
        }
        // Instantiate arrays
        this.#parentOf = new Set();
        this.#cyclicalParentPairs = new Array();
        this.#cyclicalChildOf = new Set();
        this.#cyclicalParentOf = new Set();
        // Set properties
        this.#id = id;
        this.#name = name;
        this.#rowNum = rowNum;
    } //constructor
    /* -------------------- GETTERS AND SETTERS -------------------- */
    static get numOfElements() {
        return this.#numOfElements;
    }
    // static #nextId() {
    //     this.#numOfElements++;
    //     return this.#numOfElements;
    // }
    // Base parameters
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get rowNumber() {
        return this.#rowNum;
    }
    set rowNumber(rowNum) {
        this.#rowNum = rowNum;
    }
    // parent - child
    get parentPairs() {
        return this.#parentPairs;
    }
    get childOf() {
        return this.#childOf;
    }
    get parentOf() {
        return this.#parentOf;
    }
    addParentPair(pPair, pairArr, p1, p2) {
        // Useful for post generation security later
        if (this.#parentPairs === null) {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_0__.BadInputError(`You cannot add a parent pair to a base element.`);
        }
        else {
            if (pPair != null) {
                this.#parentPairs.push(pPair);
            }
            else if (pairArr != null && pairArr.length === 2) {
                const arrPPair = new ParentPair(pairArr[0], pairArr[1]);
                this.#parentPairs.push(arrPPair);
            }
            else if (p1 != null && p2 != null) {
                const numPPair = new ParentPair(p1, p2);
                this.#parentPairs.push(numPPair);
            }
            else {
                throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_0__.BadInputError('Invalid input. Please add one Parent Pair, a number ' +
                    'array of length 2, or two numbers.');
            }
        }
    }
    addChildOf(parentId) {
        // Useful for post generation security later
        if (this.#childOf === null) {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_0__.BadInputError(`You cannot add a childOf id to a base element.`);
        }
        else {
            this.#childOf.add(parentId);
        }
    }
    addParentOf(childId) {
        this.#parentOf.add(childId);
    }
    // cyclical parent - child
    get cyclicalParentPairs() {
        return this.#cyclicalParentPairs;
    }
    get cyclicalChildOf() {
        return this.#cyclicalChildOf;
    }
    get cyclicalParentOf() {
        return this.#cyclicalParentOf;
    }
    addCyclicalParentPair(pPair, pairArr, p1, p2) {
        if (pPair != null) {
            this.#cyclicalParentPairs.push(pPair);
        }
        else if (pairArr != null && pairArr.length === 2) {
            const arrPPair = new ParentPair(pairArr[0], pairArr[1]);
            this.#cyclicalParentPairs.push(arrPPair);
        }
        else if (p1 != null && p2 != null) {
            const numPPair = new ParentPair(p1, p2);
            this.#cyclicalParentPairs.push(numPPair);
        }
        else {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_0__.BadInputError('Invalid input. Please add one Parent Pair, a number ' +
                'array of length 2, or two numbers.');
        }
    }
    addCyclicalChildOf(cyclicalParentId) {
        this.#cyclicalChildOf.add(cyclicalParentId);
    }
    addCyclicalParentOf(cyclicalChildId) {
        this.#cyclicalParentOf.add(cyclicalChildId);
    }
    /* -------------------------- METHODS -------------------------- */
    /**
     * A very simple method that I didn't feel like writing twice
     * It returns the largest number + 1
     * Ex. (1,3) -> return 4, (5,2) -> return 6
     *
     * @param r1 parent 1's row number
     * @param r2 parent 2's row number
     */
    static calculateRowNum(r1, r2) {
        if (r1 >= r2) {
            return r1 + 1;
        }
        else {
            return r2 + 1;
        }
    }
    /**
     * This is a security method to protect an element when adding
     * new parent pairs on a post-generated combo map. When generating
     * the combos, the added combos should already be unique.
     *
     * THIS IS A STUB
     *
     * @param pair
     */
    checkIfParentPairIsUnique(pair) {
    }
    /**
     * Used for both normal and cyclical parent pairs
     * Output: { [id1, id2], [id1, id2], ... etc. }
     */
    getParentPairsAsStr(isCyclical) {
        let arrToIterate = null;
        if (isCyclical === false) {
            arrToIterate = this.#parentPairs;
        }
        else {
            arrToIterate = this.#cyclicalParentPairs;
        }
        // return 'null' if it's null. This happens with base elements
        if (arrToIterate === null) {
            return 'null';
        }
        // return {} if empty
        if (arrToIterate.length === 0) {
            return '{}';
        }
        let returnStr = `{ `;
        // Adds '[id1, id2], ' to the returnStr
        for (const pPair of arrToIterate) {
            returnStr = returnStr + pPair.printPairAsStr() + `, `;
        }
        // Cut off the last ', ' and add a ' }' instead
        returnStr = returnStr.substring(0, returnStr.length - 2);
        returnStr = returnStr + ` }`;
        return returnStr;
    } // getParentPairsAsStr
    // TODO: Finish updating this in the future
    /**
     * Output: "< name: 'name', id: 'id', pPairs: {...}, rowNumber: 'rowNum' >"
     */
    getComboElementAsStr(doFullString) {
        // I can do full and short. Full includes the childOf/etc. sets
        let returnStr = `< name: ${this.#name}, id: ${this.#id}, parentPairs: ` +
            `${this.getParentPairsAsStr(false)}, cyclicalParentPairs: ` +
            `${this.getParentPairsAsStr(true)}, rowNumber: ${this.#rowNum} >`;
        if (doFullString === true) {
            returnStr = returnStr.substring(0, returnStr.length - 2);
            returnStr = returnStr + `, childOf: ${this.setToString(this.#childOf)}, ` +
                `parentOf: ${this.setToString(this.#parentOf)}, ` +
                `cyclicalChildOf: ${this.setToString(this.#cyclicalChildOf)}, ` +
                `cyclicalParentOf: ${this.setToString(this.#cyclicalParentOf)} >`;
        }
        return returnStr;
    }
    setToString(s) {
        if (s == null) {
            return 'null';
        }
        // Get the iterator and the first value in it
        const iterator = s.values();
        let nextVal = iterator.next().value;
        let returnStr = `{`;
        while (nextVal != null) {
            returnStr = returnStr + `${nextVal}, `;
            // Advance the iterator
            nextVal = iterator.next().value;
        }
        // Clean up and prepare the string
        if (returnStr.length !== 1) {
            returnStr = returnStr.substring(0, (returnStr.length - 2));
        }
        returnStr = returnStr + `}`;
        return returnStr;
    }
} // class Combo Element 
/* ================================================================= */
/* -------------------------- PAIR CLASSES ------------------------- */
/* ================================================================= */
/**
 * A simple class to help preserve combo information. It only
 * holds two ids. This class prevents problems with number[][]
 * dubious typing and confusion
 */
class ParentPair {
    #pair = [];
    constructor(p1Id, p2Id) {
        this.#pair.push(p1Id);
        this.#pair.push(p2Id);
    }
    get pair() {
        return this.#pair;
    }
    get(index) {
        return this.#pair[index];
    }
    printPairAsStr() {
        return `[${this.#pair[0]}, ${this.#pair[1]}]`;
    }
} //class ParentPair
// /**
//  * Another helper class to make my life a little easier
//  */
class ConstraintPair {
    /**
     * The id to constrain to
     */
    #constrId;
    /**
     * prime mod base list
     */
    #modList;
    constructor(idToConstrainTo, primeModBaseList) {
        this.#constrId = idToConstrainTo;
        this.#modList = primeModBaseList;
    }
    get constrId() {
        return this.#constrId;
    }
    get modList() {
        return this.#modList;
    }
} //class ConstraintPair


/***/ }),

/***/ "./src/base_files/combo_map.ts":
/*!*************************************!*\
  !*** ./src/base_files/combo_map.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboMap: () => (/* binding */ ComboMap)
/* harmony export */ });
/* harmony import */ var _combo_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combo_element */ "./src/base_files/combo_element.ts");
/* harmony import */ var _generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generate_combo_map/txt_to_hash_maps */ "./src/generate_combo_map/txt_to_hash_maps.ts");
/* harmony import */ var _other_custom_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../other/custom_errors */ "./src/other/custom_errors.ts");



/* Notes:
 *
 * - Create the map in here
 * - The generation methods have their own dedicated file
 * - The manupulation methods post generation may or may not
 * have their own dedicated files.
 *
 */
class ComboMap {
    // So the debug combo map should call this variable from here.
    static canCreateDebugMap = false;
    /**
     * This is the array of strings. Each string is written as
     * 'a, b, c', or 'a, b, c, d'.
     *
     * combosTxtArr =>
     *
     * ['water, fire, steam', 'water, earth, mud', ...etc]
     *
     */
    #combosTxtArr;
    #nameToIdMap;
    #idToObjMap;
    #rowToIdsMap;
    constructor(rawComboStrData) {
        // This allows me to run the Combo Map in debug mode. This is only turned on in
        // the DebugComboMap class.
        if (ComboMap.canCreateDebugMap === true) {
            return;
        }
        try {
            // throw error here if empty
            if (rawComboStrData == undefined || rawComboStrData.length === 0) {
                throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError('The rawComboStrData parameter is empty.');
            }
            // first, convert the raw data into a filtered array of combinations
            // However, throw an error if the combo text isn't viable.
            this.#combosTxtArr = _generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.convertComboTextToStrArr(rawComboStrData);
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
        }
        catch (error) {
            //if blah blah blah
            //for now
            console.log(error.type);
            console.log(error.message);
        }
    } //constructor
    /* -------------------- GETTERS AND SETTERS -------------------- */
    // These protected getters and setters are for unit testing. These are
    // used by the DebugComboMap class
    getNameToIdMap() {
        return this.#nameToIdMap;
    }
    getIdToObjMap() {
        return this.#idToObjMap;
    }
    getRowToIdsMap() {
        return this.#rowToIdsMap;
    }
    setNameToIdMap(map) {
        this.#nameToIdMap = map;
    }
    setIdToObjMap(map) {
        this.#idToObjMap = map;
    }
    setRowToIdsMap(map) {
        this.#rowToIdsMap = map;
    }
    /* -------------------------- METHODS -------------------------- */
    /**
     * This is a super method that calls other generation methods from the
     * class TextToHashMaps.
     */
    #convertTextStrArrToHashMaps(comboTxtArr) {
        this.#nameToIdMap = _generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createNameToIdMap(comboTxtArr);
        this.#idToObjMap = _generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createIdToObjMap(comboTxtArr, this.#nameToIdMap);
        this.#rowToIdsMap = _generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createRowToIdsMap(this.#idToObjMap);
        // debug
        console.log('All maps:');
        console.log(this.#nameToIdMap);
        console.log(this.#idToObjMap);
        console.log(this.#rowToIdsMap);
    } //convertTextStrArrToHashMaps
    /**
     * Go through the idToObj map and update the childOf/parentOf sets and the
     * cyclical childOf/ParentOf sets
     */
    updateComboElementRelations() {
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
    } //updateComboElementRelations
    /* -------------------------- PRINT METHODS -------------------------- */
    getElementMapAsStr(elemMap) {
        // throw an error if the map is empty
        if (elemMap == null || elemMap.size === 0) {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError('The passed in map is empty.');
        }
        // Get the first key and value
        const iterator = elemMap.keys();
        let key = iterator.next().value;
        let value = elemMap.get(key);
        /**
         * Keeps track of what map type I'm working with.
         * 1 = nameToIdMap, 2 = idToObjMap, 3 = rowToIdsMap
         */
        let typeOfMapNum = 0;
        // Check the typing
        if (typeof key === 'string' && typeof value === 'number') {
            typeOfMapNum = 1;
        }
        else if (typeof key === 'number') {
            if (value instanceof _combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement) {
                typeOfMapNum = 2;
            }
            else if (value instanceof Array) {
                if (typeof value[0] === 'number') {
                    typeOfMapNum = 3;
                }
            }
        }
        else {
            // throw error, wrong type
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError('The passed in map is the wrong type. Please ' +
                'pass in maps of type <string, number>, <number, ComboElement>, ' +
                'or <number, number[]>');
        }
        let returnStr = ``;
        while (key != null) {
            // Write the first part- a key
            returnStr = returnStr + `${key}\t| `;
            // Now write the value
            if (typeOfMapNum === 1) {
                returnStr = returnStr + `${value}\n`;
            }
            else if (typeOfMapNum === 2) {
                returnStr = returnStr + `${value.getComboElementAsStr(false)}\n`;
            }
            else {
                returnStr = returnStr + `${value.toString()}\n`;
            }
            // Advance the iterator
            key = iterator.next().value;
            value = elemMap.get(key);
        }
        // Finally, clean up the string and return
        returnStr = returnStr.substring(0, returnStr.length - 1);
        return returnStr;
    }
} // class


/***/ }),

/***/ "./src/generate_combo_map/file_to_data_str.ts":
/*!****************************************************!*\
  !*** ./src/generate_combo_map/file_to_data_str.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertTxtFileDataToStr: () => (/* binding */ convertTxtFileDataToStr)
/* harmony export */ });
/**
 * One of those "this only exists b/c I need to unit test it" fxns
 * Note that I have to pass in "this", the event function (?), for
 * e. I don't understand, why is JavaScript so jank...
 *
 * Also moved to a seprate file because I don't want my unit tests
 * running my main script.
 */
async function convertTxtFileDataToStr(e) {
    // Save the file as a var for readability
    const fileList = e.files;
    const comboFile = fileList[0];
    // So I can return the string for unit testing
    let returnStr = '';
    /* Okay so bear with me
    * .text() returns the text if it can find it in the file,
    * BUT there's more to it. Instead of saying "here's your
    * string", it creates an async process called a promise.
    * The promise basically achieves, "I'll get that text
    * just wait for me plz". And for reasons I don't completely
    * understand, .then() will return the result as a promise,
    * so you need to pass in a function which then is a string
    * apparently... I don't know
    */
    await comboFile.text().then((result) => {
        // Save the string for modificaiton later
        returnStr = result;
    });
    return returnStr;
} //convertTxtFileDataToStr


/***/ }),

/***/ "./src/generate_combo_map/txt_to_hash_maps.ts":
/*!****************************************************!*\
  !*** ./src/generate_combo_map/txt_to_hash_maps.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextToHashMaps: () => (/* binding */ TextToHashMaps)
/* harmony export */ });
/* harmony import */ var _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base_files/combo_element */ "./src/base_files/combo_element.ts");
/* harmony import */ var _other_custom_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../other/custom_errors */ "./src/other/custom_errors.ts");
// blah blah add fxns


// DO NOT MODIFY COMBO MAP DIRECTLY
// input -> output hash maps
class TextToHashMaps {
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
    static convertComboTextToStrArr(combosStr) {
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
        let alteredText = combosStr.replaceAll('\r', '\n');
        // Split the list by enter spaces
        //let alteredTextList = alteredText.split('\n');
        let alteredTextList = alteredText.split('\n');
        // There may be a better way to do this, but this is what I came up with
        // for filtering out double enters and whatnot
        let noDoubleEnterTextList = [];
        /* ----- Step 1: check if the string is valid ----- */
        for (const elementComboStr of alteredTextList) {
            // If the elementComboStr is empty due to something like double enters, skip that 
            if (elementComboStr.length === 0 || elementComboStr.length == null) {
                continue;
            }
            else {
                noDoubleEnterTextList.push(elementComboStr);
            }
            // Next, check if each element has 2 commas and 3 words
            const splitElementList = elementComboStr.split(',');
            // If there are more or less than 3 elements in the list, then there is something wrong
            if (splitElementList.length < 3 || splitElementList.length > 4) {
                throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadInputError(`The combination line '${splitElementList.toString()}' should have ` +
                    `3 or 4 terms, but it has ${splitElementList.length} terms instead.`);
            }
            // Now check if any of the elements are empty
            for (const elem of splitElementList) {
                if (elem.trim() == '') {
                    throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadInputError(`The combination line '${splitElementList.toString()}' ` +
                        `has at least 1 empty term.`);
                }
            }
        } //for-of alteredTextList
        // Now set alteredTextList to the noDoubleEnter string one.
        alteredTextList = noDoubleEnterTextList;
        /* ----- Step 2: clean the alteredTextList ----- */
        // Note: this is done separately because if the combos str is invalid, I don't 
        // want to do unnecessary work before finding that out.
        // Now clean the list
        for (let i = 0; i < alteredTextList.length; i++) {
            // Prepare for cleaning
            let newElementComboStr = '';
            //debug
            //console.log(`alteredTextList, step 2: ${alteredTextList}`);
            let splitElementList = alteredTextList[i].split(',');
            //debug
            //console.log(`splitElementList, step 2: ${splitElementList}`);
            // Clean each element in the element combo
            for (let j = 0; j < splitElementList.length; j++) {
                //debug
                //console.log(`splitElementList[j]: ${splitElementList[j]}`);
                let currentElem = splitElementList[j];
                // Get rid of extra while space
                currentElem = currentElem.trim();
                // Set the string to all lowercase to prevent unnecessary capitalization duplicates
                currentElem = currentElem.toLowerCase();
                // add the cleaned element to the new element combo string
                newElementComboStr = newElementComboStr + currentElem + ', ';
            } //for j
            //debug
            //console.log(`newElementComboStr before , :\n ${newElementComboStr}`);
            // Take off that last ', '
            newElementComboStr = newElementComboStr.substring(0, newElementComboStr.length - 2);
            //debug
            //console.log(`newElementComboStr after , :\n ${newElementComboStr}`);
            // Now update the alteredTextList
            alteredTextList[i] = newElementComboStr;
        } //for i
        // Now return the list!
        return alteredTextList;
    } //convertComboTextToStrArr
    static createNameToIdMap(comboTxtArr) {
        // Map
        const newNameToIdMap = new Map();
        // id generation
        let idCount = 1;
        // Set for generating names
        for (const comboStr of comboTxtArr) {
            // First break up comboStr
            const elementsInComboStr = comboStr.split(',');
            // Now go through each element
            for (const elem of elementsInComboStr) {
                // trim (since the space is left there on purpouse)
                let editedElemStr = elem.trim();
                // Check if it's in the map
                if (newNameToIdMap.has(editedElemStr) === false) {
                    // Since it's not, add it to the map
                    newNameToIdMap.set(editedElemStr, idCount);
                    // Increment idCount
                    idCount++;
                }
            } // for elem in comboStr
        } //for comboTxtArr
        // Map complete, return it!
        return newNameToIdMap;
    } //createNameToIdMap
    static createIdToObjMap(comboTxtArr, nameToIdMap) {
        // Throw an error if the nameToId map is empty
        if (nameToIdMap == null || nameToIdMap.size === 0) {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadInputError('The nameToIdMap parameter is empty.');
        }
        // Map
        const newIdToObjMap = new Map();
        // Go through the comboTxtArr again, but this time I'm creating element objects    
        for (const comboStr of comboTxtArr) {
            // First break up comboStr
            const elementsInComboStr = comboStr.split(',');
            // Store the two parent ids and row nums in this arr for ease of use
            const parentIds = [];
            const parentRowNums = [];
            // Elements 1 and 2 -> get parent ids, create objs for base elements
            for (let i = 0; i < 2; i++) {
                // get the element name
                const elemName = elementsInComboStr[i].trim();
                // Add the parent id to the parentIdsArr
                parentIds[i] = nameToIdMap.get(elemName);
                // If the parent element doesn't exist, which means it's a base element
                // (e.g. fire, water, earth, air, etc.) create it
                if (newIdToObjMap.has(parentIds[i]) === false) {
                    // create base element parent
                    newIdToObjMap.set(parentIds[i], new _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(parentIds[i], elemName, null, 0));
                }
            } //for i
            // Since the parent elements exist, update the parentRowNums array
            parentRowNums[0] = newIdToObjMap.get(parentIds[0]).rowNumber;
            parentRowNums[1] = newIdToObjMap.get(parentIds[1]).rowNumber;
            // Elements 3 and maybe 4 -> handle as children. I use .length
            // in case the 4th element doesn't exist.
            for (let j = 2; j < elementsInComboStr.length; j++) {
                // Child element name and id
                const childName = elementsInComboStr[j].trim();
                const childId = nameToIdMap.get(childName);
                // Now handle the child element(s)
                this.handleChildElements(childName, childId, parentIds, parentRowNums, newIdToObjMap);
            } //for j
        } //for comboTxtArr
        // Now return the idToObjMap!
        return newIdToObjMap;
    } //createIdToObjMap
    static handleChildElements(childName, childId, parentIds, parentRowNums, newIdToObjMap) {
        // Qu 1: does the child element exist
        if (newIdToObjMap.has(childId) === true) {
            // Get the child row num
            const existingChildRowNum = newIdToObjMap.get(childId).rowNumber;
            // Qu 2: Is this a cyclical combo? (at least one of the parent's row nums
            // is equal to or larger than the pre-existing child element's row num)
            if (parentRowNums[0] >= existingChildRowNum ||
                parentRowNums[1] >= existingChildRowNum) {
                // add the additional parent combo to the child element on the map. 
                newIdToObjMap.get(childId).addCyclicalParentPair(null, parentIds);
                // Not a cyclical combo
            }
            else {
                // add the additional parent combo to the child element on the map. 
                newIdToObjMap.get(childId).addParentPair(null, parentIds);
                // Qu 3: Is this a smaller parent combo?
                // Ex. Let's say mud = rain (say row 5) + dirt (say row 4).
                // But if later, it's found water + earth = mud, then mud 
                // should be in row 1, not 6.    
                if (parentRowNums[0] < existingChildRowNum &&
                    parentRowNums[1] < existingChildRowNum) {
                    // calculate the child's new row number
                    const newRowNum = _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement.calculateRowNum(parentRowNums[0], parentRowNums[1]);
                    // Update the element's row number
                    newIdToObjMap.get(childId).rowNumber = newRowNum;
                }
            }
            // The map DOES NOT have the combo element for this id,
            // so create a new child element
        }
        else {
            // calculate the child's row num
            const childRowNum = _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement.calculateRowNum(parentRowNums[0], parentRowNums[1]);
            // Create a new parent pair
            const parentPair = new _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(parentIds[0], parentIds[1]);
            newIdToObjMap.set(childId, new _base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(childId, childName, parentPair, childRowNum));
        } // if child element exists or not
    } //handleChildElements
    static createRowToIdsMap(idToObjMap) {
        const newRowToIdsMap = new Map();
        // Throw an error if the idToObjMap is empty
        if (idToObjMap == null || idToObjMap.size === 0) {
            throw new _other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadInputError('The idToObjMap parameter is empty.');
        }
        let idCount = 1;
        while (idCount <= idToObjMap.size) {
            // Get the rowNum of the element
            const elemRowNum = idToObjMap.get(idCount).rowNumber;
            if (newRowToIdsMap.has(elemRowNum) === false) {
                // Create a new rowIdArr and add the rowNum to it
                const newRowArr = [];
                newRowArr.push(idCount);
                newRowToIdsMap.set(elemRowNum, newRowArr);
            }
            else {
                // The key already exists, add it to the array
                newRowToIdsMap.get(elemRowNum).push(idCount);
            }
            // increment the id count
            idCount++;
        }
        // return the new map
        return newRowToIdsMap;
    }
} //class TextToHashMaps


/***/ }),

/***/ "./src/other/custom_errors.ts":
/*!************************************!*\
  !*** ./src/other/custom_errors.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BadInputError: () => (/* binding */ BadInputError),
/* harmony export */   BadOutputError: () => (/* binding */ BadOutputError)
/* harmony export */ });
/*----------- CUSTOM ERRORS ----------- */
/**
 * This is a custom error thrown whenever there's a problem with
 * a provided input
 */
class BadInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadInputError";
    }
}
/**
 * This is a custom error thrown whenever there's a problem with
 * an expected output
 */
class BadOutputError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadInputError";
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_files/combo_map */ "./src/base_files/combo_map.ts");
/* harmony import */ var _generate_combo_map_file_to_data_str__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate_combo_map/file_to_data_str */ "./src/generate_combo_map/file_to_data_str.ts");


// Notify the programmer their code won't work or break until they
// actually upload the combos txt file
console.log("To get started, upload the combos file!");
// Important objects
let comboMap = null;
let combosStr = '';
// Create an event for when someone uploads a file to the
// getComboFile input tag
const combosFile = document.getElementById('getComboFile');
combosFile.addEventListener('change', extractComboFileTextEvent);
// JavaScript handles extracting text from an uploaded file as an
// asyncronous process, which means JavaScript works on that code
// while normal code is running.
// Also I could not for the life of me figure out what the type of
// the change event was. I thought it would be "ChangeEvent" or
// something, but nope, an "Event". But it's not an event...?
async function extractComboFileTextEvent() {
    // debug
    console.log('File event fired!');
    combosStr = await (0,_generate_combo_map_file_to_data_str__WEBPACK_IMPORTED_MODULE_1__.convertTxtFileDataToStr)(this);
    // Now the main code of the program is ready to run!
    main();
} //extractComboFileTextEvent
function main() {
    // Now that my file is ready, create the combo map!
    comboMap = new _base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__.ComboMap(combosStr);
    // // Now that my file is ready, convert the text to data!
    // combosInMemory = new CombosInMemory(combosStr);
    // Create the map
    // graphMap = new ComboMap(combosInMemory.idToElementObjMap,
    //     combosInMemory.rowNumToIdMap);
    //graphMap = new ComboMap();
} //main

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlFQUFpRTtBQUNqRSxpRUFBaUU7QUFDakUsZ0NBQWdDO0FBQ2hDLGtFQUFrRTtBQUNsRSwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELEtBQUssVUFBVSx5QkFBeUI7SUFFcEMsUUFBUTtJQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVqQyxTQUFTLEdBQUcsTUFBTSw2RkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoRCxvREFBb0Q7SUFDcEQsSUFBSSxFQUFFLENBQUM7QUFFWCxDQUFDLDRCQUEyQjtBQUs1QixTQUFTLElBQUk7SUFFVCxtREFBbUQ7SUFDbkQsUUFBUSxHQUFHLElBQUksMkRBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVuQywwREFBMEQ7SUFDMUQsa0RBQWtEO0lBRWxELGlCQUFpQjtJQUVqQiw0REFBNEQ7SUFDNUQscUNBQXFDO0lBRXJDLDRCQUE0QjtBQUVoQyxDQUFDLE9BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vc3JjL2Jhc2VfZmlsZXMvY29tYm9fZWxlbWVudC50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vc3JjL2Jhc2VfZmlsZXMvY29tYm9fbWFwLnRzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi9zcmMvZ2VuZXJhdGVfY29tYm9fbWFwL2ZpbGVfdG9fZGF0YV9zdHIudHMiLCJ3ZWJwYWNrOi8vbGEyX2NvbWJvdmlzdWFsaXplci8uL3NyYy9nZW5lcmF0ZV9jb21ib19tYXAvdHh0X3RvX2hhc2hfbWFwcy50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vc3JjL290aGVyL2N1c3RvbV9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vbGEyX2NvbWJvdmlzdWFsaXplci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGEyX2NvbWJvdmlzdWFsaXplci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENPTUJPIEVMRU1FTlQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuaW1wb3J0IHsgQmFkSW5wdXRFcnJvciB9IGZyb20gXCIuLi9vdGhlci9jdXN0b21fZXJyb3JzXCI7XHJcblxyXG4vKipcclxuICogTmVlZCB0byBtYWtlIGEgZGVzY3JpcHRpb24gaGVyZSwgdG9vIGxhenkgcm5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21ib0VsZW1lbnQge1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbmx5IHVzZWQgdG8gZ2VuZXJhdGUgaWRzIGZvciBhbGwgb2YgdGhlIGVsZW1lbnRzLCBidXRcclxuICAgICAqIHVzZWZ1bCBrbm93bGVkZ2Ugbm9uZXRoZWxlc3MhXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyAjbnVtT2ZFbGVtZW50cyA9IDA7XHJcblxyXG4gICAgcmVhZG9ubHkgI2lkOiBudW1iZXI7XHJcbiAgICByZWFkb25seSAjbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJvdyBudW1iZXIuIFRoZSBiYXNlIGVsZW1lbnRzIGZpcmUsIHdhdGVyLCBlYXJ0aCwgd2luZCwgZXRjLlxyXG4gICAgICogYXJlIGFsbCByb3cgMC4gQWZ0ZXIgdGhhdCwgdGhlIHJvdyBudW1iZXIgaXMgZGV0ZXJtaW5lZCBieSB0aGVcclxuICAgICAqIGZpcnN0IGNvbWJvIGxpc3RlZCBpbiB0aGUgY29tYm9zIHR4dCBmaWxlLSB0aGUgcm93IG51bWJlciBpcyArMVxyXG4gICAgICogb2YgdGhlIHBhcmVudCdzIHdpdGggdGhlIGxhcmdlc3Qgcm93IG51bS5cclxuICAgICAqIFxyXG4gICAgICogRXhhbXBsZXM6XHJcbiAgICAgKiBcclxuICAgICAqIHdhdGVyICsgZWFydGggPSBtdWQgfFxyXG4gICAgICogd2F0ZXIgPSAwLCBlYXJ0aCA9IDAsIHNvIDAgKyAxID0gMSwgbWFraW5nIG11ZCA9IDEuXHJcbiAgICAgKiBcclxuICAgICAqIHdhdGVyICsgbGFrZSA9IHNlYSB8XHJcbiAgICAgKiB3YXRlciA9IDAsIGxldCdzIHNheSBsYWtlID0gMywgc28gMyArIDEgPSA0LCBtYWtpbmcgc2VhID0gNC5cclxuICAgICAqL1xyXG4gICAgI3Jvd051bTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhbiBhcnJheSBvZiBwYXJlbnQgcGFpcnMgZm9yIGVhY2ggbGlzdGVkIGNvbWJvLiBUaGlzIGNhblxyXG4gICAgICogYmUgbnVsbCBmb3IgYmFzZSBlbGVtZW50cywgc3VjaCBhcyB3YXRlciBhbmQgZmlyZS5cclxuICAgICAqL1xyXG4gICAgI3BhcmVudFBhaXJzOiBQYXJlbnRQYWlyW10gfCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBzZXQgaXMgYSBsaXN0IG9mIHBhcmVudCBpZHMgdGhpcyBlbGVtZW50IGlzIGEgY2hpbGQgb2YuXHJcbiAgICAgKiBUaGlzIGNhbiBiZSBudWxsIGZvciBiYXNlIGVsZW1lbnRzLCBzdWNoIGFzIHdhdGVyIGFuZCBmaXJlLlxyXG4gICAgICovXHJcbiAgICAjY2hpbGRPZjogU2V0PG51bWJlcj4gfCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBzZXQgaXMgYSBsaXN0IG9mIGNoaWxkIGlkcyB0aGlzIGVsZW1lbnQgaXMgYSBwYXJlbnQgb2YuXHJcbiAgICAgKi9cclxuICAgICNwYXJlbnRPZjogU2V0PG51bWJlcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTb21ldGltZXMgYSBwcmV2aW91cyBlbGVtZW50IGNhbiBiZSBjcmVhdGVkIGJ5IGxhdGVyIGVsZW1lbnRzLlxyXG4gICAgICogRm9yIGV4YW1wbGUsIGxpZ2h0ZW5pbmcgKyB3b29kcyA9IGZpcmUuIEZpcmUgaXMgc3RpbGwgYSByb3cgMFxyXG4gICAgICogZWxlbWVudCwgYW5kIHRoZSBtYXAgaGFuZGxlcyBjeWNsaWNhbCBwYXJlbnRzIGRpZmZlcmVudGx5XHJcbiAgICAgKi9cclxuICAgICNjeWNsaWNhbFBhcmVudFBhaXJzOiBQYXJlbnRQYWlyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHNldCBpcyBhIGxpc3Qgb2YgY3ljbGljYWwgcGFyZW50IGlkcyB0aGlzIGVsZW1lbnQgaXMgYVxyXG4gICAgICogY3ljbGljYWwgY2hpbGQgb2YuXHJcbiAgICAgKi9cclxuICAgICNjeWNsaWNhbENoaWxkT2Y6IFNldDxudW1iZXI+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBzZXQgaXMgYSBsaXN0IG9mIGN5Y2xpY2FsIGNoaWxkIGlkcyB0aGlzIGVsZW1lbnQgaXMgYVxyXG4gICAgICogY3ljbGljYWwgcGFyZW50IG9mLlxyXG4gICAgICovXHJcbiAgICAjY3ljbGljYWxQYXJlbnRPZjogU2V0PG51bWJlcj47XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENPTlNUUlVDVE9SIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcGFyZW50UGFpcjogUGFyZW50UGFpciB8IG51bGwsXHJcbiAgICAgICAgcm93TnVtOiBudW1iZXIpe1xyXG5cclxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhbmQgc2V0IHRoZSBwYXJlbnQgcGFpciBhcnIsIG9yIGRvbid0IGlmIGl0J3MgYSBiYXNlXHJcbiAgICAgICAgLy8gZWxlbWVudC4gQnkgbWFraW5nIHRoZSB3aG9sZSB0aGluZyBudWxsLCB0aGlzIHNob3VsZCBwcmV2ZW50IHRoZSBcclxuICAgICAgICAvLyBpc3N1ZSBvZiBhZGRpbmcgcGFyZW50IHBhaXJzIHRoYXQgc2hvdWxkbid0IGJlIHRoZXJlLiBUaGUgc2FtZVxyXG4gICAgICAgIC8vIHRoaW5nIGFwcGxpZXMgdG8gdGhlIGNoaWxkT2Ygc2V0XHJcbiAgICAgICAgaWYgKHBhcmVudFBhaXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy4jcGFyZW50UGFpcnMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLiNjaGlsZE9mID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiNwYXJlbnRQYWlycyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLiNwYXJlbnRQYWlycy5wdXNoKHBhcmVudFBhaXIpO1xyXG4gICAgICAgICAgICB0aGlzLiNjaGlsZE9mID0gbmV3IFNldDxudW1iZXI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhcnJheXNcclxuICAgICAgICB0aGlzLiNwYXJlbnRPZiA9IG5ldyBTZXQ8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzID0gbmV3IEFycmF5PFBhcmVudFBhaXI+KCk7XHJcbiAgICAgICAgdGhpcy4jY3ljbGljYWxDaGlsZE9mID0gbmV3IFNldDxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy4jY3ljbGljYWxQYXJlbnRPZiA9IG5ldyBTZXQ8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICAvLyBTZXQgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMuI2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy4jbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy4jcm93TnVtID0gcm93TnVtO1xyXG5cclxuICAgIH0vL2NvbnN0cnVjdG9yXHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gR0VUVEVSUyBBTkQgU0VUVEVSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIHN0YXRpYyBnZXQgbnVtT2ZFbGVtZW50cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jbnVtT2ZFbGVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgI25leHRJZCgpIHtcclxuICAgIC8vICAgICB0aGlzLiNudW1PZkVsZW1lbnRzKys7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuI251bU9mRWxlbWVudHM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gQmFzZSBwYXJhbWV0ZXJzXHJcblxyXG4gICAgZ2V0IGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcm93TnVtYmVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNyb3dOdW07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJvd051bWJlcihyb3dOdW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuI3Jvd051bSA9IHJvd051bTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwYXJlbnQgLSBjaGlsZFxyXG5cclxuICAgIGdldCBwYXJlbnRQYWlycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jcGFyZW50UGFpcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoaWxkT2YoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NoaWxkT2Y7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhcmVudE9mKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJlbnRPZjtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQYXJlbnRQYWlyKHBQYWlyPzogUGFyZW50UGFpciwgcGFpckFycj86IG51bWJlcltdLCBwMT86IG51bWJlciwgcDI/OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVXNlZnVsIGZvciBwb3N0IGdlbmVyYXRpb24gc2VjdXJpdHkgbGF0ZXJcclxuICAgICAgICBpZiAodGhpcy4jcGFyZW50UGFpcnMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoYFlvdSBjYW5ub3QgYWRkIGEgcGFyZW50IHBhaXIgdG8gYSBiYXNlIGVsZW1lbnQuYCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHBQYWlyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuI3BhcmVudFBhaXJzLnB1c2gocFBhaXIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhaXJBcnIgIT0gbnVsbCAmJiBwYWlyQXJyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyUFBhaXI6IFBhcmVudFBhaXIgPSBuZXcgUGFyZW50UGFpcihwYWlyQXJyWzBdLCBwYWlyQXJyWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuI3BhcmVudFBhaXJzLnB1c2goYXJyUFBhaXIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHAxICE9IG51bGwgJiYgcDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbnVtUFBhaXI6IFBhcmVudFBhaXIgPSBuZXcgUGFyZW50UGFpcihwMSwgcDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4jcGFyZW50UGFpcnMucHVzaChudW1QUGFpcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcignSW52YWxpZCBpbnB1dC4gUGxlYXNlIGFkZCBvbmUgUGFyZW50IFBhaXIsIGEgbnVtYmVyICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICdhcnJheSBvZiBsZW5ndGggMiwgb3IgdHdvIG51bWJlcnMuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2hpbGRPZihwYXJlbnRJZDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFVzZWZ1bCBmb3IgcG9zdCBnZW5lcmF0aW9uIHNlY3VyaXR5IGxhdGVyXHJcbiAgICAgICAgaWYgKHRoaXMuI2NoaWxkT2YgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoYFlvdSBjYW5ub3QgYWRkIGEgY2hpbGRPZiBpZCB0byBhIGJhc2UgZWxlbWVudC5gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiNjaGlsZE9mLmFkZChwYXJlbnRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFBhcmVudE9mKGNoaWxkSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuI3BhcmVudE9mLmFkZChjaGlsZElkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjeWNsaWNhbCBwYXJlbnQgLSBjaGlsZFxyXG5cclxuICAgIGdldCBjeWNsaWNhbFBhcmVudFBhaXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjeWNsaWNhbENoaWxkT2YoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4jY3ljbGljYWxDaGlsZE9mO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjeWNsaWNhbFBhcmVudE9mKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjeWNsaWNhbFBhcmVudE9mO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEN5Y2xpY2FsUGFyZW50UGFpcihwUGFpcj86IFBhcmVudFBhaXIsIHBhaXJBcnI/OiBudW1iZXJbXSwgcDE/OiBudW1iZXIsIHAyPzogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHBQYWlyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy4jY3ljbGljYWxQYXJlbnRQYWlycy5wdXNoKHBQYWlyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhaXJBcnIgIT0gbnVsbCAmJiBwYWlyQXJyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJQUGFpcjogUGFyZW50UGFpciA9IG5ldyBQYXJlbnRQYWlyKHBhaXJBcnJbMF0sIHBhaXJBcnJbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzLnB1c2goYXJyUFBhaXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocDEgIT0gbnVsbCAmJiBwMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bVBQYWlyOiBQYXJlbnRQYWlyID0gbmV3IFBhcmVudFBhaXIocDEsIHAyKTtcclxuICAgICAgICAgICAgdGhpcy4jY3ljbGljYWxQYXJlbnRQYWlycy5wdXNoKG51bVBQYWlyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcignSW52YWxpZCBpbnB1dC4gUGxlYXNlIGFkZCBvbmUgUGFyZW50IFBhaXIsIGEgbnVtYmVyICcgK1xyXG4gICAgICAgICAgICAgICAgJ2FycmF5IG9mIGxlbmd0aCAyLCBvciB0d28gbnVtYmVycy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZEN5Y2xpY2FsQ2hpbGRPZihjeWNsaWNhbFBhcmVudElkOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuI2N5Y2xpY2FsQ2hpbGRPZi5hZGQoY3ljbGljYWxQYXJlbnRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ3ljbGljYWxQYXJlbnRPZihjeWNsaWNhbENoaWxkSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuI2N5Y2xpY2FsUGFyZW50T2YuYWRkKGN5Y2xpY2FsQ2hpbGRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB2ZXJ5IHNpbXBsZSBtZXRob2QgdGhhdCBJIGRpZG4ndCBmZWVsIGxpa2Ugd3JpdGluZyB0d2ljZVxyXG4gICAgICogSXQgcmV0dXJucyB0aGUgbGFyZ2VzdCBudW1iZXIgKyAxXHJcbiAgICAgKiBFeC4gKDEsMykgLT4gcmV0dXJuIDQsICg1LDIpIC0+IHJldHVybiA2XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSByMSBwYXJlbnQgMSdzIHJvdyBudW1iZXJcclxuICAgICAqIEBwYXJhbSByMiBwYXJlbnQgMidzIHJvdyBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGVSb3dOdW0ocjE6IG51bWJlciwgcjI6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyMSA+PSByMikge1xyXG4gICAgICAgICAgICByZXR1cm4gcjEgKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByMiArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhIHNlY3VyaXR5IG1ldGhvZCB0byBwcm90ZWN0IGFuIGVsZW1lbnQgd2hlbiBhZGRpbmdcclxuICAgICAqIG5ldyBwYXJlbnQgcGFpcnMgb24gYSBwb3N0LWdlbmVyYXRlZCBjb21ibyBtYXAuIFdoZW4gZ2VuZXJhdGluZ1xyXG4gICAgICogdGhlIGNvbWJvcywgdGhlIGFkZGVkIGNvbWJvcyBzaG91bGQgYWxyZWFkeSBiZSB1bmlxdWUuXHJcbiAgICAgKiBcclxuICAgICAqIFRISVMgSVMgQSBTVFVCXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwYWlyIFxyXG4gICAgICovXHJcbiAgICBjaGVja0lmUGFyZW50UGFpcklzVW5pcXVlKHBhaXI6IFBhcmVudFBhaXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIGZvciBib3RoIG5vcm1hbCBhbmQgY3ljbGljYWwgcGFyZW50IHBhaXJzXHJcbiAgICAgKiBPdXRwdXQ6IHsgW2lkMSwgaWQyXSwgW2lkMSwgaWQyXSwgLi4uIGV0Yy4gfVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJlbnRQYWlyc0FzU3RyKGlzQ3ljbGljYWw6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgbGV0IGFyclRvSXRlcmF0ZTogUGFyZW50UGFpcltdIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChpc0N5Y2xpY2FsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBhcnJUb0l0ZXJhdGUgPSB0aGlzLiNwYXJlbnRQYWlycztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJUb0l0ZXJhdGUgPSB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmV0dXJuICdudWxsJyBpZiBpdCdzIG51bGwuIFRoaXMgaGFwcGVucyB3aXRoIGJhc2UgZWxlbWVudHNcclxuICAgICAgICBpZiAoYXJyVG9JdGVyYXRlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXR1cm4ge30gaWYgZW1wdHlcclxuICAgICAgICBpZiAoYXJyVG9JdGVyYXRlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3t9JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5TdHI6IHN0cmluZyA9IGB7IGA7XHJcblxyXG4gICAgICAgIC8vIEFkZHMgJ1tpZDEsIGlkMl0sICcgdG8gdGhlIHJldHVyblN0clxyXG4gICAgICAgIGZvciAoY29uc3QgcFBhaXIgb2YgYXJyVG9JdGVyYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ciArIHBQYWlyLnByaW50UGFpckFzU3RyKCkgKyBgLCBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3V0IG9mZiB0aGUgbGFzdCAnLCAnIGFuZCBhZGQgYSAnIH0nIGluc3RlYWRcclxuICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIuc3Vic3RyaW5nKDAsIHJldHVyblN0ci5sZW5ndGggLSAyKTtcclxuICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgIH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG5cclxuICAgIH0vLyBnZXRQYXJlbnRQYWlyc0FzU3RyXHJcblxyXG5cclxuICAgIC8vIFRPRE86IEZpbmlzaCB1cGRhdGluZyB0aGlzIGluIHRoZSBmdXR1cmVcclxuICAgIC8qKlxyXG4gICAgICogT3V0cHV0OiBcIjwgbmFtZTogJ25hbWUnLCBpZDogJ2lkJywgcFBhaXJzOiB7Li4ufSwgcm93TnVtYmVyOiAncm93TnVtJyA+XCJcclxuICAgICAqL1xyXG4gICAgZ2V0Q29tYm9FbGVtZW50QXNTdHIoZG9GdWxsU3RyaW5nOiBib29sZWFuKXtcclxuXHJcbiAgICAgICAgLy8gSSBjYW4gZG8gZnVsbCBhbmQgc2hvcnQuIEZ1bGwgaW5jbHVkZXMgdGhlIGNoaWxkT2YvZXRjLiBzZXRzXHJcblxyXG4gICAgICAgIGxldCByZXR1cm5TdHIgPSBgPCBuYW1lOiAke3RoaXMuI25hbWV9LCBpZDogJHt0aGlzLiNpZH0sIHBhcmVudFBhaXJzOiBgICtcclxuICAgICAgICBgJHt0aGlzLmdldFBhcmVudFBhaXJzQXNTdHIoZmFsc2UpfSwgY3ljbGljYWxQYXJlbnRQYWlyczogYCArXHJcbiAgICAgICAgYCR7dGhpcy5nZXRQYXJlbnRQYWlyc0FzU3RyKHRydWUpfSwgcm93TnVtYmVyOiAke3RoaXMuI3Jvd051bX0gPmA7XHJcblxyXG4gICAgICAgIGlmIChkb0Z1bGxTdHJpbmcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyLnN1YnN0cmluZygwLCByZXR1cm5TdHIubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ciArIGAsIGNoaWxkT2Y6ICR7dGhpcy5zZXRUb1N0cmluZyh0aGlzLiNjaGlsZE9mKX0sIGAgK1xyXG4gICAgICAgICAgICBgcGFyZW50T2Y6ICR7dGhpcy5zZXRUb1N0cmluZyh0aGlzLiNwYXJlbnRPZil9LCBgICtcclxuICAgICAgICAgICAgYGN5Y2xpY2FsQ2hpbGRPZjogJHt0aGlzLnNldFRvU3RyaW5nKHRoaXMuI2N5Y2xpY2FsQ2hpbGRPZil9LCBgICtcclxuICAgICAgICAgICAgYGN5Y2xpY2FsUGFyZW50T2Y6ICR7dGhpcy5zZXRUb1N0cmluZyh0aGlzLiNjeWNsaWNhbFBhcmVudE9mKX0gPmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUb1N0cmluZyhzOiBTZXQ8bnVtYmVyPikge1xyXG5cclxuICAgICAgICBpZiAocyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGl0ZXJhdG9yIGFuZCB0aGUgZmlyc3QgdmFsdWUgaW4gaXRcclxuICAgICAgICBjb25zdCBpdGVyYXRvcjogU2V0SXRlcmF0b3I8bnVtYmVyPiA9IHMudmFsdWVzKCk7XHJcbiAgICAgICAgbGV0IG5leHRWYWw6IG51bWJlciB8IG51bGwgPSBpdGVyYXRvci5uZXh0KCkudmFsdWU7XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5TdHI6IHN0cmluZyA9IGB7YDtcclxuXHJcbiAgICAgICAgd2hpbGUobmV4dFZhbCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgJHtuZXh0VmFsfSwgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkdmFuY2UgdGhlIGl0ZXJhdG9yXHJcbiAgICAgICAgICAgIG5leHRWYWwgPSBpdGVyYXRvci5uZXh0KCkudmFsdWU7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xlYW4gdXAgYW5kIHByZXBhcmUgdGhlIHN0cmluZ1xyXG4gICAgICAgIGlmKHJldHVyblN0ci5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyLnN1YnN0cmluZygwLCAocmV0dXJuU3RyLmxlbmd0aCAtIDIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG5cclxuICAgIH1cclxuXHJcbn0vLyBjbGFzcyBDb21ibyBFbGVtZW50IFxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUEFJUiBDTEFTU0VTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBjbGFzcyB0byBoZWxwIHByZXNlcnZlIGNvbWJvIGluZm9ybWF0aW9uLiBJdCBvbmx5XHJcbiAqIGhvbGRzIHR3byBpZHMuIFRoaXMgY2xhc3MgcHJldmVudHMgcHJvYmxlbXMgd2l0aCBudW1iZXJbXVtdXHJcbiAqIGR1YmlvdXMgdHlwaW5nIGFuZCBjb25mdXNpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYXJlbnRQYWlyIHtcclxuXHJcbiAgICAjcGFpcjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwMUlkOiBudW1iZXIsIHAySWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuI3BhaXIucHVzaChwMUlkKTtcclxuICAgICAgICB0aGlzLiNwYWlyLnB1c2gocDJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhaXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BhaXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jcGFpcltpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpbnRQYWlyQXNTdHIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBbJHt0aGlzLiNwYWlyWzBdfSwgJHt0aGlzLiNwYWlyWzFdfV1gO1xyXG4gICAgfVxyXG5cclxufS8vY2xhc3MgUGFyZW50UGFpclxyXG5cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBBbm90aGVyIGhlbHBlciBjbGFzcyB0byBtYWtlIG15IGxpZmUgYSBsaXR0bGUgZWFzaWVyXHJcbi8vICAqL1xyXG5leHBvcnQgY2xhc3MgQ29uc3RyYWludFBhaXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlkIHRvIGNvbnN0cmFpbiB0b1xyXG4gICAgICovXHJcbiAgICAjY29uc3RySWQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHByaW1lIG1vZCBiYXNlIGxpc3RcclxuICAgICAqL1xyXG4gICAgI21vZExpc3Q6IG51bWJlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkVG9Db25zdHJhaW5UbzogbnVtYmVyLCBwcmltZU1vZEJhc2VMaXN0OiBudW1iZXJbXSl7XHJcblxyXG4gICAgICAgIHRoaXMuI2NvbnN0cklkID0gaWRUb0NvbnN0cmFpblRvO1xyXG4gICAgICAgIHRoaXMuI21vZExpc3QgPSBwcmltZU1vZEJhc2VMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb25zdHJJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjb25zdHJJZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbW9kTGlzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jbW9kTGlzdDtcclxuICAgIH1cclxuICAgIFxyXG59Ly9jbGFzcyBDb25zdHJhaW50UGFpclxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21ib0VsZW1lbnQsIFBhcmVudFBhaXIsIENvbnN0cmFpbnRQYWlyIH0gZnJvbSBcIi4vY29tYm9fZWxlbWVudFwiO1xyXG5pbXBvcnQgeyBUZXh0VG9IYXNoTWFwcyB9IGZyb20gXCIuLi9nZW5lcmF0ZV9jb21ib19tYXAvdHh0X3RvX2hhc2hfbWFwc1wiO1xyXG5pbXBvcnQgeyBCYWRJbnB1dEVycm9yIH0gZnJvbSBcIi4uL290aGVyL2N1c3RvbV9lcnJvcnNcIjtcclxuXHJcbi8qIE5vdGVzOlxyXG4gKiBcclxuICogLSBDcmVhdGUgdGhlIG1hcCBpbiBoZXJlXHJcbiAqIC0gVGhlIGdlbmVyYXRpb24gbWV0aG9kcyBoYXZlIHRoZWlyIG93biBkZWRpY2F0ZWQgZmlsZVxyXG4gKiAtIFRoZSBtYW51cHVsYXRpb24gbWV0aG9kcyBwb3N0IGdlbmVyYXRpb24gbWF5IG9yIG1heSBub3RcclxuICogaGF2ZSB0aGVpciBvd24gZGVkaWNhdGVkIGZpbGVzLlxyXG4gKiBcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQ29tYm9NYXAge1xyXG5cclxuICAgIC8vIFNvIHRoZSBkZWJ1ZyBjb21ibyBtYXAgc2hvdWxkIGNhbGwgdGhpcyB2YXJpYWJsZSBmcm9tIGhlcmUuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGNhbkNyZWF0ZURlYnVnTWFwID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIHRoZSBhcnJheSBvZiBzdHJpbmdzLiBFYWNoIHN0cmluZyBpcyB3cml0dGVuIGFzIFxyXG4gICAgICogJ2EsIGIsIGMnLCBvciAnYSwgYiwgYywgZCcuXHJcbiAgICAgKiBcclxuICAgICAqIGNvbWJvc1R4dEFyciA9PlxyXG4gICAgICpcclxuICAgICAqIFsnd2F0ZXIsIGZpcmUsIHN0ZWFtJywgJ3dhdGVyLCBlYXJ0aCwgbXVkJywgLi4uZXRjXVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgICNjb21ib3NUeHRBcnI6IHN0cmluZ1tdOyBcclxuXHJcbiAgICAjbmFtZVRvSWRNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj47XHJcbiAgICAjaWRUb09iak1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50PjtcclxuICAgICNyb3dUb0lkc01hcDogTWFwPG51bWJlciwgbnVtYmVyW10+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJhd0NvbWJvU3RyRGF0YT86IHN0cmluZyl7XHJcblxyXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIG1lIHRvIHJ1biB0aGUgQ29tYm8gTWFwIGluIGRlYnVnIG1vZGUuIFRoaXMgaXMgb25seSB0dXJuZWQgb24gaW5cclxuICAgICAgICAvLyB0aGUgRGVidWdDb21ib01hcCBjbGFzcy5cclxuICAgICAgICBpZiAoQ29tYm9NYXAuY2FuQ3JlYXRlRGVidWdNYXAgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHRocm93IGVycm9yIGhlcmUgaWYgZW1wdHlcclxuICAgICAgICAgICAgaWYgKHJhd0NvbWJvU3RyRGF0YSA9PSB1bmRlZmluZWQgfHwgcmF3Q29tYm9TdHJEYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoJ1RoZSByYXdDb21ib1N0ckRhdGEgcGFyYW1ldGVyIGlzIGVtcHR5LicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmaXJzdCwgY29udmVydCB0aGUgcmF3IGRhdGEgaW50byBhIGZpbHRlcmVkIGFycmF5IG9mIGNvbWJpbmF0aW9uc1xyXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29tYm8gdGV4dCBpc24ndCB2aWFibGUuXHJcbiAgICAgICAgICAgIHRoaXMuI2NvbWJvc1R4dEFyciA9IFRleHRUb0hhc2hNYXBzLmNvbnZlcnRDb21ib1RleHRUb1N0ckFycihyYXdDb21ib1N0ckRhdGEpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIGhhc2ggbWFwc1xyXG4gICAgICAgICAgICB0aGlzLiNjb252ZXJ0VGV4dFN0ckFyclRvSGFzaE1hcHModGhpcy4jY29tYm9zVHh0QXJyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlYnVnXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBIYXNoIG1hcHMgc28gZmFyOmApO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldEVsZW1lbnRNYXBBc1N0cih0aGlzLiNuYW1lVG9JZE1hcCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldEVsZW1lbnRNYXBBc1N0cih0aGlzLiNpZFRvT2JqTWFwKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0RWxlbWVudE1hcEFzU3RyKHRoaXMuI3Jvd1RvSWRzTWFwKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNoaWxkT2YvcGFyZW50T2YvY3ljQ2hpbGRPZi9jeWNQYXJlbnRPZiBzZXRzIG9mIGVhY2ggZWxlbWVudFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbWJvRWxlbWVudFJlbGF0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgY29uc3RyYWludHNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgLy8gRHJhdyB0aGUgbWFwXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAvL2lmIGJsYWggYmxhaCBibGFoXHJcblxyXG4gICAgICAgICAgICAvL2ZvciBub3dcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfS8vY29uc3RydWN0b3JcclxuICAgIFxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gR0VUVEVSUyBBTkQgU0VUVEVSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8vIFRoZXNlIHByb3RlY3RlZCBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGFyZSBmb3IgdW5pdCB0ZXN0aW5nLiBUaGVzZSBhcmVcclxuICAgIC8vIHVzZWQgYnkgdGhlIERlYnVnQ29tYm9NYXAgY2xhc3NcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TmFtZVRvSWRNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI25hbWVUb0lkTWFwO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldElkVG9PYmpNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lkVG9PYmpNYXA7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Um93VG9JZHNNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3Jvd1RvSWRzTWFwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc2V0TmFtZVRvSWRNYXAobWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+KSB7XHJcbiAgICAgICAgdGhpcy4jbmFtZVRvSWRNYXAgPSBtYXA7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0SWRUb09iak1hcChtYXA6IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4pIHtcclxuICAgICAgICB0aGlzLiNpZFRvT2JqTWFwID0gbWFwO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHNldFJvd1RvSWRzTWFwKG1hcDogTWFwPG51bWJlciwgbnVtYmVyW10+KSB7XHJcbiAgICAgICAgdGhpcy4jcm93VG9JZHNNYXAgPSBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhIHN1cGVyIG1ldGhvZCB0aGF0IGNhbGxzIG90aGVyIGdlbmVyYXRpb24gbWV0aG9kcyBmcm9tIHRoZVxyXG4gICAgICogY2xhc3MgVGV4dFRvSGFzaE1hcHMuIFxyXG4gICAgICovXHJcbiAgICAjY29udmVydFRleHRTdHJBcnJUb0hhc2hNYXBzKGNvbWJvVHh0QXJyOiBzdHJpbmdbXSl7XHJcblxyXG4gICAgICAgIHRoaXMuI25hbWVUb0lkTWFwID0gVGV4dFRvSGFzaE1hcHMuY3JlYXRlTmFtZVRvSWRNYXAoY29tYm9UeHRBcnIpO1xyXG5cclxuICAgICAgICB0aGlzLiNpZFRvT2JqTWFwID0gVGV4dFRvSGFzaE1hcHMuY3JlYXRlSWRUb09iak1hcChjb21ib1R4dEFyciwgXHJcbiAgICAgICAgICAgIHRoaXMuI25hbWVUb0lkTWFwKTtcclxuXHJcbiAgICAgICAgdGhpcy4jcm93VG9JZHNNYXAgPSBUZXh0VG9IYXNoTWFwcy5jcmVhdGVSb3dUb0lkc01hcCh0aGlzLiNpZFRvT2JqTWFwKTtcclxuXHJcbiAgICAgICAgLy8gZGVidWdcclxuICAgICAgICBjb25zb2xlLmxvZygnQWxsIG1hcHM6Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jbmFtZVRvSWRNYXApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuI2lkVG9PYmpNYXApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuI3Jvd1RvSWRzTWFwKTtcclxuXHJcbiAgICB9Ly9jb252ZXJ0VGV4dFN0ckFyclRvSGFzaE1hcHNcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdvIHRocm91Z2ggdGhlIGlkVG9PYmogbWFwIGFuZCB1cGRhdGUgdGhlIGNoaWxkT2YvcGFyZW50T2Ygc2V0cyBhbmQgdGhlXHJcbiAgICAgKiBjeWNsaWNhbCBjaGlsZE9mL1BhcmVudE9mIHNldHNcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNvbWJvRWxlbWVudFJlbGF0aW9ucygpIHtcclxuXHJcbiAgICAgICAgLy8gR28gdGhyb3VnaCB0aGUgaWQgdG8gb2JqIG1hcFxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLiNpZFRvT2JqTWFwLnNpemU7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuI2lkVG9PYmpNYXAuZ2V0KGkpO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgTm93IG9uIGVsZW0gYCk7XHJcblxyXG4gICAgICAgICAgICAvLyBCYXNlIGVsZW1lbnRzIGhhdmUgdGhlaXIgcGFyZW50UGFpcnMgYXJyYXkgc2V0IHRvIG51bGxcclxuICAgICAgICAgICAgaWYgKGVsZW0ucGFyZW50UGFpcnMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNoaWxkT2Ygc2V0IG9mIHRoZSBlbGVtZW50IGFuZCBwYXJlbnRPZiBzZXRzIG9mIHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudCdzIHBhcmVudHNcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxlbS5wYXJlbnRQYWlycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcFBhaXIgPSBlbGVtLnBhcmVudFBhaXJzW2pdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBwYXJlbnQgcGFpciBpZHMgdG8gdGhlIGVsZW1lbnQncyBjaGlsZE9mIHNldFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2hpbGRPZihwUGFpci5nZXQoMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2hpbGRPZihwUGFpci5nZXQoMSkpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIGVsZW1lbnQgb2YgdGhlIHBhcmVudCBwYWlyIGlkcyBhbmQgYWRkIHRoZSBjaGlsZCdzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWQgdG8gdGhvc2UgcGFyZW50J3MgcHJlbnRPZiBzZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4jaWRUb09iak1hcC5nZXQocFBhaXIuZ2V0KDApKS5hZGRQYXJlbnRPZihlbGVtLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiNpZFRvT2JqTWFwLmdldChwUGFpci5nZXQoMSkpLmFkZFBhcmVudE9mKGVsZW0uaWQpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3ljbGljYWwgY2hpbGRPZiBzZXQgb2YgdGhlIGVsZW1lbnQgYW5kIHBhcmVudE9mIHNldHNcclxuICAgICAgICAgICAgLy8gb2YgdGhlIGVsZW1lbnQncyBjeWNsaWNhbCBwYXJlbnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZWxlbS5jeWNsaWNhbFBhcmVudFBhaXJzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBQYWlyID0gZWxlbS5jeWNsaWNhbFBhcmVudFBhaXJzW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcGFyZW50IHBhaXIgaWRzIHRvIHRoZSBlbGVtZW50J3MgY2hpbGRPZiBzZXRcclxuICAgICAgICAgICAgICAgIGVsZW0uYWRkQ3ljbGljYWxDaGlsZE9mKHBQYWlyLmdldCgwKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmFkZEN5Y2xpY2FsQ2hpbGRPZihwUGFpci5nZXQoMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZldGNoIHRoZSBlbGVtZW50IG9mIHRoZSBwYXJlbnQgcGFpciBpZHMgYW5kIGFkZCB0aGUgY2hpbGQnc1xyXG4gICAgICAgICAgICAgICAgLy8gaWQgdG8gdGhvc2UgcGFyZW50J3MgcHJlbnRPZiBzZXRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiNpZFRvT2JqTWFwLmdldChwUGFpci5nZXQoMCkpLmFkZEN5Y2xpY2FsUGFyZW50T2YoZWxlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiNpZFRvT2JqTWFwLmdldChwUGFpci5nZXQoMSkpLmFkZEN5Y2xpY2FsUGFyZW50T2YoZWxlbS5pZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ly91cGRhdGVDb21ib0VsZW1lbnRSZWxhdGlvbnNcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQUklOVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgcHVibGljIGdldEVsZW1lbnRNYXBBc1N0cjxLLFY+KGVsZW1NYXA6IE1hcDxLLFY+KXtcclxuXHJcbiAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG1hcCBpcyBlbXB0eVxyXG4gICAgICAgIGlmIChlbGVtTWFwID09IG51bGwgfHwgZWxlbU1hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdUaGUgcGFzc2VkIGluIG1hcCBpcyBlbXB0eS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgZmlyc3Qga2V5IGFuZCB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IGl0ZXJhdG9yID0gZWxlbU1hcC5rZXlzKCk7XHJcbiAgICAgICAgbGV0IGtleTogSyA9IGl0ZXJhdG9yLm5leHQoKS52YWx1ZTtcclxuICAgICAgICBsZXQgdmFsdWU6IFYgPSBlbGVtTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyB0cmFjayBvZiB3aGF0IG1hcCB0eXBlIEknbSB3b3JraW5nIHdpdGguXHJcbiAgICAgICAgICogMSA9IG5hbWVUb0lkTWFwLCAyID0gaWRUb09iak1hcCwgMyA9IHJvd1RvSWRzTWFwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHR5cGVPZk1hcE51bSA9IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoZSB0eXBpbmdcclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgIHR5cGVPZk1hcE51bSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb21ib0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgdHlwZU9mTWFwTnVtID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVbMF0gPT09ICdudW1iZXInKXtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlT2ZNYXBOdW0gPSAzO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRocm93IGVycm9yLCB3cm9uZyB0eXBlXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdUaGUgcGFzc2VkIGluIG1hcCBpcyB0aGUgd3JvbmcgdHlwZS4gUGxlYXNlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3Bhc3MgaW4gbWFwcyBvZiB0eXBlIDxzdHJpbmcsIG51bWJlcj4sIDxudW1iZXIsIENvbWJvRWxlbWVudD4sICcgK1xyXG4gICAgICAgICAgICAgICAgJ29yIDxudW1iZXIsIG51bWJlcltdPicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJldHVyblN0cjogc3RyaW5nID0gYGA7XHJcblxyXG4gICAgICAgIHdoaWxlKGtleSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBXcml0ZSB0aGUgZmlyc3QgcGFydC0gYSBrZXlcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYCR7a2V5fVxcdHwgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vdyB3cml0ZSB0aGUgdmFsdWVcclxuICAgICAgICAgICAgaWYgKHR5cGVPZk1hcE51bSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYCR7dmFsdWV9XFxuYDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlT2ZNYXBOdW0gPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ciArIGAkeyh2YWx1ZSBhcyBDb21ib0VsZW1lbnQpLmdldENvbWJvRWxlbWVudEFzU3RyKGZhbHNlKX1cXG5gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYCR7KHZhbHVlIGFzIEFycmF5PG51bWJlcj4pLnRvU3RyaW5nKCl9XFxuYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0aGUgaXRlcmF0b3JcclxuICAgICAgICAgICAga2V5ID0gaXRlcmF0b3IubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGVsZW1NYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluYWxseSwgY2xlYW4gdXAgdGhlIHN0cmluZyBhbmQgcmV0dXJuXHJcbiAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyLnN1YnN0cmluZygwLCByZXR1cm5TdHIubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblN0cjtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufS8vIGNsYXNzIiwiLyoqXHJcbiAqIE9uZSBvZiB0aG9zZSBcInRoaXMgb25seSBleGlzdHMgYi9jIEkgbmVlZCB0byB1bml0IHRlc3QgaXRcIiBmeG5zXHJcbiAqIE5vdGUgdGhhdCBJIGhhdmUgdG8gcGFzcyBpbiBcInRoaXNcIiwgdGhlIGV2ZW50IGZ1bmN0aW9uICg/KSwgZm9yXHJcbiAqIGUuIEkgZG9uJ3QgdW5kZXJzdGFuZCwgd2h5IGlzIEphdmFTY3JpcHQgc28gamFuay4uLlxyXG4gKiBcclxuICogQWxzbyBtb3ZlZCB0byBhIHNlcHJhdGUgZmlsZSBiZWNhdXNlIEkgZG9uJ3Qgd2FudCBteSB1bml0IHRlc3RzXHJcbiAqIHJ1bm5pbmcgbXkgbWFpbiBzY3JpcHQuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29udmVydFR4dEZpbGVEYXRhVG9TdHIoZTogYW55KXtcclxuXHJcbiAgICAvLyBTYXZlIHRoZSBmaWxlIGFzIGEgdmFyIGZvciByZWFkYWJpbGl0eVxyXG4gICAgY29uc3QgZmlsZUxpc3QgPSBlLmZpbGVzO1xyXG4gICAgY29uc3QgY29tYm9GaWxlOiBGaWxlID0gZmlsZUxpc3RbMF07XHJcblxyXG4gICAgLy8gU28gSSBjYW4gcmV0dXJuIHRoZSBzdHJpbmcgZm9yIHVuaXQgdGVzdGluZ1xyXG4gICAgbGV0IHJldHVyblN0cjogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgLyogT2theSBzbyBiZWFyIHdpdGggbWVcclxuICAgICogLnRleHQoKSByZXR1cm5zIHRoZSB0ZXh0IGlmIGl0IGNhbiBmaW5kIGl0IGluIHRoZSBmaWxlLFxyXG4gICAgKiBCVVQgdGhlcmUncyBtb3JlIHRvIGl0LiBJbnN0ZWFkIG9mIHNheWluZyBcImhlcmUncyB5b3VyXHJcbiAgICAqIHN0cmluZ1wiLCBpdCBjcmVhdGVzIGFuIGFzeW5jIHByb2Nlc3MgY2FsbGVkIGEgcHJvbWlzZS5cclxuICAgICogVGhlIHByb21pc2UgYmFzaWNhbGx5IGFjaGlldmVzLCBcIkknbGwgZ2V0IHRoYXQgdGV4dFxyXG4gICAgKiBqdXN0IHdhaXQgZm9yIG1lIHBselwiLiBBbmQgZm9yIHJlYXNvbnMgSSBkb24ndCBjb21wbGV0ZWx5XHJcbiAgICAqIHVuZGVyc3RhbmQsIC50aGVuKCkgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBhcyBhIHByb21pc2UsXHJcbiAgICAqIHNvIHlvdSBuZWVkIHRvIHBhc3MgaW4gYSBmdW5jdGlvbiB3aGljaCB0aGVuIGlzIGEgc3RyaW5nXHJcbiAgICAqIGFwcGFyZW50bHkuLi4gSSBkb24ndCBrbm93XHJcbiAgICAqL1xyXG4gICAgYXdhaXQgY29tYm9GaWxlLnRleHQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc3RyaW5nIGZvciBtb2RpZmljYWl0b24gbGF0ZXJcclxuICAgICAgICByZXR1cm5TdHIgPSByZXN1bHQ7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJldHVyblN0cjtcclxuXHJcbn0vL2NvbnZlcnRUeHRGaWxlRGF0YVRvU3RyIiwiLy8gYmxhaCBibGFoIGFkZCBmeG5zXHJcbmltcG9ydCB7IENvbWJvRWxlbWVudCwgUGFyZW50UGFpciB9IGZyb20gXCIuLi9iYXNlX2ZpbGVzL2NvbWJvX2VsZW1lbnRcIjtcclxuaW1wb3J0IHsgQmFkSW5wdXRFcnJvciB9IGZyb20gXCIuLi9vdGhlci9jdXN0b21fZXJyb3JzXCI7XHJcblxyXG4vLyBETyBOT1QgTU9ESUZZIENPTUJPIE1BUCBESVJFQ1RMWVxyXG4vLyBpbnB1dCAtPiBvdXRwdXQgaGFzaCBtYXBzXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dFRvSGFzaE1hcHMge1xyXG5cclxuICAgICAvKipcclxuICAgICAqIEZpbHRlcnMgYW5kIGNvbnZlcnRzIHRoZSBjb21ib3NTdHIgZnJvbSB0aGUgY29tYm9zIGZpbGUgaW50byBhIHN0cmluZyBcclxuICAgICAqIGFycmF5IGFuZCB0aGVuIHJldHVybnMgaXQuIEl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbWJvc1N0ciBpcyBcclxuICAgICAqIGludmFsaWQuXHJcbiAgICAgKiBcclxuICAgICAqIE5vdGU6IHRoZSByZXR1cm4gc3RyaW5nIGFyciB3aWxsIGxvb2sgc29tZXRoaW5nIGxpa2UgdGhpczpcclxuICAgICAqIFxyXG4gICAgICogWyAnd2F0ZXIsIGZpcmUsIHN0ZWFtJywgJ2VhcnRoLCB3YXRlciwgbXVkJywgZXRjLl1cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbWJvc1N0ciB0aGUgdGV4dCBkYXRhIGZyb20gdGhlIGNvbWJvcyBmaWxlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb252ZXJ0Q29tYm9UZXh0VG9TdHJBcnIoY29tYm9zU3RyOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLyogVGhlIGNvbWJvcyBzaG91bGQgbG9vayBsaWtlIHRoZSBmb2xsb3dpbmc6XHJcbiAgICAgICAgICogYSwgYiwgY1xyXG4gICAgICAgICAqIGQsIGUsIGZcclxuICAgICAgICAgKiBTbyB0aGUgYXJyYXkgd2lsbCBicmVhayBkb3duIHRoZSBsaXN0IGJ5IGNvbW1hIEFORFxyXG4gICAgICAgICAqIGJ5IGVudGVyL3JldHVybiBjaGFyYWN0ZXJzLiBJdCB3aWxsIHRocm93IGFuIGVycm9yXHJcbiAgICAgICAgICogaWYgdGhpcyBmb3JtYXQgaXNuJ3QgZG9uZSAoc28geW91IGRvbid0IGdldFxyXG4gICAgICAgICAqIHVucHJlZGljdGFibGUgcmVzdWx0cylcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBTaWRlIG5vdGU6IEluIHRoZSBmdXR1cmUsIG11bHRpcGxlIHJlc3VsdGluZ1xyXG4gICAgICAgICAqIGNvbWJpbmF0aW9ucyBjYW4gYmUgdXNlZCBhbmQgYnJva2VuIGRvd24gYnkgdGhpcyBjb2RlLlxyXG4gICAgICAgICAqIEZvciBleGFtcGxlOlxyXG4gICAgICAgICAqIGEsIGIsIGUsIGYgKGEgKyBiIGNvbWJpbmUgaW50byBlIGFuZCBmKVxyXG4gICAgICAgICAqIGNhbiBiZSByZXdyaXR0ZW4gYXNcclxuICAgICAgICAgKiBhLCBiLCBlXHJcbiAgICAgICAgICogYSwgYiwgZlxyXG4gICAgICAgICAqIEJ1dCBmb3Igbm93LCB0aGlzIGZlYXR1cmUgaXNuJ3QgYWRkZWQuXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8qIC0tLS0tIFN0ZXAgMDogUHJlcCB0aGUgc3RyaW5nIGFuZCB0dXJuIGl0IGludG8gYW4gYXJyYXkgLS0tLS0gKi9cclxuXHJcbiAgICAgICAgLy8gR2V0IHJpZCBvZiBhbnkgY2FycmlhZ2UgcmV0dXJuIHNwYWNlcyBhbmQgcmVwbGFjZSB0aGVtIHdpdGggdHlwaWNhbFxyXG4gICAgICAgIC8vIGVudGVyIHNwYWNlcy4gUmFpc2UgeW91ciBoYW5kIGlmIHlvdSB0ZW5kIHRvIGNhcnJhaWdlIHJldHVybiBtb3JlXHJcbiAgICAgICAgLy8gdGhhbiB5b3Ugc2hvdWxkXHJcbiAgICAgICAgLy8gKkkgcmFpc2UgbXkgaGFuZCpcclxuICAgICAgICBsZXQgYWx0ZXJlZFRleHQ6c3RyaW5nICA9IGNvbWJvc1N0ci5yZXBsYWNlQWxsKCdcXHInLCAnXFxuJyk7XHJcblxyXG4gICAgICAgIC8vIFNwbGl0IHRoZSBsaXN0IGJ5IGVudGVyIHNwYWNlc1xyXG4gICAgICAgIC8vbGV0IGFsdGVyZWRUZXh0TGlzdCA9IGFsdGVyZWRUZXh0LnNwbGl0KCdcXG4nKTtcclxuICAgICAgICBsZXQgYWx0ZXJlZFRleHRMaXN0OiBzdHJpbmdbXSA9IGFsdGVyZWRUZXh0LnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgLy8gVGhlcmUgbWF5IGJlIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLCBidXQgdGhpcyBpcyB3aGF0IEkgY2FtZSB1cCB3aXRoXHJcbiAgICAgICAgLy8gZm9yIGZpbHRlcmluZyBvdXQgZG91YmxlIGVudGVycyBhbmQgd2hhdG5vdFxyXG4gICAgICAgIGxldCBub0RvdWJsZUVudGVyVGV4dExpc3Q6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIC8qIC0tLS0tIFN0ZXAgMTogY2hlY2sgaWYgdGhlIHN0cmluZyBpcyB2YWxpZCAtLS0tLSAqL1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnRDb21ib1N0ciBvZiBhbHRlcmVkVGV4dExpc3QpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50Q29tYm9TdHIgaXMgZW1wdHkgZHVlIHRvIHNvbWV0aGluZyBsaWtlIGRvdWJsZSBlbnRlcnMsIHNraXAgdGhhdCBcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRDb21ib1N0ci5sZW5ndGggPT09IDAgfHwgZWxlbWVudENvbWJvU3RyLmxlbmd0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vRG91YmxlRW50ZXJUZXh0TGlzdC5wdXNoKGVsZW1lbnRDb21ib1N0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIE5leHQsIGNoZWNrIGlmIGVhY2ggZWxlbWVudCBoYXMgMiBjb21tYXMgYW5kIDMgd29yZHNcclxuICAgICAgICAgICAgY29uc3Qgc3BsaXRFbGVtZW50TGlzdDogc3RyaW5nW10gPSBlbGVtZW50Q29tYm9TdHIuc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBtb3JlIG9yIGxlc3MgdGhhbiAzIGVsZW1lbnRzIGluIHRoZSBsaXN0LCB0aGVuIHRoZXJlIGlzIHNvbWV0aGluZyB3cm9uZ1xyXG4gICAgICAgICAgICBpZiAoc3BsaXRFbGVtZW50TGlzdC5sZW5ndGggPCAzIHx8IHNwbGl0RWxlbWVudExpc3QubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoYFRoZSBjb21iaW5hdGlvbiBsaW5lICcke3NwbGl0RWxlbWVudExpc3QudG9TdHJpbmcoKX0nIHNob3VsZCBoYXZlIGArXHJcbiAgICAgICAgICAgICAgICBgMyBvciA0IHRlcm1zLCBidXQgaXQgaGFzICR7c3BsaXRFbGVtZW50TGlzdC5sZW5ndGh9IHRlcm1zIGluc3RlYWQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIE5vdyBjaGVjayBpZiBhbnkgb2YgdGhlIGVsZW1lbnRzIGFyZSBlbXB0eVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW0gb2Ygc3BsaXRFbGVtZW50TGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLnRyaW0oKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKGBUaGUgY29tYmluYXRpb24gbGluZSAnJHtzcGxpdEVsZW1lbnRMaXN0LnRvU3RyaW5nKCl9JyBgICtcclxuICAgICAgICAgICAgICAgICAgICBgaGFzIGF0IGxlYXN0IDEgZW1wdHkgdGVybS5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfS8vZm9yLW9mIGFsdGVyZWRUZXh0TGlzdFxyXG5cclxuICAgICAgICAvLyBOb3cgc2V0IGFsdGVyZWRUZXh0TGlzdCB0byB0aGUgbm9Eb3VibGVFbnRlciBzdHJpbmcgb25lLlxyXG4gICAgICAgIGFsdGVyZWRUZXh0TGlzdCA9IG5vRG91YmxlRW50ZXJUZXh0TGlzdDtcclxuXHJcbiAgICAgICAgLyogLS0tLS0gU3RlcCAyOiBjbGVhbiB0aGUgYWx0ZXJlZFRleHRMaXN0IC0tLS0tICovXHJcblxyXG4gICAgICAgIC8vIE5vdGU6IHRoaXMgaXMgZG9uZSBzZXBhcmF0ZWx5IGJlY2F1c2UgaWYgdGhlIGNvbWJvcyBzdHIgaXMgaW52YWxpZCwgSSBkb24ndCBcclxuICAgICAgICAvLyB3YW50IHRvIGRvIHVubmVjZXNzYXJ5IHdvcmsgYmVmb3JlIGZpbmRpbmcgdGhhdCBvdXQuXHJcblxyXG4gICAgICAgIC8vIE5vdyBjbGVhbiB0aGUgbGlzdFxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhbHRlcmVkVGV4dExpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXBhcmUgZm9yIGNsZWFuaW5nXHJcbiAgICAgICAgICAgIGxldCBuZXdFbGVtZW50Q29tYm9TdHI6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBhbHRlcmVkVGV4dExpc3QsIHN0ZXAgMjogJHthbHRlcmVkVGV4dExpc3R9YCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3BsaXRFbGVtZW50TGlzdDogc3RyaW5nW10gPSBhbHRlcmVkVGV4dExpc3RbaV0uc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgICAgIC8vZGVidWdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgc3BsaXRFbGVtZW50TGlzdCwgc3RlcCAyOiAke3NwbGl0RWxlbWVudExpc3R9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhbiBlYWNoIGVsZW1lbnQgaW4gdGhlIGVsZW1lbnQgY29tYm9cclxuICAgICAgICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gMDsgaiA8IHNwbGl0RWxlbWVudExpc3QubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBzcGxpdEVsZW1lbnRMaXN0W2pdOiAke3NwbGl0RWxlbWVudExpc3Rbal19YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRFbGVtID0gc3BsaXRFbGVtZW50TGlzdFtqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgcmlkIG9mIGV4dHJhIHdoaWxlIHNwYWNlXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbSA9IGN1cnJlbnRFbGVtLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHN0cmluZyB0byBhbGwgbG93ZXJjYXNlIHRvIHByZXZlbnQgdW5uZWNlc3NhcnkgY2FwaXRhbGl6YXRpb24gZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW0gPSBjdXJyZW50RWxlbS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgY2xlYW5lZCBlbGVtZW50IHRvIHRoZSBuZXcgZWxlbWVudCBjb21ibyBzdHJpbmdcclxuICAgICAgICAgICAgICAgIG5ld0VsZW1lbnRDb21ib1N0ciA9IG5ld0VsZW1lbnRDb21ib1N0ciArIGN1cnJlbnRFbGVtICsgJywgJ1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0vL2ZvciBqXHJcblxyXG4gICAgICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYG5ld0VsZW1lbnRDb21ib1N0ciBiZWZvcmUgLCA6XFxuICR7bmV3RWxlbWVudENvbWJvU3RyfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gVGFrZSBvZmYgdGhhdCBsYXN0ICcsICdcclxuICAgICAgICAgICAgbmV3RWxlbWVudENvbWJvU3RyID0gbmV3RWxlbWVudENvbWJvU3RyLnN1YnN0cmluZygwLCBuZXdFbGVtZW50Q29tYm9TdHIubGVuZ3RoIC0gMik7XHJcblxyXG4gICAgICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYG5ld0VsZW1lbnRDb21ib1N0ciBhZnRlciAsIDpcXG4gJHtuZXdFbGVtZW50Q29tYm9TdHJ9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3cgdXBkYXRlIHRoZSBhbHRlcmVkVGV4dExpc3RcclxuICAgICAgICAgICAgYWx0ZXJlZFRleHRMaXN0W2ldID0gbmV3RWxlbWVudENvbWJvU3RyO1xyXG5cclxuICAgICAgICB9Ly9mb3IgaVxyXG5cclxuICAgICAgICAvLyBOb3cgcmV0dXJuIHRoZSBsaXN0IVxyXG4gICAgICAgIHJldHVybiBhbHRlcmVkVGV4dExpc3Q7XHJcblxyXG4gICAgfS8vY29udmVydENvbWJvVGV4dFRvU3RyQXJyXHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZU5hbWVUb0lkTWFwKGNvbWJvVHh0QXJyOiBzdHJpbmdbXSl7XHJcblxyXG4gICAgICAgIC8vIE1hcFxyXG4gICAgICAgIGNvbnN0IG5ld05hbWVUb0lkTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuXHJcbiAgICAgICAgLy8gaWQgZ2VuZXJhdGlvblxyXG4gICAgICAgIGxldCBpZENvdW50ID0gMTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGZvciBnZW5lcmF0aW5nIG5hbWVzXHJcbiAgICAgICAgZm9yIChjb25zdCBjb21ib1N0ciBvZiBjb21ib1R4dEFycikge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlyc3QgYnJlYWsgdXAgY29tYm9TdHJcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHNJbkNvbWJvU3RyOiBzdHJpbmdbXSA9IGNvbWJvU3RyLnNwbGl0KCcsJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3cgZ28gdGhyb3VnaCBlYWNoIGVsZW1lbnRcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtIG9mIGVsZW1lbnRzSW5Db21ib1N0cikge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyB0cmltIChzaW5jZSB0aGUgc3BhY2UgaXMgbGVmdCB0aGVyZSBvbiBwdXJwb3VzZSlcclxuICAgICAgICAgICAgICAgIGxldCBlZGl0ZWRFbGVtU3RyOiBzdHJpbmcgPSBlbGVtLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGluIHRoZSBtYXBcclxuICAgICAgICAgICAgICAgIGlmIChuZXdOYW1lVG9JZE1hcC5oYXMoZWRpdGVkRWxlbVN0cikgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIGl0J3Mgbm90LCBhZGQgaXQgdG8gdGhlIG1hcFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld05hbWVUb0lkTWFwLnNldChlZGl0ZWRFbGVtU3RyLCBpZENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5jcmVtZW50IGlkQ291bnRcclxuICAgICAgICAgICAgICAgICAgICBpZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfS8vIGZvciBlbGVtIGluIGNvbWJvU3RyXHJcblxyXG4gICAgICAgIH0vL2ZvciBjb21ib1R4dEFyclxyXG5cclxuICAgICAgICAvLyBNYXAgY29tcGxldGUsIHJldHVybiBpdCFcclxuICAgICAgICByZXR1cm4gbmV3TmFtZVRvSWRNYXA7XHJcblxyXG4gICAgfS8vY3JlYXRlTmFtZVRvSWRNYXBcclxuXHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUlkVG9PYmpNYXAoY29tYm9UeHRBcnI6IHN0cmluZ1tdLCBuYW1lVG9JZE1hcDogTWFwPHN0cmluZywgbnVtYmVyPil7XHJcblxyXG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBuYW1lVG9JZCBtYXAgaXMgZW1wdHlcclxuICAgICAgICBpZiAobmFtZVRvSWRNYXAgPT0gbnVsbCB8fCBuYW1lVG9JZE1hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdUaGUgbmFtZVRvSWRNYXAgcGFyYW1ldGVyIGlzIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFwXHJcbiAgICAgICAgY29uc3QgbmV3SWRUb09iak1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50PiA9IG5ldyBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+KCk7XHJcblxyXG4gICAgICAgIC8vIEdvIHRocm91Z2ggdGhlIGNvbWJvVHh0QXJyIGFnYWluLCBidXQgdGhpcyB0aW1lIEknbSBjcmVhdGluZyBlbGVtZW50IG9iamVjdHMgICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBjb21ib1N0ciBvZiBjb21ib1R4dEFycikge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlyc3QgYnJlYWsgdXAgY29tYm9TdHJcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHNJbkNvbWJvU3RyOiBzdHJpbmdbXSA9IGNvbWJvU3RyLnNwbGl0KCcsJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgdHdvIHBhcmVudCBpZHMgYW5kIHJvdyBudW1zIGluIHRoaXMgYXJyIGZvciBlYXNlIG9mIHVzZVxyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRJZHM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJvd051bXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBFbGVtZW50cyAxIGFuZCAyIC0+IGdldCBwYXJlbnQgaWRzLCBjcmVhdGUgb2JqcyBmb3IgYmFzZSBlbGVtZW50c1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBlbGVtZW50IG5hbWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1OYW1lOiBzdHJpbmcgPSBlbGVtZW50c0luQ29tYm9TdHJbaV0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcGFyZW50IGlkIHRvIHRoZSBwYXJlbnRJZHNBcnJcclxuICAgICAgICAgICAgICAgIHBhcmVudElkc1tpXSA9IG5hbWVUb0lkTWFwLmdldChlbGVtTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHBhcmVudCBlbGVtZW50IGRvZXNuJ3QgZXhpc3QsIHdoaWNoIG1lYW5zIGl0J3MgYSBiYXNlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIChlLmcuIGZpcmUsIHdhdGVyLCBlYXJ0aCwgYWlyLCBldGMuKSBjcmVhdGUgaXRcclxuICAgICAgICAgICAgICAgIGlmIChuZXdJZFRvT2JqTWFwLmhhcyhwYXJlbnRJZHNbaV0pID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYmFzZSBlbGVtZW50IHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0lkVG9PYmpNYXAuc2V0KHBhcmVudElkc1tpXSwgbmV3IENvbWJvRWxlbWVudChwYXJlbnRJZHNbaV0sIGVsZW1OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLCAwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfS8vZm9yIGlcclxuXHJcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBwYXJlbnQgZWxlbWVudHMgZXhpc3QsIHVwZGF0ZSB0aGUgcGFyZW50Um93TnVtcyBhcnJheVxyXG4gICAgICAgICAgICBwYXJlbnRSb3dOdW1zWzBdID0gbmV3SWRUb09iak1hcC5nZXQocGFyZW50SWRzWzBdKS5yb3dOdW1iZXI7XHJcbiAgICAgICAgICAgIHBhcmVudFJvd051bXNbMV0gPSBuZXdJZFRvT2JqTWFwLmdldChwYXJlbnRJZHNbMV0pLnJvd051bWJlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIEVsZW1lbnRzIDMgYW5kIG1heWJlIDQgLT4gaGFuZGxlIGFzIGNoaWxkcmVuLiBJIHVzZSAubGVuZ3RoXHJcbiAgICAgICAgICAgIC8vIGluIGNhc2UgdGhlIDR0aCBlbGVtZW50IGRvZXNuJ3QgZXhpc3QuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAyOyBqIDwgZWxlbWVudHNJbkNvbWJvU3RyLmxlbmd0aDsgaisrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGlsZCBlbGVtZW50IG5hbWUgYW5kIGlkXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZE5hbWU6IHN0cmluZyA9IGVsZW1lbnRzSW5Db21ib1N0cltqXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZElkOiBudW1iZXIgPSBuYW1lVG9JZE1hcC5nZXQoY2hpbGROYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3cgaGFuZGxlIHRoZSBjaGlsZCBlbGVtZW50KHMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoaWxkRWxlbWVudHMoY2hpbGROYW1lLCBjaGlsZElkLCBwYXJlbnRJZHMsIHBhcmVudFJvd051bXMsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICAgICAgfS8vZm9yIGpcclxuXHJcbiAgICAgICAgfS8vZm9yIGNvbWJvVHh0QXJyXHJcblxyXG4gICAgICAgIC8vIE5vdyByZXR1cm4gdGhlIGlkVG9PYmpNYXAhXHJcbiAgICAgICAgcmV0dXJuIG5ld0lkVG9PYmpNYXA7XHJcblxyXG4gICAgfSAvL2NyZWF0ZUlkVG9PYmpNYXBcclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlQ2hpbGRFbGVtZW50cyhjaGlsZE5hbWU6IHN0cmluZywgY2hpbGRJZDogbnVtYmVyLCBwYXJlbnRJZHM6IG51bWJlcltdLFxyXG4gICAgICAgICBwYXJlbnRSb3dOdW1zOiBudW1iZXJbXSwgbmV3SWRUb09iak1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50Pikge1xyXG5cclxuICAgICAgICAvLyBRdSAxOiBkb2VzIHRoZSBjaGlsZCBlbGVtZW50IGV4aXN0XHJcbiAgICAgICAgaWYgKG5ld0lkVG9PYmpNYXAuaGFzKGNoaWxkSWQpID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNoaWxkIHJvdyBudW1cclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDaGlsZFJvd051bTogbnVtYmVyID0gbmV3SWRUb09iak1hcC5nZXQoY2hpbGRJZCkucm93TnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgLy8gUXUgMjogSXMgdGhpcyBhIGN5Y2xpY2FsIGNvbWJvPyAoYXQgbGVhc3Qgb25lIG9mIHRoZSBwYXJlbnQncyByb3cgbnVtc1xyXG4gICAgICAgICAgICAvLyBpcyBlcXVhbCB0byBvciBsYXJnZXIgdGhhbiB0aGUgcHJlLWV4aXN0aW5nIGNoaWxkIGVsZW1lbnQncyByb3cgbnVtKVxyXG4gICAgICAgICAgICBpZiAocGFyZW50Um93TnVtc1swXSA+PSBleGlzdGluZ0NoaWxkUm93TnVtIHx8XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRSb3dOdW1zWzFdID49IGV4aXN0aW5nQ2hpbGRSb3dOdW0pIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBhZGRpdGlvbmFsIHBhcmVudCBjb21ibyB0byB0aGUgY2hpbGQgZWxlbWVudCBvbiB0aGUgbWFwLiBcclxuICAgICAgICAgICAgICAgIG5ld0lkVG9PYmpNYXAuZ2V0KGNoaWxkSWQpLmFkZEN5Y2xpY2FsUGFyZW50UGFpcihudWxsLCBwYXJlbnRJZHMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTm90IGEgY3ljbGljYWwgY29tYm9cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGFkZGl0aW9uYWwgcGFyZW50IGNvbWJvIHRvIHRoZSBjaGlsZCBlbGVtZW50IG9uIHRoZSBtYXAuIFxyXG4gICAgICAgICAgICAgICAgbmV3SWRUb09iak1hcC5nZXQoY2hpbGRJZCkuYWRkUGFyZW50UGFpcihudWxsLCBwYXJlbnRJZHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFF1IDM6IElzIHRoaXMgYSBzbWFsbGVyIHBhcmVudCBjb21ibz9cclxuICAgICAgICAgICAgICAgIC8vIEV4LiBMZXQncyBzYXkgbXVkID0gcmFpbiAoc2F5IHJvdyA1KSArIGRpcnQgKHNheSByb3cgNCkuXHJcbiAgICAgICAgICAgICAgICAvLyBCdXQgaWYgbGF0ZXIsIGl0J3MgZm91bmQgd2F0ZXIgKyBlYXJ0aCA9IG11ZCwgdGhlbiBtdWQgXHJcbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgaW4gcm93IDEsIG5vdCA2LiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRSb3dOdW1zWzBdIDwgZXhpc3RpbmdDaGlsZFJvd051bSAmJiBcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRSb3dOdW1zWzFdIDwgZXhpc3RpbmdDaGlsZFJvd051bSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNoaWxkJ3MgbmV3IHJvdyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdSb3dOdW0gPSBDb21ib0VsZW1lbnQuY2FsY3VsYXRlUm93TnVtKHBhcmVudFJvd051bXNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFJvd051bXNbMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGVsZW1lbnQncyByb3cgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SWRUb09iak1hcC5nZXQoY2hpbGRJZCkucm93TnVtYmVyID0gbmV3Um93TnVtO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgbWFwIERPRVMgTk9UIGhhdmUgdGhlIGNvbWJvIGVsZW1lbnQgZm9yIHRoaXMgaWQsXHJcbiAgICAgICAgLy8gc28gY3JlYXRlIGEgbmV3IGNoaWxkIGVsZW1lbnRcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBjaGlsZCdzIHJvdyBudW1cclxuICAgICAgICAgICAgY29uc3QgY2hpbGRSb3dOdW0gPSBDb21ib0VsZW1lbnQuY2FsY3VsYXRlUm93TnVtKHBhcmVudFJvd051bXNbMF0sIHBhcmVudFJvd051bXNbMV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcmVudCBwYWlyXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFBhaXI6IFBhcmVudFBhaXIgPSBuZXcgUGFyZW50UGFpcihwYXJlbnRJZHNbMF0sIHBhcmVudElkc1sxXSk7XHJcblxyXG4gICAgICAgICAgICBuZXdJZFRvT2JqTWFwLnNldChjaGlsZElkLFxyXG4gICAgICAgICAgICAgICAgbmV3IENvbWJvRWxlbWVudChjaGlsZElkLCBjaGlsZE5hbWUsIHBhcmVudFBhaXIsIGNoaWxkUm93TnVtKSk7XHJcblxyXG4gICAgICAgIH0gLy8gaWYgY2hpbGQgZWxlbWVudCBleGlzdHMgb3Igbm90XHJcblxyXG4gICAgfS8vaGFuZGxlQ2hpbGRFbGVtZW50c1xyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVSb3dUb0lkc01hcChpZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+KXtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3Um93VG9JZHNNYXA6IE1hcDxudW1iZXIsIG51bWJlcltdPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXJbXT4oKTtcclxuXHJcbiAgICAgICAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGlkVG9PYmpNYXAgaXMgZW1wdHlcclxuICAgICAgICBpZiAoaWRUb09iak1hcCA9PSBudWxsIHx8IGlkVG9PYmpNYXAuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcignVGhlIGlkVG9PYmpNYXAgcGFyYW1ldGVyIGlzIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlkQ291bnQ6IG51bWJlciA9IDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUgKGlkQ291bnQgPD0gaWRUb09iak1hcC5zaXplKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJvd051bSBvZiB0aGUgZWxlbWVudFxyXG4gICAgICAgICAgICBjb25zdCBlbGVtUm93TnVtID0gaWRUb09iak1hcC5nZXQoaWRDb3VudCkucm93TnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1Jvd1RvSWRzTWFwLmhhcyhlbGVtUm93TnVtKSA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcm93SWRBcnIgYW5kIGFkZCB0aGUgcm93TnVtIHRvIGl0XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdSb3dBcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgICAgICBuZXdSb3dBcnIucHVzaChpZENvdW50KTtcclxuICAgICAgICAgICAgICAgIG5ld1Jvd1RvSWRzTWFwLnNldChlbGVtUm93TnVtLCBuZXdSb3dBcnIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGtleSBhbHJlYWR5IGV4aXN0cywgYWRkIGl0IHRvIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgbmV3Um93VG9JZHNNYXAuZ2V0KGVsZW1Sb3dOdW0pLnB1c2goaWRDb3VudCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpbmNyZW1lbnQgdGhlIGlkIGNvdW50XHJcbiAgICAgICAgICAgIGlkQ291bnQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgbmV3IG1hcFxyXG4gICAgICAgIHJldHVybiBuZXdSb3dUb0lkc01hcDtcclxuICAgIH1cclxuXHJcblxyXG59Ly9jbGFzcyBUZXh0VG9IYXNoTWFwcyIsIi8qLS0tLS0tLS0tLS0gQ1VTVE9NIEVSUk9SUyAtLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBjdXN0b20gZXJyb3IgdGhyb3duIHdoZW5ldmVyIHRoZXJlJ3MgYSBwcm9ibGVtIHdpdGhcclxuICogYSBwcm92aWRlZCBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhZElucHV0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkJhZElucHV0RXJyb3JcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBjdXN0b20gZXJyb3IgdGhyb3duIHdoZW5ldmVyIHRoZXJlJ3MgYSBwcm9ibGVtIHdpdGhcclxuICogYW4gZXhwZWN0ZWQgb3V0cHV0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFkT3V0cHV0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkJhZElucHV0RXJyb3JcIjtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbmltcG9ydCB7IENvbWJvTWFwIH0gZnJvbSBcIi4vYmFzZV9maWxlcy9jb21ib19tYXBcIjtcclxuaW1wb3J0IHsgY29udmVydFR4dEZpbGVEYXRhVG9TdHIgfSBmcm9tIFwiLi9nZW5lcmF0ZV9jb21ib19tYXAvZmlsZV90b19kYXRhX3N0clwiO1xyXG5cclxuLy8gTm90aWZ5IHRoZSBwcm9ncmFtbWVyIHRoZWlyIGNvZGUgd29uJ3Qgd29yayBvciBicmVhayB1bnRpbCB0aGV5XHJcbi8vIGFjdHVhbGx5IHVwbG9hZCB0aGUgY29tYm9zIHR4dCBmaWxlXHJcbmNvbnNvbGUubG9nKFwiVG8gZ2V0IHN0YXJ0ZWQsIHVwbG9hZCB0aGUgY29tYm9zIGZpbGUhXCIpO1xyXG5cclxuLy8gSW1wb3J0YW50IG9iamVjdHNcclxuXHJcbmxldCBjb21ib01hcDogQ29tYm9NYXAgPSBudWxsO1xyXG5sZXQgY29tYm9zU3RyID0gJyc7XHJcblxyXG4vLyBDcmVhdGUgYW4gZXZlbnQgZm9yIHdoZW4gc29tZW9uZSB1cGxvYWRzIGEgZmlsZSB0byB0aGVcclxuLy8gZ2V0Q29tYm9GaWxlIGlucHV0IHRhZ1xyXG5jb25zdCBjb21ib3NGaWxlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRDb21ib0ZpbGUnKTtcclxuY29tYm9zRmlsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBleHRyYWN0Q29tYm9GaWxlVGV4dEV2ZW50KTtcclxuXHJcbi8vIEphdmFTY3JpcHQgaGFuZGxlcyBleHRyYWN0aW5nIHRleHQgZnJvbSBhbiB1cGxvYWRlZCBmaWxlIGFzIGFuXHJcbi8vIGFzeW5jcm9ub3VzIHByb2Nlc3MsIHdoaWNoIG1lYW5zIEphdmFTY3JpcHQgd29ya3Mgb24gdGhhdCBjb2RlXHJcbi8vIHdoaWxlIG5vcm1hbCBjb2RlIGlzIHJ1bm5pbmcuXHJcbi8vIEFsc28gSSBjb3VsZCBub3QgZm9yIHRoZSBsaWZlIG9mIG1lIGZpZ3VyZSBvdXQgd2hhdCB0aGUgdHlwZSBvZlxyXG4vLyB0aGUgY2hhbmdlIGV2ZW50IHdhcy4gSSB0aG91Z2h0IGl0IHdvdWxkIGJlIFwiQ2hhbmdlRXZlbnRcIiBvclxyXG4vLyBzb21ldGhpbmcsIGJ1dCBub3BlLCBhbiBcIkV2ZW50XCIuIEJ1dCBpdCdzIG5vdCBhbiBldmVudC4uLj9cclxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdENvbWJvRmlsZVRleHRFdmVudCgpIHtcclxuXHJcbiAgICAvLyBkZWJ1Z1xyXG4gICAgY29uc29sZS5sb2coJ0ZpbGUgZXZlbnQgZmlyZWQhJyk7XHJcblxyXG4gICAgY29tYm9zU3RyID0gYXdhaXQgY29udmVydFR4dEZpbGVEYXRhVG9TdHIodGhpcyk7XHJcblxyXG4gICAgLy8gTm93IHRoZSBtYWluIGNvZGUgb2YgdGhlIHByb2dyYW0gaXMgcmVhZHkgdG8gcnVuIVxyXG4gICAgbWFpbigpO1xyXG5cclxufS8vZXh0cmFjdENvbWJvRmlsZVRleHRFdmVudFxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuXHJcbiAgICAvLyBOb3cgdGhhdCBteSBmaWxlIGlzIHJlYWR5LCBjcmVhdGUgdGhlIGNvbWJvIG1hcCFcclxuICAgIGNvbWJvTWFwID0gbmV3IENvbWJvTWFwKGNvbWJvc1N0cik7XHJcbiAgICBcclxuICAgIC8vIC8vIE5vdyB0aGF0IG15IGZpbGUgaXMgcmVhZHksIGNvbnZlcnQgdGhlIHRleHQgdG8gZGF0YSFcclxuICAgIC8vIGNvbWJvc0luTWVtb3J5ID0gbmV3IENvbWJvc0luTWVtb3J5KGNvbWJvc1N0cik7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBtYXBcclxuXHJcbiAgICAvLyBncmFwaE1hcCA9IG5ldyBDb21ib01hcChjb21ib3NJbk1lbW9yeS5pZFRvRWxlbWVudE9iak1hcCxcclxuICAgIC8vICAgICBjb21ib3NJbk1lbW9yeS5yb3dOdW1Ub0lkTWFwKTtcclxuXHJcbiAgICAvL2dyYXBoTWFwID0gbmV3IENvbWJvTWFwKCk7XHJcblxyXG59Ly9tYWluXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=