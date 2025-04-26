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


/***/ }),

/***/ "./unit_tests/debug_objects/debug_combo_map.ts":
/*!*****************************************************!*\
  !*** ./unit_tests/debug_objects/debug_combo_map.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugComboMap: () => (/* binding */ DebugComboMap)
/* harmony export */ });
/* harmony import */ var _src_base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/base_files/combo_map */ "./src/base_files/combo_map.ts");

/**
 * This class allows me to debug ComboMap's protected methods
 * without worrying about someone accidentally calling a
 * Combo Map's protected methods
 */
class DebugComboMap extends _src_base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__.ComboMap {
    /* ------------------------ CONSTRUCTOR ------------------------ */
    // This constructor basically bypasses the ComboMap constructor!
    // This is because I want to put any map or data into the debug map
    // while preservinig its methods!
    constructor() {
        _src_base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__.ComboMap.canCreateDebugMap = true;
        super();
        _src_base_files_combo_map__WEBPACK_IMPORTED_MODULE_0__.ComboMap.canCreateDebugMap = false;
    }
    /* -------------------- GETTERS AND SETTERS -------------------- */
    getNameToIdMap() {
        return super.getNameToIdMap();
    }
    getIdToObjMap() {
        return super.getIdToObjMap();
    }
    getRowToIdsMap() {
        return super.getRowToIdsMap();
    }
    setNameToIdMap(map) {
        super.setNameToIdMap(map);
    }
    setIdToObjMap(map) {
        super.setIdToObjMap(map);
    }
    setRowToIdsMap(map) {
        super.setRowToIdsMap(map);
    }
    /* -------------------------- METHODS -------------------------- */
    updateComboElementRelations() {
        super.updateComboElementRelations();
    }
} //DebugComboMap


/***/ }),

/***/ "./unit_tests/test_base_files/test_file_data_to_str.ts":
/*!*************************************************************!*\
  !*** ./unit_tests/test_base_files/test_file_data_to_str.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   test_convertFileTxtToStr: () => (/* binding */ test_convertFileTxtToStr),
/* harmony export */   test_helper_changeEvent: () => (/* binding */ test_helper_changeEvent),
/* harmony export */   toggleFileDataToStrTest: () => (/* binding */ toggleFileDataToStrTest)
/* harmony export */ });
/* harmony import */ var _src_generate_combo_map_file_to_data_str__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/generate_combo_map/file_to_data_str */ "./src/generate_combo_map/file_to_data_str.ts");
/* harmony import */ var _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/other/custom_errors */ "./src/other/custom_errors.ts");
//yada yada


// Toggle fxn
function toggleFileDataToStrTest(doTest) {
    if (doTest === true) {
        console.log('The file data to string test is ready.\n' +
            'To run the test, input \'test_combos.txt\' ');
        test_convertFileTxtToStr();
    }
} //toggleTests
/**
 * Yes. I am insane.
 */
function test_convertFileTxtToStr() {
    // Note: I DO NOT use the file stream. Turns out, a browser won't allow
    // you to modify files inside of it- which, in retrospect, makes sense
    // because it would all be in one bundle.js file anyway. So the
    // test_combos.txt file is ONLY for this unit test. (And thus there will
    // be no file writing to be)
    // Get the input tag
    const combosFileInput = document.getElementById('getComboFile');
    // Enable the tag to indicate it is being tested
    // I need to cast it for it to work because HTML is awesome
    combosFileInput.disabled = false;
    // Create an event for when someone uploads a file to the
    // getComboFile input tag
    combosFileInput.addEventListener('change', test_helper_changeEvent);
} //test_convertFileTxtToStr
/**
 *
 * The input element in the test html file needs to be clicked on to run
 * the actual test, hence this fxn.
 *
 * @param e The change event. Don't ask me what the type is. I tried. I couldn't
 * figure it out. ;_;
 */
async function test_helper_changeEvent() {
    try {
        // run the file here...
        const outStr = await (0,_src_generate_combo_map_file_to_data_str__WEBPACK_IMPORTED_MODULE_0__.convertTxtFileDataToStr)(this);
        // If outStr is null or basically null, something went wrong. It could
        // be a file issue or it didn't actually draw any text. The provided test
        // text file is NOT EMPTY, so that wouldn't be the issue.
        if (outStr == null || outStr === '') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadOutputError('The conversion file completed, but the output string is null or empty.');
        }
        // There wasn't an error, so it passed the unit test!
        console.log('Test test_helper_changeEvent passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_1__.BadOutputError) {
            // Test failure: bad output error
            console.log('Test failure in test_helper_changeEvent, the error is a BadOutputError.');
            console.log(e.message);
        }
        else {
            // Test failure: unknown error
            console.log('Test failure in test_helper_changeEvent, the error is unknown.');
            console.log(e.name);
            console.log(e.message);
        }
    } // try-catch
} //test_helper_changeEvent


/***/ }),

/***/ "./unit_tests/test_generate_combo_map/generating_combo_map_tests.ts":
/*!**************************************************************************!*\
  !*** ./unit_tests/test_generate_combo_map/generating_combo_map_tests.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printMapMethodTesting: () => (/* binding */ printMapMethodTesting),
/* harmony export */   toggleGeneratingComboMapTests: () => (/* binding */ toggleGeneratingComboMapTests)
/* harmony export */ });
/* harmony import */ var _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/base_files/combo_element */ "./src/base_files/combo_element.ts");
/* harmony import */ var _debug_objects_debug_combo_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug_objects/debug_combo_map */ "./unit_tests/debug_objects/debug_combo_map.ts");
/* harmony import */ var _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/other/custom_errors */ "./src/other/custom_errors.ts");




// Toggle fxn
function toggleGeneratingComboMapTests(doAll) {
    if (doAll === true) {
        console.log('running ComboMap (generation) tests...');
        test_updateComboRelations();
    }
} //toggleTests
/**
 * questions:
 *  - For the basic combo, does mud have earth and water in its childOf set?
 *      - Do water and earth have mud in their parentOf sets?
 *  - For alternate parents, does rock have fire and mud in its childOf set?
 *      - Do fire and mud have rock in their parentOf sets?
 *  - For cyclical parents, does mud have rock and itself in its cyclical childOf set?
 *      - Do rock and mud have mud in their cyclical parentOf sets?
 */
function test_updateComboRelations() {
    /* --------------------------------- SET UP  --------------------------------- */
    //     'earth, water, mud' // basic combo
    //     'fire, earth, rock' // parent combo
    //     'fire, mud, rock' // second parent combos
    //     'water, mud, mud' // cyclical combo
    //     'rock, water, mud' // second cyclicl combo
    try {
        // Create a debugIdToObj map
        const debugIdToObjMap = new Map;
        // Create the five uniqe elements for the debug map
        debugIdToObjMap.set(1, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(1, 'earth', null, 0));
        debugIdToObjMap.set(2, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(2, 'water', null, 0));
        debugIdToObjMap.set(3, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(3, 'mud', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(1, 2), 1));
        debugIdToObjMap.set(4, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(4, 'fire', null, 0));
        debugIdToObjMap.set(5, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(5, 'rock', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(4, 1), 1));
        // second parent combo for rock
        debugIdToObjMap.get(5).addParentPair(new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(4, 3));
        // cyclical combos for mud
        debugIdToObjMap.get(3).addCyclicalParentPair(new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(2, 3));
        debugIdToObjMap.get(3).addCyclicalParentPair(new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(5, 2));
        // Create a debugComboMap
        const debugComboMap = new _debug_objects_debug_combo_map__WEBPACK_IMPORTED_MODULE_1__.DebugComboMap();
        // Add the debug idToObjMap
        debugComboMap.setIdToObjMap(debugIdToObjMap);
        // Now run the method
        debugComboMap.updateComboElementRelations();
        // This simplifys things for the tests
        const earthElem = debugIdToObjMap.get(1);
        const waterElem = debugIdToObjMap.get(2);
        const mudElem = debugIdToObjMap.get(3);
        const fireElem = debugIdToObjMap.get(4);
        const rockElem = debugIdToObjMap.get(5);
        /* --------------------------------- TESTS  ---------------------------------- */
        // Basic combo
        if ((mudElem.childOf.has(1) && mudElem.childOf.has(2)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Basic combo check failed. Expected ids 1 and 2 ` +
                `in mud's childOf set, but got this instead: ` +
                `${mudElem.setToString(mudElem.childOf)}`);
        }
        if ((earthElem.parentOf.has(3) && waterElem.parentOf.has(3)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Basic combo check failed. Expected id 3 in ` +
                `earth and water's parentOf sets, but got this instead: ` +
                `{${earthElem.setToString(earthElem.parentOf)}}, ` +
                `${waterElem.setToString(waterElem.parentOf)}}`);
        }
        // Alternate parent combo
        if ((rockElem.childOf.has(4) && rockElem.childOf.has(3)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Alternate parent combo check failed. Expected  ` +
                `ids 4 and 3 in rock's childOf set, but got this instead: ` +
                `${rockElem.setToString(rockElem.childOf)}`);
        }
        if ((fireElem.parentOf.has(5) && mudElem.parentOf.has(5)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Alternate parent combo check failed. Expected ` +
                `id 5 in fire and mud's parentOf sets, but got this instead: ` +
                `{${fireElem.setToString(fireElem.parentOf)}}, ` +
                `${mudElem.setToString(mudElem.parentOf)}}`);
        }
        // Cyclicl combo
        if ((mudElem.cyclicalChildOf.has(5) && mudElem.cyclicalChildOf.has(3)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Cyclical combo check failed. Expected ids 5 and 3 ` +
                `in mud's cyclicalChildOf set, but got this instead: ` +
                `${mudElem.setToString(mudElem.cyclicalChildOf)}`);
        }
        if ((rockElem.cyclicalParentOf.has(3) && mudElem.cyclicalParentOf.has(3)) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Cyclical combo check failed. Expected id 3 in rock ` +
                `and mud's cyclicalParentOf sets, but got this instead: ` +
                `{${rockElem.setToString(rockElem.cyclicalParentOf)}}, ` +
                `${mudElem.setToString(mudElem.cyclicalParentOf)}}`);
        }
        // There wasn't an error, so it passed the unit test!
        console.log('Test test_updateComboRelations passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError) {
            console.log('test_updateComboRelations test failed due to a bad output.');
            console.log(e.message);
            // if (printMap === true) {
            //     rowToIdsMap.forEach(printTestMap);
            // }
        }
        else {
            console.log('test_updateComboRelations test failed due to an unknown error.');
            //console.log(e.type);
            //console.log(e.message);
            console.log(e.stack);
        }
    }
} // test_updateComboRelations
/**
 * No idea how to write a unit test for this, so I will uh just print it and see if it's right!
 * (Since these print functions can have semantic changes, a user test that looks for exact
 * strings seems dumb to me)
 */
function printMapMethodTesting() {
    /**
     * water, fire, steam
     * earth, water, mud
     * air, air, pressure
     * mud, pressure, rock
     */
    // make debug maps
    const debugNameToIdMap = new Map();
    debugNameToIdMap.set('water', 1);
    debugNameToIdMap.set('fire', 2);
    debugNameToIdMap.set('steam', 3);
    debugNameToIdMap.set('earth', 4);
    debugNameToIdMap.set('mud', 5);
    debugNameToIdMap.set('air', 6);
    debugNameToIdMap.set('pressure', 7);
    debugNameToIdMap.set('rock', 8);
    const debugIdToObjMap = new Map();
    debugIdToObjMap.set(1, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(1, 'water', null, 0));
    debugIdToObjMap.set(2, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(2, 'fire', null, 0));
    debugIdToObjMap.set(3, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(3, 'steam', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(1, 2), 1));
    debugIdToObjMap.set(4, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(4, 'earth', null, 0));
    debugIdToObjMap.set(5, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(5, 'mud', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(4, 1), 1));
    debugIdToObjMap.set(6, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(6, 'air', null, 0));
    debugIdToObjMap.set(7, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(7, 'pressure', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(6, 6), 1));
    debugIdToObjMap.set(8, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(8, 'rock', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(5, 7), 2));
    const debugRowToIdsMap = new Map();
    debugRowToIdsMap.set(0, [1, 2, 4, 6]);
    debugRowToIdsMap.set(1, [3, 5, 7]);
    debugRowToIdsMap.set(2, [8]);
    // Make debug ComboMap
    const debugComboMap = new _debug_objects_debug_combo_map__WEBPACK_IMPORTED_MODULE_1__.DebugComboMap();
    // try the method, hope for the best
    console.log('Debugging the print map method in ComboMap');
    console.log(debugComboMap.getElementMapAsStr(debugNameToIdMap));
    console.log(debugComboMap.getElementMapAsStr(debugIdToObjMap));
    console.log(debugComboMap.getElementMapAsStr(debugRowToIdsMap));
} //printMethodTesting


/***/ }),

/***/ "./unit_tests/test_generate_combo_map/test_txt_to_hash_maps.ts":
/*!*********************************************************************!*\
  !*** ./unit_tests/test_generate_combo_map/test_txt_to_hash_maps.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toggleTxtToHashMapsTests: () => (/* binding */ toggleTxtToHashMapsTests)
/* harmony export */ });
/* harmony import */ var _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/base_files/combo_element */ "./src/base_files/combo_element.ts");
/* harmony import */ var _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/generate_combo_map/txt_to_hash_maps */ "./src/generate_combo_map/txt_to_hash_maps.ts");
/* harmony import */ var _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/other/custom_errors */ "./src/other/custom_errors.ts");



// Toggle fxn
function toggleTxtToHashMapsTests(doAll) {
    if (doAll === true) {
        console.log('running toggleTxtToHashMapsTests...');
        test_convertBadComboStrToStrArr();
        test_convertGoodComboStrToStrArr();
        test_createNameToIdMap();
        test_handleChildElements();
        test_createIdToObjMap();
        test_createRowToIdsMap();
    }
} //toggleTests
/**
 * This test checks for the expected behavior of invalid string inputs
 */
function test_convertBadComboStrToStrArr() {
    try {
        const badDataStrs = [];
        // Note: Multiple enters should not cause the combos file to be thrown out, so
        // that's handled in the goodComboStr test.
        // Note 2: I took off the enter spaces. My code would normally filter those out,
        // and I'm not testing for enter spaces here.
        // Empty element
        badDataStrs.push('fire, , smoke');
        // Too many elements
        badDataStrs.push('fire, water, air, pollution, smoke');
        // too few elements
        badDataStrs.push('fire, lava');
        try {
            // This should throw a bad input error for an empty element
            _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.convertComboTextToStrArr(badDataStrs[0]);
            // It didn't throw an error, so throw a bad output error
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('A BadInputError was expected for an empty element, but' +
                'it didn\'t happen');
        }
        catch (e) {
            if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError === true) {
                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[0]}' has at least 1 empty term.`) {
                    throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`The returned error message for the empty element check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
            }
            else {
                console.log('test_convertBadComboStrToStrArr test failed due to the empty string check');
                console.log(e.type);
                console.log(e.message);
            }
        }
        try {
            // This should throw a bad input error for too many elements
            _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.convertComboTextToStrArr(badDataStrs[1]);
            // It didn't throw an error, so throw a bad output error
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('A BadInputError was expected for too many elements, but' +
                'it didn\'t happen');
        }
        catch (e) {
            // Check if the returned error message is correct
            if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError === true) {
                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[1]}' should have ` +
                    `3 or 4 terms, but it has 5 terms instead.`) {
                    throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`The returned error message for the too many elements check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
            }
            else {
                console.log('test_convertBadComboStrToStrArr test failed due to the too many elements check');
                console.log(e.type);
                console.log(e.message);
            }
        }
        try {
            // This should throw a bad input error for too few elementa
            _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.convertComboTextToStrArr(badDataStrs[2]);
            // It didn't throw an error, so throw a bad output error
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('A BadInputError was expected for too few elements, but' +
                'it didn\'t happen');
        }
        catch (e) {
            if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError === true) {
                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[2]}' should have ` +
                    `3 or 4 terms, but it has 2 terms instead.`) {
                    throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`The returned error message for the too few elements check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
            }
            else {
                console.log('test_convertBadComboStrToStrArr test failed due to the too few elements check');
                console.log(e.type);
                console.log(e.message);
            }
        }
        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_convertBadComboStrToStrArr passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError === true) {
            console.log('test_convertBadComboStrToStrArr test failed due to an unexpected output error');
            console.log(e.message);
        }
        else {
            console.log('test_convertBadComboStrToStrArr test failed due to an unknown error, and it ' +
                'broke out of the other try-catches somehow. What happened???');
            console.log(e.type);
            console.log(e.message);
        }
    } //try-catch (for the whole test)
} // test_convertBadComboStrToStrArr
/**
 * This test checks for the expected behavior of valid string inputs
 */
function test_convertGoodComboStrToStrArr() {
    try {
        const goodDataStr = '      air, air, pressure   \n' +
            'fire,     air, \t\tsm o ke\n' +
            'wATEr, fiRE, StEaM\n' +
            '(e@rth), \'w$t + l!qúid\', &m%d\n' +
            '\n\n\nfire, earth, lava\n' +
            '\rwater, water, pond\n';
        const goodDataResultArr = _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.convertComboTextToStrArr(goodDataStr);
        // Now check the array
        // Check if trim worked
        if (goodDataResultArr[0] !== 'air, air, pressure') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Trim check failed. Got this instead:\n` +
                `'${goodDataResultArr[0]}'`);
        }
        // Check if extra white space was taken out, but intentional
        // white space is left in
        if (goodDataResultArr[1] !== 'fire, air, sm o ke') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Extra whitespace check failed. Got this instead:\n` +
                `'${goodDataResultArr[1]}'`);
        }
        // Check if everything is lower case
        if (goodDataResultArr[2] !== 'water, fire, steam') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Lower case check failed. Got this instead:\n` +
                `'${goodDataResultArr[2]}'`);
        }
        // Check if the special symbols are left in
        if (goodDataResultArr[3] !== '(e@rth), \'w$t + l!qúid\', &m%d') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Special chatacter check failed (They should be in there).` +
                ` Got this instead:\n'${goodDataResultArr[3]}'`);
        }
        // Check if double enters are properly filtered out
        if (goodDataResultArr.length !== 6 || goodDataResultArr[4] !== 'fire, earth, lava') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Double enter check failed. ` +
                `Got this instead:\n'${goodDataResultArr[4]}'\nlength of arr: ` +
                `${goodDataResultArr.length}`);
        }
        // Check if carriage returns (\r) are properly replaced with normal \n enter spaces
        if (goodDataResultArr[5] !== 'water, water, pond') {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Carriage return check failed. ` +
                `Got this instead:\n'${goodDataResultArr[5]}'`);
        }
        // There wasn't an error, so it passed the unit test!
        console.log('Test test_convertGoodComboStrToStrArr passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError === true) {
            console.log('test_convertComboStrToStrArr test failed due to a bad output.');
            console.log(e.message);
        }
        else {
            console.log('test_convertComboStrToStrArr test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
        }
    } //catch
} //test_convertComboStrToStrArr
/**
 * Test questions:
 *  - Did the trim work?
 *  - Are names actually being assigned to ids? (check if empty)
 *  - Are ids being assigned correctly?
 *  - Are there duplicates of any names?
 */
function test_createNameToIdMap() {
    const comboTxtArr = [
        'fire, water, steam',
        'water, earth, mud'
    ];
    /**
     * Expected names to ids:
     *
     *  fire    | 1
     *  water   | 2
     *  steam   | 3
     *  earth   | 4
     *  mud     | 5
     */
    // create the test id map
    const nameToIdMap = _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createNameToIdMap(comboTxtArr);
    // This is a toggle for printing the map if needed
    let printMap = false;
    try {
        if (nameToIdMap.size == null || nameToIdMap.size === 0) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Empty map check failed.');
        }
        // For future tests, print the map if there's a bad output failure
        printMap = true;
        if (nameToIdMap.size !== 5) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Size check failed. The size of the map was ` +
                `expected to be 5, but is this instead: ${nameToIdMap.size}`);
        }
        if (nameToIdMap.has('fire') === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Trim check failed.');
        }
        if (nameToIdMap.get('steam') !== 3) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Id check failed. The element \'steam\' was expected ' +
                'to have an id of 3');
        }
        // There wasn't an error, so it passed the unit test!
        console.log('Test test_createNameToIdMap passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError) {
            console.log('test_convertComboStrToStrArr test failed due to a bad output.');
            console.log(e.message);
            if (printMap === true) {
                nameToIdMap.forEach(printTestMap);
            }
        }
        else {
            console.log('test_convertComboStrToStrArr test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
        }
    } // catch
} //test_createNameToIdMap
/**
 * Test questions:
 *  - Are the name, id, and rowNum correct?
 *  - Is the added parent pair correct?
 *  - Is an older child correctly given a second parent pair?
 *  - Are cyclical pairs added correctly?
 *
 */
function test_handleChildElements() {
    /**
    comboTxtArr:
        'earth, water, mud', // test basic
        'fire, mud, rock', // test rowNum increment
        'mud, earth, rock', // test alternate parent combo
        'rock, mud, earth' // test cyclical combo
        'fire, water, boil'
        'boil, rock, lava'
        'fire, earth, lava' // Test reduced rowNum
    */
    /**
     * Expected names to ids:
     *
     * earth    | 1
     * water    | 2
     * mud      | 3
     * fire     | 4
     * rock     | 5
     * boil     | 6
     * lava     | 7
     */
    /**
     * Expected rows:
     *
     * 0 | 1, 2, 4
     * 1 | 3, 6, 7
     * 2 | 5
     */
    // Side note: I didn't add water and fire to the debugIdMap because I didn't need
    // to. I only added earth for the cyclical combo test.
    // Create the test idToObjMap
    const debugIdToObjMap = new Map();
    // populate the debug map with a test element (Only doing 2 elements since the
    // rest of the child elements will just check parent pairs)
    // test alternate parent combo for rock
    //const debugRockElem = new ComboElement(5, 'rock', new ParentPair(4, 3), 2);
    // test cyclical combo for earth
    const debugEarthElem = new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(1, 'earth', null, 0);
    // debugIdToObjMap.set(5, debugRockElem);
    debugIdToObjMap.set(1, debugEarthElem);
    try {
        // Check that a new element of id 3 was added to the idToObjMap
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('mud', 3, new Array(1, 2), new Array(0, 0), debugIdToObjMap);
        if (debugIdToObjMap.has(3) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Add new element to idToObjMap check failed. '
                + 'Id could not be found.');
        }
        // Check that the added new element's contents are correct
        const shouldBeMud = debugIdToObjMap.get(3);
        if (shouldBeMud.name !== 'mud' || shouldBeMud.parentPairs[0].get(0) !== 1
            || shouldBeMud.parentPairs[0].get(1) !== 2 || shouldBeMud.rowNumber != 1) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Add new element to idoObjMap check failed. ` +
                `Expected element ('mud', id = 3, pPair = [1, 2], rowNum = 1), but ` +
                `got this instead: \n${shouldBeMud.getComboElementAsStr(false)}`);
        }
        // Test if the row increment is working
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('rock', 5, new Array(4, 3), new Array(0, 1), debugIdToObjMap);
        if (debugIdToObjMap.get(5).rowNumber != 2) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`New element rowNum increment check failed. Expected ` +
                `rowNumber = 2, but got a rowNumber = ` +
                `${debugIdToObjMap.get(5).rowNumber} instead.` +
                `Pairs: ${debugIdToObjMap.get(5).getParentPairsAsStr(false)}`);
        }
        // Test alternate parent combo
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('rock', 5, new Array(3, 1), new Array(0, 1), debugIdToObjMap);
        const rockParentPairs = debugIdToObjMap.get(5).parentPairs;
        if (rockParentPairs.length != 2 || rockParentPairs[1].get(0) != 3 ||
            rockParentPairs[1].get(1) != 1) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Alternate parent combo check failed. Expected ` +
                `parentPairs = { [4, 3], [3, 1] }, but got this instead: ` +
                `${debugIdToObjMap.get(5).getParentPairsAsStr(false)}`);
        }
        // Test cyclical combo
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('earth', 1, new Array(5, 3), new Array(2, 1), debugIdToObjMap);
        if (debugIdToObjMap.get(1).cyclicalParentPairs == null) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Cyclical parent check failed. The cyclicalParent ` +
                `array is empty.`);
        }
        if (debugIdToObjMap.get(1).cyclicalParentPairs.length !== 1) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Cyclical parent check failed. The cyclicalParent ` +
                `array is expected to have one pair, but it has ` +
                `${debugIdToObjMap.get(1).cyclicalParentPairs.length} pairs instead.` +
                `Pairs: ${debugIdToObjMap.get(5).getParentPairsAsStr(true)}`);
        }
        if (debugIdToObjMap.get(1).cyclicalParentPairs[0].get(0) != 5 ||
            debugIdToObjMap.get(1).cyclicalParentPairs[0].get(1) != 3) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Cyclical parent check failed. Expected cyclical ` +
                `parent pair {[5, 3]}, but is ` +
                `${debugIdToObjMap.get(1).getParentPairsAsStr(true)} instead.`);
        }
        // Test reduced rowNum
        const debugBoilElem = new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(6, 'boil', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(4, 2), 1);
        debugIdToObjMap.set(6, debugBoilElem);
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('lava', 7, new Array(6, 5), new Array(1, 2), debugIdToObjMap);
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.handleChildElements('lava', 7, new Array(4, 1), new Array(0, 0), debugIdToObjMap);
        if (debugIdToObjMap.get(7).rowNumber != 1) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Reduced rowNumber check failed. Expected lava ` +
                `to have a rowNum of 1, but got ${debugIdToObjMap.get(7).rowNumber} ` +
                `instead.`);
        }
        // Note: A combo element will throw an error if someone attempts to set a new
        // parent pair to a base element (the parentPairs arr is set to null)
        // Note 2: Double child elements are processed one child at a time, so that's
        // beyond the scope of this method. Testing if two children are added is done
        // in the test_createIdToObj map
        // There wasn't an error, so it passed the unit test!
        console.log('Test test_handleChildElements passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError) {
            console.log('test_handleChildElements test failed due to a bad output.');
            console.log(e.message);
        }
        else {
            console.log('test_handleChildElements test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
            console.log(e.stack);
        }
    } //catch
} // test_handleChildElements
/**
 * Test questions:
 * - Does it throw the bad input error correctly?
 *  - Is the number of expecteted elements correct?
 *      - Is the number of parent elements correct?
 * - Is a base parent element added correctly?
 * - Is the map the correct size?
 * - Do double children get two entries on the map?
 *
 */
function test_createIdToObjMap() {
    try {
        const comboTxtArr = [
            'fire, water, steam',
            'water, steam, cloud',
        ];
        // Test if the method throws a BadOutputError for passing in an empty map
        const emptyNameMap = new Map();
        try {
            // This should throw a BadInputError. 
            _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createIdToObjMap(comboTxtArr, emptyNameMap);
            // An error wasn't thrown from the method, but it should have.
            // Throw a bad output error because this test has failed.
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Empty map error check failed. A BadInputError was ' +
                'expected, but never thrown.');
            // Catch the expected error. If it's a BadInputError as expectd, nothing happens
            // and the test moves on. But if a different error is thrown, that will fail the test. 
        }
        catch (emptyTestError) {
            // Throw the unexpected error as is.
            if ((emptyTestError instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError) === false) {
                throw emptyTestError;
            }
        }
        // Set up for the next few rounds of testing
        const debugNameToIdMap = new Map();
        debugNameToIdMap.set('fire', 1);
        debugNameToIdMap.set('water', 2);
        debugNameToIdMap.set('steam', 3);
        debugNameToIdMap.set('cloud', 4);
        let newIdToObjMap = _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createIdToObjMap(comboTxtArr, debugNameToIdMap);
        // Check if the newIdToObj map is empty
        if (newIdToObjMap == null || newIdToObjMap.size === 0) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Empty map check failed. The newIdToObj map is empty.');
        }
        // Check to see if the base element water was created correctly
        if (newIdToObjMap.has(2) === false) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Add parent base element check failed. Could not find ' +
                'requested element that should exist.');
        }
        const shouldBeWater = newIdToObjMap.get(2);
        if (shouldBeWater.name !== 'water' || shouldBeWater.parentPairs !== null) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Add parent base element check failed. Element with` +
                `id 2 was expected to be water with null parentPairs, but got this instead:\n` +
                `${shouldBeWater.getComboElementAsStr}`);
        }
        // This check is important, even though it checks the handle child elements method.
        // Failing this check would imply something went wrong with that method
        if (newIdToObjMap.size !== 4) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`map size check failed. Expected a size of 4, but got ` +
                `${newIdToObjMap.size} instead.`);
        }
        // Test double children. If added corrctly, both children will be on the map
        // Add entry -> 'cloud, water, rain, storm'
        comboTxtArr.push('cloud, water, rain, storm');
        // Add nameToId entries rain and storm
        debugNameToIdMap.set('rain', 5);
        debugNameToIdMap.set('storm', 6);
        newIdToObjMap = _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createIdToObjMap(comboTxtArr, debugNameToIdMap);
        if (newIdToObjMap.size !== 6) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Double child check failed. Expected a size of 6, but ` +
                `got ${newIdToObjMap.size} instead.`);
        }
        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_createIdToObjMap passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError) {
            console.log('test_createIdToObjMap test failed due to a bad output.');
            console.log(e.message);
        }
        else {
            console.log('test_createIdToObjMap test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
            console.log(e.stack);
        }
    } //catch
} //test_createIdToObjMap
/**
 * This function is to lazily write out a hash map for unit testing
 *
 * @param value any
 * @param key any
 * @param map Map<any, any>
 */
function printTestMap(value, key, map) {
    console.log(`key: ${key}\nvalue: ${value}`);
} //print test map
/**
 * Test questions:
 *  - Is the bad input error thrown correctly?
 *  - Do the expected number of rows exist?
 *  - Are ids actually being assigned to rows? (check if empty)
 *  - Are ids being assigned correctly?
 *  - Are there the correct number of ids? (accounting duplicates)
 */
function test_createRowToIdsMap() {
    // const comboTxtArr: string[] = [
    //     'fire, water, steam', 
    //     'water, earth, mud'
    // ]
    /**
     * Expected ids to rows:
     *
     *  0 | 1 (fire), 2 (water), 4 (earth)
     *  1 | 3 (steam), 5 (mud)
     */
    // Test if the method throws a BadOutputError for passing in an empty map
    const emptyIdToObjMap = new Map();
    try {
        // This should throw a BadInputError. 
        _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createRowToIdsMap(emptyIdToObjMap);
        // An error wasn't thrown from the method, but it should have.
        // Throw a bad output error because this test has failed.
        throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Empty map error check failed. A BadInputError was ' +
            'expected, but never thrown.');
        // Catch the expected error. If it's a BadInputError as expectd, nothing happens
        // and the test moves on. But if a different error is thrown, that will fail the test. 
    }
    catch (emptyTestError) {
        // Throw the unexpected error as is.
        if ((emptyTestError instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadInputError) === false) {
            throw emptyTestError;
        }
    }
    // Create a debug idToObj map
    const debugIdToObjMap = new Map();
    debugIdToObjMap.set(1, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(1, 'fire', null, 0));
    debugIdToObjMap.set(2, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(2, 'water', null, 0));
    debugIdToObjMap.set(3, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(3, 'steam', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(1, 2), 1));
    debugIdToObjMap.set(4, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(4, 'earth', null, 0));
    debugIdToObjMap.set(5, new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ComboElement(5, 'mud', new _src_base_files_combo_element__WEBPACK_IMPORTED_MODULE_0__.ParentPair(2, 4), 1));
    // This is a toggle for printing the map if needed
    let printMap = false;
    // Create the actual test map
    const rowToIdsMap = _src_generate_combo_map_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_1__.TextToHashMaps.createRowToIdsMap(debugIdToObjMap);
    try {
        if (rowToIdsMap.size == null || rowToIdsMap.size === 0) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Empty map check failed.');
        }
        if (rowToIdsMap.size !== 2) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Size check failed. The size of the map (number of ` +
                ` rows) was expected to be 2, but is this instead: ${rowToIdsMap.size}`);
        }
        if (rowToIdsMap.get(0) == null || rowToIdsMap.get(0).length == 0) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError('Id array check failed. The id array at row 0 is empty');
        }
        // Print the map if future tests fail
        printMap = true;
        if (rowToIdsMap.get(0)[2] !== 4) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Id array check failed. The id 4 (earth) at row 0, ` +
                `index 2 was expected, but got id ${rowToIdsMap.get(0)[2]} instead`);
        }
        if (rowToIdsMap.get(0).length !== 3 || rowToIdsMap.get(1).length !== 2) {
            throw new _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError(`Id array check failed. The size of rows 0 and 1 ` +
                `were expected to be 3 and 2 respectively, but are ` +
                `${rowToIdsMap.get(0).length} and ${rowToIdsMap.get(1).length} instead.`);
        }
        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_createRowToIdsMap passed! :)');
    }
    catch (e) {
        if (e instanceof _src_other_custom_errors__WEBPACK_IMPORTED_MODULE_2__.BadOutputError) {
            console.log('test_createRowToIdsMap test failed due to a bad output.');
            console.log(e.message);
            if (printMap === true) {
                rowToIdsMap.forEach(printTestMap);
            }
        }
        else {
            console.log('test_createRowToIdsMap test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
        }
    } // catch
} //test_createNameToIdMap


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
/*!*********************************!*\
  !*** ./unit_tests/test_main.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test_base_files_test_file_data_to_str__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test_base_files/test_file_data_to_str */ "./unit_tests/test_base_files/test_file_data_to_str.ts");
/* harmony import */ var _test_generate_combo_map_generating_combo_map_tests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test_generate_combo_map/generating_combo_map_tests */ "./unit_tests/test_generate_combo_map/generating_combo_map_tests.ts");
/* harmony import */ var _test_generate_combo_map_test_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test_generate_combo_map/test_txt_to_hash_maps */ "./unit_tests/test_generate_combo_map/test_txt_to_hash_maps.ts");
// Run unit test shit here
// WARNING: DO NOT RUN WITH NODE! OPEN THE TEST RESULTS IN BROWSER!!!



console.log('Unit testing ready!');
/* --------- Test toggles --------- */
(0,_test_generate_combo_map_test_txt_to_hash_maps__WEBPACK_IMPORTED_MODULE_2__.toggleTxtToHashMapsTests)(true);
(0,_test_generate_combo_map_generating_combo_map_tests__WEBPACK_IMPORTED_MODULE_1__.toggleGeneratingComboMapTests)(true);
// This unit test does not die in a fire, so I can always check it when needed! :)
//printMapMethodTesting();
// This goes last so I can more easily see it
(0,_test_base_files_test_file_data_to_str__WEBPACK_IMPORTED_MODULE_0__.toggleFileDataToStrTest)(false);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGl6ZXIvLi9zcmMvYmFzZV9maWxlcy9jb21ib19lbGVtZW50LnRzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi9zcmMvYmFzZV9maWxlcy9jb21ib19tYXAudHMiLCJ3ZWJwYWNrOi8vbGEyX2NvbWJvdmlzdWFsaXplci8uL3NyYy9nZW5lcmF0ZV9jb21ib19tYXAvZmlsZV90b19kYXRhX3N0ci50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vc3JjL2dlbmVyYXRlX2NvbWJvX21hcC90eHRfdG9faGFzaF9tYXBzLnRzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi9zcmMvb3RoZXIvY3VzdG9tX2Vycm9ycy50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vdW5pdF90ZXN0cy9kZWJ1Z19vYmplY3RzL2RlYnVnX2NvbWJvX21hcC50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyLy4vdW5pdF90ZXN0cy90ZXN0X2Jhc2VfZmlsZXMvdGVzdF9maWxlX2RhdGFfdG9fc3RyLnRzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi91bml0X3Rlc3RzL3Rlc3RfZ2VuZXJhdGVfY29tYm9fbWFwL2dlbmVyYXRpbmdfY29tYm9fbWFwX3Rlc3RzLnRzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvLi91bml0X3Rlc3RzL3Rlc3RfZ2VuZXJhdGVfY29tYm9fbWFwL3Rlc3RfdHh0X3RvX2hhc2hfbWFwcy50cyIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xhMl9jb21ib3Zpc3VhbGl6ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYTJfY29tYm92aXN1YWxpemVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGEyX2NvbWJvdmlzdWFsaXplci8uL3VuaXRfdGVzdHMvdGVzdF9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ09NQk8gRUxFTUVOVCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5pbXBvcnQgeyBCYWRJbnB1dEVycm9yIH0gZnJvbSBcIi4uL290aGVyL2N1c3RvbV9lcnJvcnNcIjtcclxuXHJcbi8qKlxyXG4gKiBOZWVkIHRvIG1ha2UgYSBkZXNjcmlwdGlvbiBoZXJlLCB0b28gbGF6eSByblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbWJvRWxlbWVudCB7XHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRklFTERTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWlubHkgdXNlZCB0byBnZW5lcmF0ZSBpZHMgZm9yIGFsbCBvZiB0aGUgZWxlbWVudHMsIGJ1dFxyXG4gICAgICogdXNlZnVsIGtub3dsZWRnZSBub25ldGhlbGVzcyFcclxuICAgICAqL1xyXG4gICAgc3RhdGljICNudW1PZkVsZW1lbnRzID0gMDtcclxuXHJcbiAgICByZWFkb25seSAjaWQ6IG51bWJlcjtcclxuICAgIHJlYWRvbmx5ICNuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcm93IG51bWJlci4gVGhlIGJhc2UgZWxlbWVudHMgZmlyZSwgd2F0ZXIsIGVhcnRoLCB3aW5kLCBldGMuXHJcbiAgICAgKiBhcmUgYWxsIHJvdyAwLiBBZnRlciB0aGF0LCB0aGUgcm93IG51bWJlciBpcyBkZXRlcm1pbmVkIGJ5IHRoZVxyXG4gICAgICogZmlyc3QgY29tYm8gbGlzdGVkIGluIHRoZSBjb21ib3MgdHh0IGZpbGUtIHRoZSByb3cgbnVtYmVyIGlzICsxXHJcbiAgICAgKiBvZiB0aGUgcGFyZW50J3Mgd2l0aCB0aGUgbGFyZ2VzdCByb3cgbnVtLlxyXG4gICAgICogXHJcbiAgICAgKiBFeGFtcGxlczpcclxuICAgICAqIFxyXG4gICAgICogd2F0ZXIgKyBlYXJ0aCA9IG11ZCB8XHJcbiAgICAgKiB3YXRlciA9IDAsIGVhcnRoID0gMCwgc28gMCArIDEgPSAxLCBtYWtpbmcgbXVkID0gMS5cclxuICAgICAqIFxyXG4gICAgICogd2F0ZXIgKyBsYWtlID0gc2VhIHxcclxuICAgICAqIHdhdGVyID0gMCwgbGV0J3Mgc2F5IGxha2UgPSAzLCBzbyAzICsgMSA9IDQsIG1ha2luZyBzZWEgPSA0LlxyXG4gICAgICovXHJcbiAgICAjcm93TnVtOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIGFuIGFycmF5IG9mIHBhcmVudCBwYWlycyBmb3IgZWFjaCBsaXN0ZWQgY29tYm8uIFRoaXMgY2FuXHJcbiAgICAgKiBiZSBudWxsIGZvciBiYXNlIGVsZW1lbnRzLCBzdWNoIGFzIHdhdGVyIGFuZCBmaXJlLlxyXG4gICAgICovXHJcbiAgICAjcGFyZW50UGFpcnM6IFBhcmVudFBhaXJbXSB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHNldCBpcyBhIGxpc3Qgb2YgcGFyZW50IGlkcyB0aGlzIGVsZW1lbnQgaXMgYSBjaGlsZCBvZi5cclxuICAgICAqIFRoaXMgY2FuIGJlIG51bGwgZm9yIGJhc2UgZWxlbWVudHMsIHN1Y2ggYXMgd2F0ZXIgYW5kIGZpcmUuXHJcbiAgICAgKi9cclxuICAgICNjaGlsZE9mOiBTZXQ8bnVtYmVyPiB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHNldCBpcyBhIGxpc3Qgb2YgY2hpbGQgaWRzIHRoaXMgZWxlbWVudCBpcyBhIHBhcmVudCBvZi5cclxuICAgICAqL1xyXG4gICAgI3BhcmVudE9mOiBTZXQ8bnVtYmVyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNvbWV0aW1lcyBhIHByZXZpb3VzIGVsZW1lbnQgY2FuIGJlIGNyZWF0ZWQgYnkgbGF0ZXIgZWxlbWVudHMuXHJcbiAgICAgKiBGb3IgZXhhbXBsZSwgbGlnaHRlbmluZyArIHdvb2RzID0gZmlyZS4gRmlyZSBpcyBzdGlsbCBhIHJvdyAwXHJcbiAgICAgKiBlbGVtZW50LCBhbmQgdGhlIG1hcCBoYW5kbGVzIGN5Y2xpY2FsIHBhcmVudHMgZGlmZmVyZW50bHlcclxuICAgICAqL1xyXG4gICAgI2N5Y2xpY2FsUGFyZW50UGFpcnM6IFBhcmVudFBhaXJbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgc2V0IGlzIGEgbGlzdCBvZiBjeWNsaWNhbCBwYXJlbnQgaWRzIHRoaXMgZWxlbWVudCBpcyBhXHJcbiAgICAgKiBjeWNsaWNhbCBjaGlsZCBvZi5cclxuICAgICAqL1xyXG4gICAgI2N5Y2xpY2FsQ2hpbGRPZjogU2V0PG51bWJlcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHNldCBpcyBhIGxpc3Qgb2YgY3ljbGljYWwgY2hpbGQgaWRzIHRoaXMgZWxlbWVudCBpcyBhXHJcbiAgICAgKiBjeWNsaWNhbCBwYXJlbnQgb2YuXHJcbiAgICAgKi9cclxuICAgICNjeWNsaWNhbFBhcmVudE9mOiBTZXQ8bnVtYmVyPjtcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ09OU1RSVUNUT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbmFtZTogc3RyaW5nLCBwYXJlbnRQYWlyOiBQYXJlbnRQYWlyIHwgbnVsbCxcclxuICAgICAgICByb3dOdW06IG51bWJlcil7XHJcblxyXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGFuZCBzZXQgdGhlIHBhcmVudCBwYWlyIGFyciwgb3IgZG9uJ3QgaWYgaXQncyBhIGJhc2VcclxuICAgICAgICAvLyBlbGVtZW50LiBCeSBtYWtpbmcgdGhlIHdob2xlIHRoaW5nIG51bGwsIHRoaXMgc2hvdWxkIHByZXZlbnQgdGhlIFxyXG4gICAgICAgIC8vIGlzc3VlIG9mIGFkZGluZyBwYXJlbnQgcGFpcnMgdGhhdCBzaG91bGRuJ3QgYmUgdGhlcmUuIFRoZSBzYW1lXHJcbiAgICAgICAgLy8gdGhpbmcgYXBwbGllcyB0byB0aGUgY2hpbGRPZiBzZXRcclxuICAgICAgICBpZiAocGFyZW50UGFpciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLiNwYXJlbnRQYWlycyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuI2NoaWxkT2YgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuI3BhcmVudFBhaXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuI3BhcmVudFBhaXJzLnB1c2gocGFyZW50UGFpcik7XHJcbiAgICAgICAgICAgIHRoaXMuI2NoaWxkT2YgPSBuZXcgU2V0PG51bWJlcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGFycmF5c1xyXG4gICAgICAgIHRoaXMuI3BhcmVudE9mID0gbmV3IFNldDxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIHRoaXMuI2N5Y2xpY2FsUGFyZW50UGFpcnMgPSBuZXcgQXJyYXk8UGFyZW50UGFpcj4oKTtcclxuICAgICAgICB0aGlzLiNjeWNsaWNhbENoaWxkT2YgPSBuZXcgU2V0PG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLiNjeWNsaWNhbFBhcmVudE9mID0gbmV3IFNldDxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy4jaWQgPSBpZDtcclxuICAgICAgICB0aGlzLiNuYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLiNyb3dOdW0gPSByb3dOdW07XHJcblxyXG4gICAgfS8vY29uc3RydWN0b3JcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSBHRVRURVJTIEFORCBTRVRURVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgc3RhdGljIGdldCBudW1PZkVsZW1lbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNudW1PZkVsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXRpYyAjbmV4dElkKCkge1xyXG4gICAgLy8gICAgIHRoaXMuI251bU9mRWxlbWVudHMrKztcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy4jbnVtT2ZFbGVtZW50cztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBCYXNlIHBhcmFtZXRlcnNcclxuXHJcbiAgICBnZXQgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByb3dOdW1iZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3Jvd051bTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcm93TnVtYmVyKHJvd051bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy4jcm93TnVtID0gcm93TnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBhcmVudCAtIGNoaWxkXHJcblxyXG4gICAgZ2V0IHBhcmVudFBhaXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJlbnRQYWlycztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hpbGRPZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jY2hpbGRPZjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFyZW50T2YoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BhcmVudE9mO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFBhcmVudFBhaXIocFBhaXI/OiBQYXJlbnRQYWlyLCBwYWlyQXJyPzogbnVtYmVyW10sIHAxPzogbnVtYmVyLCBwMj86IG51bWJlcikge1xyXG5cclxuICAgICAgICAvLyBVc2VmdWwgZm9yIHBvc3QgZ2VuZXJhdGlvbiBzZWN1cml0eSBsYXRlclxyXG4gICAgICAgIGlmICh0aGlzLiNwYXJlbnRQYWlycyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcihgWW91IGNhbm5vdCBhZGQgYSBwYXJlbnQgcGFpciB0byBhIGJhc2UgZWxlbWVudC5gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocFBhaXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4jcGFyZW50UGFpcnMucHVzaChwUGFpcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFpckFyciAhPSBudWxsICYmIHBhaXJBcnIubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJQUGFpcjogUGFyZW50UGFpciA9IG5ldyBQYXJlbnRQYWlyKHBhaXJBcnJbMF0sIHBhaXJBcnJbMV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4jcGFyZW50UGFpcnMucHVzaChhcnJQUGFpcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocDEgIT0gbnVsbCAmJiBwMiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBudW1QUGFpcjogUGFyZW50UGFpciA9IG5ldyBQYXJlbnRQYWlyKHAxLCBwMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiNwYXJlbnRQYWlycy5wdXNoKG51bVBQYWlyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdJbnZhbGlkIGlucHV0LiBQbGVhc2UgYWRkIG9uZSBQYXJlbnQgUGFpciwgYSBudW1iZXIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FycmF5IG9mIGxlbmd0aCAyLCBvciB0d28gbnVtYmVycy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGlsZE9mKHBhcmVudElkOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVXNlZnVsIGZvciBwb3N0IGdlbmVyYXRpb24gc2VjdXJpdHkgbGF0ZXJcclxuICAgICAgICBpZiAodGhpcy4jY2hpbGRPZiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcihgWW91IGNhbm5vdCBhZGQgYSBjaGlsZE9mIGlkIHRvIGEgYmFzZSBlbGVtZW50LmApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuI2NoaWxkT2YuYWRkKHBhcmVudElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGFyZW50T2YoY2hpbGRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy4jcGFyZW50T2YuYWRkKGNoaWxkSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGN5Y2xpY2FsIHBhcmVudCAtIGNoaWxkXHJcblxyXG4gICAgZ2V0IGN5Y2xpY2FsUGFyZW50UGFpcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2N5Y2xpY2FsUGFyZW50UGFpcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN5Y2xpY2FsQ2hpbGRPZigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjeWNsaWNhbENoaWxkT2Y7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN5Y2xpY2FsUGFyZW50T2YoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2N5Y2xpY2FsUGFyZW50T2Y7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ3ljbGljYWxQYXJlbnRQYWlyKHBQYWlyPzogUGFyZW50UGFpciwgcGFpckFycj86IG51bWJlcltdLCBwMT86IG51bWJlciwgcDI/OiBudW1iZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocFBhaXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzLnB1c2gocFBhaXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFpckFyciAhPSBudWxsICYmIHBhaXJBcnIubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyclBQYWlyOiBQYXJlbnRQYWlyID0gbmV3IFBhcmVudFBhaXIocGFpckFyclswXSwgcGFpckFyclsxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuI2N5Y2xpY2FsUGFyZW50UGFpcnMucHVzaChhcnJQUGFpcik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwMSAhPSBudWxsICYmIHAyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgbnVtUFBhaXI6IFBhcmVudFBhaXIgPSBuZXcgUGFyZW50UGFpcihwMSwgcDIpO1xyXG4gICAgICAgICAgICB0aGlzLiNjeWNsaWNhbFBhcmVudFBhaXJzLnB1c2gobnVtUFBhaXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdJbnZhbGlkIGlucHV0LiBQbGVhc2UgYWRkIG9uZSBQYXJlbnQgUGFpciwgYSBudW1iZXIgJyArXHJcbiAgICAgICAgICAgICAgICAnYXJyYXkgb2YgbGVuZ3RoIDIsIG9yIHR3byBudW1iZXJzLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ3ljbGljYWxDaGlsZE9mKGN5Y2xpY2FsUGFyZW50SWQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy4jY3ljbGljYWxDaGlsZE9mLmFkZChjeWNsaWNhbFBhcmVudElkKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDeWNsaWNhbFBhcmVudE9mKGN5Y2xpY2FsQ2hpbGRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy4jY3ljbGljYWxQYXJlbnRPZi5hZGQoY3ljbGljYWxDaGlsZElkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHZlcnkgc2ltcGxlIG1ldGhvZCB0aGF0IEkgZGlkbid0IGZlZWwgbGlrZSB3cml0aW5nIHR3aWNlXHJcbiAgICAgKiBJdCByZXR1cm5zIHRoZSBsYXJnZXN0IG51bWJlciArIDFcclxuICAgICAqIEV4LiAoMSwzKSAtPiByZXR1cm4gNCwgKDUsMikgLT4gcmV0dXJuIDZcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHIxIHBhcmVudCAxJ3Mgcm93IG51bWJlclxyXG4gICAgICogQHBhcmFtIHIyIHBhcmVudCAyJ3Mgcm93IG51bWJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbGN1bGF0ZVJvd051bShyMTogbnVtYmVyLCByMjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHIxID49IHIyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByMSArIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHIyICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIGEgc2VjdXJpdHkgbWV0aG9kIHRvIHByb3RlY3QgYW4gZWxlbWVudCB3aGVuIGFkZGluZ1xyXG4gICAgICogbmV3IHBhcmVudCBwYWlycyBvbiBhIHBvc3QtZ2VuZXJhdGVkIGNvbWJvIG1hcC4gV2hlbiBnZW5lcmF0aW5nXHJcbiAgICAgKiB0aGUgY29tYm9zLCB0aGUgYWRkZWQgY29tYm9zIHNob3VsZCBhbHJlYWR5IGJlIHVuaXF1ZS5cclxuICAgICAqIFxyXG4gICAgICogVEhJUyBJUyBBIFNUVUJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBhaXIgXHJcbiAgICAgKi9cclxuICAgIGNoZWNrSWZQYXJlbnRQYWlySXNVbmlxdWUocGFpcjogUGFyZW50UGFpcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgZm9yIGJvdGggbm9ybWFsIGFuZCBjeWNsaWNhbCBwYXJlbnQgcGFpcnNcclxuICAgICAqIE91dHB1dDogeyBbaWQxLCBpZDJdLCBbaWQxLCBpZDJdLCAuLi4gZXRjLiB9XHJcbiAgICAgKi9cclxuICAgIGdldFBhcmVudFBhaXJzQXNTdHIoaXNDeWNsaWNhbDogYm9vbGVhbikge1xyXG5cclxuICAgICAgICBsZXQgYXJyVG9JdGVyYXRlOiBQYXJlbnRQYWlyW10gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGlzQ3ljbGljYWwgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGFyclRvSXRlcmF0ZSA9IHRoaXMuI3BhcmVudFBhaXJzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFyclRvSXRlcmF0ZSA9IHRoaXMuI2N5Y2xpY2FsUGFyZW50UGFpcnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXR1cm4gJ251bGwnIGlmIGl0J3MgbnVsbC4gVGhpcyBoYXBwZW5zIHdpdGggYmFzZSBlbGVtZW50c1xyXG4gICAgICAgIGlmIChhcnJUb0l0ZXJhdGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdudWxsJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHVybiB7fSBpZiBlbXB0eVxyXG4gICAgICAgIGlmIChhcnJUb0l0ZXJhdGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAne30nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJldHVyblN0cjogc3RyaW5nID0gYHsgYDtcclxuXHJcbiAgICAgICAgLy8gQWRkcyAnW2lkMSwgaWQyXSwgJyB0byB0aGUgcmV0dXJuU3RyXHJcbiAgICAgICAgZm9yIChjb25zdCBwUGFpciBvZiBhcnJUb0l0ZXJhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgcFBhaXIucHJpbnRQYWlyQXNTdHIoKSArIGAsIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDdXQgb2ZmIHRoZSBsYXN0ICcsICcgYW5kIGFkZCBhICcgfScgaW5zdGVhZFxyXG4gICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ci5zdWJzdHJpbmcoMCwgcmV0dXJuU3RyLmxlbmd0aCAtIDIpO1xyXG4gICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ciArIGAgfWA7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5TdHI7XHJcblxyXG4gICAgfS8vIGdldFBhcmVudFBhaXJzQXNTdHJcclxuXHJcblxyXG4gICAgLy8gVE9ETzogRmluaXNoIHVwZGF0aW5nIHRoaXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgLyoqXHJcbiAgICAgKiBPdXRwdXQ6IFwiPCBuYW1lOiAnbmFtZScsIGlkOiAnaWQnLCBwUGFpcnM6IHsuLi59LCByb3dOdW1iZXI6ICdyb3dOdW0nID5cIlxyXG4gICAgICovXHJcbiAgICBnZXRDb21ib0VsZW1lbnRBc1N0cihkb0Z1bGxTdHJpbmc6IGJvb2xlYW4pe1xyXG5cclxuICAgICAgICAvLyBJIGNhbiBkbyBmdWxsIGFuZCBzaG9ydC4gRnVsbCBpbmNsdWRlcyB0aGUgY2hpbGRPZi9ldGMuIHNldHNcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblN0ciA9IGA8IG5hbWU6ICR7dGhpcy4jbmFtZX0sIGlkOiAke3RoaXMuI2lkfSwgcGFyZW50UGFpcnM6IGAgK1xyXG4gICAgICAgIGAke3RoaXMuZ2V0UGFyZW50UGFpcnNBc1N0cihmYWxzZSl9LCBjeWNsaWNhbFBhcmVudFBhaXJzOiBgICtcclxuICAgICAgICBgJHt0aGlzLmdldFBhcmVudFBhaXJzQXNTdHIodHJ1ZSl9LCByb3dOdW1iZXI6ICR7dGhpcy4jcm93TnVtfSA+YDtcclxuXHJcbiAgICAgICAgaWYgKGRvRnVsbFN0cmluZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIuc3Vic3RyaW5nKDAsIHJldHVyblN0ci5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYCwgY2hpbGRPZjogJHt0aGlzLnNldFRvU3RyaW5nKHRoaXMuI2NoaWxkT2YpfSwgYCArXHJcbiAgICAgICAgICAgIGBwYXJlbnRPZjogJHt0aGlzLnNldFRvU3RyaW5nKHRoaXMuI3BhcmVudE9mKX0sIGAgK1xyXG4gICAgICAgICAgICBgY3ljbGljYWxDaGlsZE9mOiAke3RoaXMuc2V0VG9TdHJpbmcodGhpcy4jY3ljbGljYWxDaGlsZE9mKX0sIGAgK1xyXG4gICAgICAgICAgICBgY3ljbGljYWxQYXJlbnRPZjogJHt0aGlzLnNldFRvU3RyaW5nKHRoaXMuI2N5Y2xpY2FsUGFyZW50T2YpfSA+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5TdHI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvU3RyaW5nKHM6IFNldDxudW1iZXI+KSB7XHJcblxyXG4gICAgICAgIGlmIChzID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdudWxsJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgaXRlcmF0b3IgYW5kIHRoZSBmaXJzdCB2YWx1ZSBpbiBpdFxyXG4gICAgICAgIGNvbnN0IGl0ZXJhdG9yOiBTZXRJdGVyYXRvcjxudW1iZXI+ID0gcy52YWx1ZXMoKTtcclxuICAgICAgICBsZXQgbmV4dFZhbDogbnVtYmVyIHwgbnVsbCA9IGl0ZXJhdG9yLm5leHQoKS52YWx1ZTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblN0cjogc3RyaW5nID0gYHtgO1xyXG5cclxuICAgICAgICB3aGlsZShuZXh0VmFsICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVyblN0ciA9IHJldHVyblN0ciArIGAke25leHRWYWx9LCBgO1xyXG5cclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0aGUgaXRlcmF0b3JcclxuICAgICAgICAgICAgbmV4dFZhbCA9IGl0ZXJhdG9yLm5leHQoKS52YWx1ZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbGVhbiB1cCBhbmQgcHJlcGFyZSB0aGUgc3RyaW5nXHJcbiAgICAgICAgaWYocmV0dXJuU3RyLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIuc3Vic3RyaW5nKDAsIChyZXR1cm5TdHIubGVuZ3RoIC0gMikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgfWA7XHJcblxyXG4gICAgICAgIHJldHVybiByZXR1cm5TdHI7XHJcblxyXG4gICAgfVxyXG5cclxufS8vIGNsYXNzIENvbWJvIEVsZW1lbnQgXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQQUlSIENMQVNTRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNsYXNzIHRvIGhlbHAgcHJlc2VydmUgY29tYm8gaW5mb3JtYXRpb24uIEl0IG9ubHlcclxuICogaG9sZHMgdHdvIGlkcy4gVGhpcyBjbGFzcyBwcmV2ZW50cyBwcm9ibGVtcyB3aXRoIG51bWJlcltdW11cclxuICogZHViaW91cyB0eXBpbmcgYW5kIGNvbmZ1c2lvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhcmVudFBhaXIge1xyXG5cclxuICAgICNwYWlyOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHAxSWQ6IG51bWJlciwgcDJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy4jcGFpci5wdXNoKHAxSWQpO1xyXG4gICAgICAgIHRoaXMuI3BhaXIucHVzaChwMklkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFpcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jcGFpcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNwYWlyW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBwcmludFBhaXJBc1N0cigpIHtcclxuICAgICAgICByZXR1cm4gYFske3RoaXMuI3BhaXJbMF19LCAke3RoaXMuI3BhaXJbMV19XWA7XHJcbiAgICB9XHJcblxyXG59Ly9jbGFzcyBQYXJlbnRQYWlyXHJcblxyXG5cclxuLy8gLyoqXHJcbi8vICAqIEFub3RoZXIgaGVscGVyIGNsYXNzIHRvIG1ha2UgbXkgbGlmZSBhIGxpdHRsZSBlYXNpZXJcclxuLy8gICovXHJcbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50UGFpciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaWQgdG8gY29uc3RyYWluIHRvXHJcbiAgICAgKi9cclxuICAgICNjb25zdHJJZDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJpbWUgbW9kIGJhc2UgbGlzdFxyXG4gICAgICovXHJcbiAgICAjbW9kTGlzdDogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWRUb0NvbnN0cmFpblRvOiBudW1iZXIsIHByaW1lTW9kQmFzZUxpc3Q6IG51bWJlcltdKXtcclxuXHJcbiAgICAgICAgdGhpcy4jY29uc3RySWQgPSBpZFRvQ29uc3RyYWluVG87XHJcbiAgICAgICAgdGhpcy4jbW9kTGlzdCA9IHByaW1lTW9kQmFzZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnN0cklkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NvbnN0cklkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2RMaXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNtb2RMaXN0O1xyXG4gICAgfVxyXG4gICAgXHJcbn0vL2NsYXNzIENvbnN0cmFpbnRQYWlyXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbWJvRWxlbWVudCwgUGFyZW50UGFpciwgQ29uc3RyYWludFBhaXIgfSBmcm9tIFwiLi9jb21ib19lbGVtZW50XCI7XHJcbmltcG9ydCB7IFRleHRUb0hhc2hNYXBzIH0gZnJvbSBcIi4uL2dlbmVyYXRlX2NvbWJvX21hcC90eHRfdG9faGFzaF9tYXBzXCI7XHJcbmltcG9ydCB7IEJhZElucHV0RXJyb3IgfSBmcm9tIFwiLi4vb3RoZXIvY3VzdG9tX2Vycm9yc1wiO1xyXG5cclxuLyogTm90ZXM6XHJcbiAqIFxyXG4gKiAtIENyZWF0ZSB0aGUgbWFwIGluIGhlcmVcclxuICogLSBUaGUgZ2VuZXJhdGlvbiBtZXRob2RzIGhhdmUgdGhlaXIgb3duIGRlZGljYXRlZCBmaWxlXHJcbiAqIC0gVGhlIG1hbnVwdWxhdGlvbiBtZXRob2RzIHBvc3QgZ2VuZXJhdGlvbiBtYXkgb3IgbWF5IG5vdFxyXG4gKiBoYXZlIHRoZWlyIG93biBkZWRpY2F0ZWQgZmlsZXMuXHJcbiAqIFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21ib01hcCB7XHJcblxyXG4gICAgLy8gU28gdGhlIGRlYnVnIGNvbWJvIG1hcCBzaG91bGQgY2FsbCB0aGlzIHZhcmlhYmxlIGZyb20gaGVyZS5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgY2FuQ3JlYXRlRGVidWdNYXAgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgdGhlIGFycmF5IG9mIHN0cmluZ3MuIEVhY2ggc3RyaW5nIGlzIHdyaXR0ZW4gYXMgXHJcbiAgICAgKiAnYSwgYiwgYycsIG9yICdhLCBiLCBjLCBkJy5cclxuICAgICAqIFxyXG4gICAgICogY29tYm9zVHh0QXJyID0+XHJcbiAgICAgKlxyXG4gICAgICogWyd3YXRlciwgZmlyZSwgc3RlYW0nLCAnd2F0ZXIsIGVhcnRoLCBtdWQnLCAuLi5ldGNdXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgI2NvbWJvc1R4dEFycjogc3RyaW5nW107IFxyXG5cclxuICAgICNuYW1lVG9JZE1hcDogTWFwPHN0cmluZywgbnVtYmVyPjtcclxuICAgICNpZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+O1xyXG4gICAgI3Jvd1RvSWRzTWFwOiBNYXA8bnVtYmVyLCBudW1iZXJbXT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocmF3Q29tYm9TdHJEYXRhPzogc3RyaW5nKXtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgbWUgdG8gcnVuIHRoZSBDb21ibyBNYXAgaW4gZGVidWcgbW9kZS4gVGhpcyBpcyBvbmx5IHR1cm5lZCBvbiBpblxyXG4gICAgICAgIC8vIHRoZSBEZWJ1Z0NvbWJvTWFwIGNsYXNzLlxyXG4gICAgICAgIGlmIChDb21ib01hcC5jYW5DcmVhdGVEZWJ1Z01hcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8gdGhyb3cgZXJyb3IgaGVyZSBpZiBlbXB0eVxyXG4gICAgICAgICAgICBpZiAocmF3Q29tYm9TdHJEYXRhID09IHVuZGVmaW5lZCB8fCByYXdDb21ib1N0ckRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcignVGhlIHJhd0NvbWJvU3RyRGF0YSBwYXJhbWV0ZXIgaXMgZW1wdHkuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGZpcnN0LCBjb252ZXJ0IHRoZSByYXcgZGF0YSBpbnRvIGEgZmlsdGVyZWQgYXJyYXkgb2YgY29tYmluYXRpb25zXHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb21ibyB0ZXh0IGlzbid0IHZpYWJsZS5cclxuICAgICAgICAgICAgdGhpcy4jY29tYm9zVHh0QXJyID0gVGV4dFRvSGFzaE1hcHMuY29udmVydENvbWJvVGV4dFRvU3RyQXJyKHJhd0NvbWJvU3RyRGF0YSk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgaGFzaCBtYXBzXHJcbiAgICAgICAgICAgIHRoaXMuI2NvbnZlcnRUZXh0U3RyQXJyVG9IYXNoTWFwcyh0aGlzLiNjb21ib3NUeHRBcnIpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVidWdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEhhc2ggbWFwcyBzbyBmYXI6YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0RWxlbWVudE1hcEFzU3RyKHRoaXMuI25hbWVUb0lkTWFwKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0RWxlbWVudE1hcEFzU3RyKHRoaXMuI2lkVG9PYmpNYXApKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRFbGVtZW50TWFwQXNTdHIodGhpcy4jcm93VG9JZHNNYXApKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2hpbGRPZi9wYXJlbnRPZi9jeWNDaGlsZE9mL2N5Y1BhcmVudE9mIHNldHMgb2YgZWFjaCBlbGVtZW50XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tYm9FbGVtZW50UmVsYXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSBjb25zdHJhaW50c1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAvLyBEcmF3IHRoZSBtYXBcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgYmxhaCBibGFoIGJsYWhcclxuXHJcbiAgICAgICAgICAgIC8vZm9yIG5vd1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ly9jb25zdHJ1Y3RvclxyXG4gICAgXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSBHRVRURVJTIEFORCBTRVRURVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgLy8gVGhlc2UgcHJvdGVjdGVkIGdldHRlcnMgYW5kIHNldHRlcnMgYXJlIGZvciB1bml0IHRlc3RpbmcuIFRoZXNlIGFyZVxyXG4gICAgLy8gdXNlZCBieSB0aGUgRGVidWdDb21ib01hcCBjbGFzc1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXROYW1lVG9JZE1hcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jbmFtZVRvSWRNYXA7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0SWRUb09iak1hcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jaWRUb09iak1hcDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRSb3dUb0lkc01hcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jcm93VG9JZHNNYXA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBzZXROYW1lVG9JZE1hcChtYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4pIHtcclxuICAgICAgICB0aGlzLiNuYW1lVG9JZE1hcCA9IG1hcDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRJZFRvT2JqTWFwKG1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50Pikge1xyXG4gICAgICAgIHRoaXMuI2lkVG9PYmpNYXAgPSBtYXA7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Um93VG9JZHNNYXAobWFwOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4pIHtcclxuICAgICAgICB0aGlzLiNyb3dUb0lkc01hcCA9IG1hcDtcclxuICAgIH1cclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIGEgc3VwZXIgbWV0aG9kIHRoYXQgY2FsbHMgb3RoZXIgZ2VuZXJhdGlvbiBtZXRob2RzIGZyb20gdGhlXHJcbiAgICAgKiBjbGFzcyBUZXh0VG9IYXNoTWFwcy4gXHJcbiAgICAgKi9cclxuICAgICNjb252ZXJ0VGV4dFN0ckFyclRvSGFzaE1hcHMoY29tYm9UeHRBcnI6IHN0cmluZ1tdKXtcclxuXHJcbiAgICAgICAgdGhpcy4jbmFtZVRvSWRNYXAgPSBUZXh0VG9IYXNoTWFwcy5jcmVhdGVOYW1lVG9JZE1hcChjb21ib1R4dEFycik7XHJcblxyXG4gICAgICAgIHRoaXMuI2lkVG9PYmpNYXAgPSBUZXh0VG9IYXNoTWFwcy5jcmVhdGVJZFRvT2JqTWFwKGNvbWJvVHh0QXJyLCBcclxuICAgICAgICAgICAgdGhpcy4jbmFtZVRvSWRNYXApO1xyXG5cclxuICAgICAgICB0aGlzLiNyb3dUb0lkc01hcCA9IFRleHRUb0hhc2hNYXBzLmNyZWF0ZVJvd1RvSWRzTWFwKHRoaXMuI2lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICAvLyBkZWJ1Z1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBbGwgbWFwczonKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiNuYW1lVG9JZE1hcCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jaWRUb09iak1hcCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4jcm93VG9JZHNNYXApO1xyXG5cclxuICAgIH0vL2NvbnZlcnRUZXh0U3RyQXJyVG9IYXNoTWFwc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR28gdGhyb3VnaCB0aGUgaWRUb09iaiBtYXAgYW5kIHVwZGF0ZSB0aGUgY2hpbGRPZi9wYXJlbnRPZiBzZXRzIGFuZCB0aGVcclxuICAgICAqIGN5Y2xpY2FsIGNoaWxkT2YvUGFyZW50T2Ygc2V0c1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ29tYm9FbGVtZW50UmVsYXRpb25zKCkge1xyXG5cclxuICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBpZCB0byBvYmogbWFwXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMuI2lkVG9PYmpNYXAuc2l6ZTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy4jaWRUb09iak1hcC5nZXQoaSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBOb3cgb24gZWxlbSBgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJhc2UgZWxlbWVudHMgaGF2ZSB0aGVpciBwYXJlbnRQYWlycyBhcnJheSBzZXQgdG8gbnVsbFxyXG4gICAgICAgICAgICBpZiAoZWxlbS5wYXJlbnRQYWlycyAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2hpbGRPZiBzZXQgb2YgdGhlIGVsZW1lbnQgYW5kIHBhcmVudE9mIHNldHMgb2YgdGhlXHJcbiAgICAgICAgICAgICAgICAvLyBlbGVtZW50J3MgcGFyZW50c1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbGVtLnBhcmVudFBhaXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwUGFpciA9IGVsZW0ucGFyZW50UGFpcnNbal07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHBhcmVudCBwYWlyIGlkcyB0byB0aGUgZWxlbWVudCdzIGNoaWxkT2Ygc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDaGlsZE9mKHBQYWlyLmdldCgwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDaGlsZE9mKHBQYWlyLmdldCgxKSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBGZXRjaCB0aGUgZWxlbWVudCBvZiB0aGUgcGFyZW50IHBhaXIgaWRzIGFuZCBhZGQgdGhlIGNoaWxkJ3NcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZCB0byB0aG9zZSBwYXJlbnQncyBwcmVudE9mIHNldHNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiNpZFRvT2JqTWFwLmdldChwUGFpci5nZXQoMCkpLmFkZFBhcmVudE9mKGVsZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI2lkVG9PYmpNYXAuZ2V0KHBQYWlyLmdldCgxKSkuYWRkUGFyZW50T2YoZWxlbS5pZCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjeWNsaWNhbCBjaGlsZE9mIHNldCBvZiB0aGUgZWxlbWVudCBhbmQgcGFyZW50T2Ygc2V0c1xyXG4gICAgICAgICAgICAvLyBvZiB0aGUgZWxlbWVudCdzIGN5Y2xpY2FsIHBhcmVudHNcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBlbGVtLmN5Y2xpY2FsUGFyZW50UGFpcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcFBhaXIgPSBlbGVtLmN5Y2xpY2FsUGFyZW50UGFpcnNba107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBwYXJlbnQgcGFpciBpZHMgdG8gdGhlIGVsZW1lbnQncyBjaGlsZE9mIHNldFxyXG4gICAgICAgICAgICAgICAgZWxlbS5hZGRDeWNsaWNhbENoaWxkT2YocFBhaXIuZ2V0KDApKTtcclxuICAgICAgICAgICAgICAgIGVsZW0uYWRkQ3ljbGljYWxDaGlsZE9mKHBQYWlyLmdldCgxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIGVsZW1lbnQgb2YgdGhlIHBhcmVudCBwYWlyIGlkcyBhbmQgYWRkIHRoZSBjaGlsZCdzXHJcbiAgICAgICAgICAgICAgICAvLyBpZCB0byB0aG9zZSBwYXJlbnQncyBwcmVudE9mIHNldHNcclxuICAgICAgICAgICAgICAgIHRoaXMuI2lkVG9PYmpNYXAuZ2V0KHBQYWlyLmdldCgwKSkuYWRkQ3ljbGljYWxQYXJlbnRPZihlbGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuI2lkVG9PYmpNYXAuZ2V0KHBQYWlyLmdldCgxKSkuYWRkQ3ljbGljYWxQYXJlbnRPZihlbGVtLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0vL3VwZGF0ZUNvbWJvRWxlbWVudFJlbGF0aW9uc1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBSSU5UIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICBwdWJsaWMgZ2V0RWxlbWVudE1hcEFzU3RyPEssVj4oZWxlbU1hcDogTWFwPEssVj4pe1xyXG5cclxuICAgICAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbWFwIGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKGVsZW1NYXAgPT0gbnVsbCB8fCBlbGVtTWFwLnNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoJ1RoZSBwYXNzZWQgaW4gbWFwIGlzIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBrZXkgYW5kIHZhbHVlXHJcbiAgICAgICAgY29uc3QgaXRlcmF0b3IgPSBlbGVtTWFwLmtleXMoKTtcclxuICAgICAgICBsZXQga2V5OiBLID0gaXRlcmF0b3IubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgIGxldCB2YWx1ZTogViA9IGVsZW1NYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHRyYWNrIG9mIHdoYXQgbWFwIHR5cGUgSSdtIHdvcmtpbmcgd2l0aC5cclxuICAgICAgICAgKiAxID0gbmFtZVRvSWRNYXAsIDIgPSBpZFRvT2JqTWFwLCAzID0gcm93VG9JZHNNYXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdHlwZU9mTWFwTnVtID0gMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhlIHR5cGluZ1xyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKXtcclxuICAgICAgICAgICAgdHlwZU9mTWFwTnVtID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbWJvRWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0eXBlT2ZNYXBOdW0gPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVswXSA9PT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVPZk1hcE51bSA9IDM7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhyb3cgZXJyb3IsIHdyb25nIHR5cGVcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoJ1RoZSBwYXNzZWQgaW4gbWFwIGlzIHRoZSB3cm9uZyB0eXBlLiBQbGVhc2UgJyArXHJcbiAgICAgICAgICAgICAgICAncGFzcyBpbiBtYXBzIG9mIHR5cGUgPHN0cmluZywgbnVtYmVyPiwgPG51bWJlciwgQ29tYm9FbGVtZW50PiwgJyArXHJcbiAgICAgICAgICAgICAgICAnb3IgPG51bWJlciwgbnVtYmVyW10+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmV0dXJuU3RyOiBzdHJpbmcgPSBgYDtcclxuXHJcbiAgICAgICAgd2hpbGUoa2V5ICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFdyaXRlIHRoZSBmaXJzdCBwYXJ0LSBhIGtleVxyXG4gICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgJHtrZXl9XFx0fCBgO1xyXG5cclxuICAgICAgICAgICAgLy8gTm93IHdyaXRlIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodHlwZU9mTWFwTnVtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgJHt2YWx1ZX1cXG5gO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVPZk1hcE51bSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuU3RyID0gcmV0dXJuU3RyICsgYCR7KHZhbHVlIGFzIENvbWJvRWxlbWVudCkuZ2V0Q29tYm9FbGVtZW50QXNTdHIoZmFsc2UpfVxcbmA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIgKyBgJHsodmFsdWUgYXMgQXJyYXk8bnVtYmVyPikudG9TdHJpbmcoKX1cXG5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZHZhbmNlIHRoZSBpdGVyYXRvclxyXG4gICAgICAgICAgICBrZXkgPSBpdGVyYXRvci5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgICAgIHZhbHVlID0gZWxlbU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGx5LCBjbGVhbiB1cCB0aGUgc3RyaW5nIGFuZCByZXR1cm5cclxuICAgICAgICByZXR1cm5TdHIgPSByZXR1cm5TdHIuc3Vic3RyaW5nKDAsIHJldHVyblN0ci5sZW5ndGggLSAxKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59Ly8gY2xhc3MiLCIvKipcclxuICogT25lIG9mIHRob3NlIFwidGhpcyBvbmx5IGV4aXN0cyBiL2MgSSBuZWVkIHRvIHVuaXQgdGVzdCBpdFwiIGZ4bnNcclxuICogTm90ZSB0aGF0IEkgaGF2ZSB0byBwYXNzIGluIFwidGhpc1wiLCB0aGUgZXZlbnQgZnVuY3Rpb24gKD8pLCBmb3JcclxuICogZS4gSSBkb24ndCB1bmRlcnN0YW5kLCB3aHkgaXMgSmF2YVNjcmlwdCBzbyBqYW5rLi4uXHJcbiAqIFxyXG4gKiBBbHNvIG1vdmVkIHRvIGEgc2VwcmF0ZSBmaWxlIGJlY2F1c2UgSSBkb24ndCB3YW50IG15IHVuaXQgdGVzdHNcclxuICogcnVubmluZyBteSBtYWluIHNjcmlwdC5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb252ZXJ0VHh0RmlsZURhdGFUb1N0cihlOiBhbnkpe1xyXG5cclxuICAgIC8vIFNhdmUgdGhlIGZpbGUgYXMgYSB2YXIgZm9yIHJlYWRhYmlsaXR5XHJcbiAgICBjb25zdCBmaWxlTGlzdCA9IGUuZmlsZXM7XHJcbiAgICBjb25zdCBjb21ib0ZpbGU6IEZpbGUgPSBmaWxlTGlzdFswXTtcclxuXHJcbiAgICAvLyBTbyBJIGNhbiByZXR1cm4gdGhlIHN0cmluZyBmb3IgdW5pdCB0ZXN0aW5nXHJcbiAgICBsZXQgcmV0dXJuU3RyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAvKiBPa2F5IHNvIGJlYXIgd2l0aCBtZVxyXG4gICAgKiAudGV4dCgpIHJldHVybnMgdGhlIHRleHQgaWYgaXQgY2FuIGZpbmQgaXQgaW4gdGhlIGZpbGUsXHJcbiAgICAqIEJVVCB0aGVyZSdzIG1vcmUgdG8gaXQuIEluc3RlYWQgb2Ygc2F5aW5nIFwiaGVyZSdzIHlvdXJcclxuICAgICogc3RyaW5nXCIsIGl0IGNyZWF0ZXMgYW4gYXN5bmMgcHJvY2VzcyBjYWxsZWQgYSBwcm9taXNlLlxyXG4gICAgKiBUaGUgcHJvbWlzZSBiYXNpY2FsbHkgYWNoaWV2ZXMsIFwiSSdsbCBnZXQgdGhhdCB0ZXh0XHJcbiAgICAqIGp1c3Qgd2FpdCBmb3IgbWUgcGx6XCIuIEFuZCBmb3IgcmVhc29ucyBJIGRvbid0IGNvbXBsZXRlbHlcclxuICAgICogdW5kZXJzdGFuZCwgLnRoZW4oKSB3aWxsIHJldHVybiB0aGUgcmVzdWx0IGFzIGEgcHJvbWlzZSxcclxuICAgICogc28geW91IG5lZWQgdG8gcGFzcyBpbiBhIGZ1bmN0aW9uIHdoaWNoIHRoZW4gaXMgYSBzdHJpbmdcclxuICAgICogYXBwYXJlbnRseS4uLiBJIGRvbid0IGtub3dcclxuICAgICovXHJcbiAgICBhd2FpdCBjb21ib0ZpbGUudGV4dCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBzdHJpbmcgZm9yIG1vZGlmaWNhaXRvbiBsYXRlclxyXG4gICAgICAgIHJldHVyblN0ciA9IHJlc3VsdDtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG5cclxufS8vY29udmVydFR4dEZpbGVEYXRhVG9TdHIiLCIvLyBibGFoIGJsYWggYWRkIGZ4bnNcclxuaW1wb3J0IHsgQ29tYm9FbGVtZW50LCBQYXJlbnRQYWlyIH0gZnJvbSBcIi4uL2Jhc2VfZmlsZXMvY29tYm9fZWxlbWVudFwiO1xyXG5pbXBvcnQgeyBCYWRJbnB1dEVycm9yIH0gZnJvbSBcIi4uL290aGVyL2N1c3RvbV9lcnJvcnNcIjtcclxuXHJcbi8vIERPIE5PVCBNT0RJRlkgQ09NQk8gTUFQIERJUkVDVExZXHJcbi8vIGlucHV0IC0+IG91dHB1dCBoYXNoIG1hcHNcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0VG9IYXNoTWFwcyB7XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogRmlsdGVycyBhbmQgY29udmVydHMgdGhlIGNvbWJvc1N0ciBmcm9tIHRoZSBjb21ib3MgZmlsZSBpbnRvIGEgc3RyaW5nIFxyXG4gICAgICogYXJyYXkgYW5kIHRoZW4gcmV0dXJucyBpdC4gSXQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29tYm9zU3RyIGlzIFxyXG4gICAgICogaW52YWxpZC5cclxuICAgICAqIFxyXG4gICAgICogTm90ZTogdGhlIHJldHVybiBzdHJpbmcgYXJyIHdpbGwgbG9vayBzb21ldGhpbmcgbGlrZSB0aGlzOlxyXG4gICAgICogXHJcbiAgICAgKiBbICd3YXRlciwgZmlyZSwgc3RlYW0nLCAnZWFydGgsIHdhdGVyLCBtdWQnLCBldGMuXVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYm9zU3RyIHRoZSB0ZXh0IGRhdGEgZnJvbSB0aGUgY29tYm9zIGZpbGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnZlcnRDb21ib1RleHRUb1N0ckFycihjb21ib3NTdHI6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvKiBUaGUgY29tYm9zIHNob3VsZCBsb29rIGxpa2UgdGhlIGZvbGxvd2luZzpcclxuICAgICAgICAgKiBhLCBiLCBjXHJcbiAgICAgICAgICogZCwgZSwgZlxyXG4gICAgICAgICAqIFNvIHRoZSBhcnJheSB3aWxsIGJyZWFrIGRvd24gdGhlIGxpc3QgYnkgY29tbWEgQU5EXHJcbiAgICAgICAgICogYnkgZW50ZXIvcmV0dXJuIGNoYXJhY3RlcnMuIEl0IHdpbGwgdGhyb3cgYW4gZXJyb3JcclxuICAgICAgICAgKiBpZiB0aGlzIGZvcm1hdCBpc24ndCBkb25lIChzbyB5b3UgZG9uJ3QgZ2V0XHJcbiAgICAgICAgICogdW5wcmVkaWN0YWJsZSByZXN1bHRzKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFNpZGUgbm90ZTogSW4gdGhlIGZ1dHVyZSwgbXVsdGlwbGUgcmVzdWx0aW5nXHJcbiAgICAgICAgICogY29tYmluYXRpb25zIGNhbiBiZSB1c2VkIGFuZCBicm9rZW4gZG93biBieSB0aGlzIGNvZGUuXHJcbiAgICAgICAgICogRm9yIGV4YW1wbGU6XHJcbiAgICAgICAgICogYSwgYiwgZSwgZiAoYSArIGIgY29tYmluZSBpbnRvIGUgYW5kIGYpXHJcbiAgICAgICAgICogY2FuIGJlIHJld3JpdHRlbiBhc1xyXG4gICAgICAgICAqIGEsIGIsIGVcclxuICAgICAgICAgKiBhLCBiLCBmXHJcbiAgICAgICAgICogQnV0IGZvciBub3csIHRoaXMgZmVhdHVyZSBpc24ndCBhZGRlZC5cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLyogLS0tLS0gU3RlcCAwOiBQcmVwIHRoZSBzdHJpbmcgYW5kIHR1cm4gaXQgaW50byBhbiBhcnJheSAtLS0tLSAqL1xyXG5cclxuICAgICAgICAvLyBHZXQgcmlkIG9mIGFueSBjYXJyaWFnZSByZXR1cm4gc3BhY2VzIGFuZCByZXBsYWNlIHRoZW0gd2l0aCB0eXBpY2FsXHJcbiAgICAgICAgLy8gZW50ZXIgc3BhY2VzLiBSYWlzZSB5b3VyIGhhbmQgaWYgeW91IHRlbmQgdG8gY2FycmFpZ2UgcmV0dXJuIG1vcmVcclxuICAgICAgICAvLyB0aGFuIHlvdSBzaG91bGRcclxuICAgICAgICAvLyAqSSByYWlzZSBteSBoYW5kKlxyXG4gICAgICAgIGxldCBhbHRlcmVkVGV4dDpzdHJpbmcgID0gY29tYm9zU3RyLnJlcGxhY2VBbGwoJ1xccicsICdcXG4nKTtcclxuXHJcbiAgICAgICAgLy8gU3BsaXQgdGhlIGxpc3QgYnkgZW50ZXIgc3BhY2VzXHJcbiAgICAgICAgLy9sZXQgYWx0ZXJlZFRleHRMaXN0ID0gYWx0ZXJlZFRleHQuc3BsaXQoJ1xcbicpO1xyXG4gICAgICAgIGxldCBhbHRlcmVkVGV4dExpc3Q6IHN0cmluZ1tdID0gYWx0ZXJlZFRleHQuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICAvLyBUaGVyZSBtYXkgYmUgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMsIGJ1dCB0aGlzIGlzIHdoYXQgSSBjYW1lIHVwIHdpdGhcclxuICAgICAgICAvLyBmb3IgZmlsdGVyaW5nIG91dCBkb3VibGUgZW50ZXJzIGFuZCB3aGF0bm90XHJcbiAgICAgICAgbGV0IG5vRG91YmxlRW50ZXJUZXh0TGlzdDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgLyogLS0tLS0gU3RlcCAxOiBjaGVjayBpZiB0aGUgc3RyaW5nIGlzIHZhbGlkIC0tLS0tICovXHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudENvbWJvU3RyIG9mIGFsdGVyZWRUZXh0TGlzdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnRDb21ib1N0ciBpcyBlbXB0eSBkdWUgdG8gc29tZXRoaW5nIGxpa2UgZG91YmxlIGVudGVycywgc2tpcCB0aGF0IFxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudENvbWJvU3RyLmxlbmd0aCA9PT0gMCB8fCBlbGVtZW50Q29tYm9TdHIubGVuZ3RoID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9Eb3VibGVFbnRlclRleHRMaXN0LnB1c2goZWxlbWVudENvbWJvU3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTmV4dCwgY2hlY2sgaWYgZWFjaCBlbGVtZW50IGhhcyAyIGNvbW1hcyBhbmQgMyB3b3Jkc1xyXG4gICAgICAgICAgICBjb25zdCBzcGxpdEVsZW1lbnRMaXN0OiBzdHJpbmdbXSA9IGVsZW1lbnRDb21ib1N0ci5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG1vcmUgb3IgbGVzcyB0aGFuIDMgZWxlbWVudHMgaW4gdGhlIGxpc3QsIHRoZW4gdGhlcmUgaXMgc29tZXRoaW5nIHdyb25nXHJcbiAgICAgICAgICAgIGlmIChzcGxpdEVsZW1lbnRMaXN0Lmxlbmd0aCA8IDMgfHwgc3BsaXRFbGVtZW50TGlzdC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmFkSW5wdXRFcnJvcihgVGhlIGNvbWJpbmF0aW9uIGxpbmUgJyR7c3BsaXRFbGVtZW50TGlzdC50b1N0cmluZygpfScgc2hvdWxkIGhhdmUgYCtcclxuICAgICAgICAgICAgICAgIGAzIG9yIDQgdGVybXMsIGJ1dCBpdCBoYXMgJHtzcGxpdEVsZW1lbnRMaXN0Lmxlbmd0aH0gdGVybXMgaW5zdGVhZC5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTm93IGNoZWNrIGlmIGFueSBvZiB0aGUgZWxlbWVudHMgYXJlIGVtcHR5XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbSBvZiBzcGxpdEVsZW1lbnRMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0udHJpbSgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoYFRoZSBjb21iaW5hdGlvbiBsaW5lICcke3NwbGl0RWxlbWVudExpc3QudG9TdHJpbmcoKX0nIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGBoYXMgYXQgbGVhc3QgMSBlbXB0eSB0ZXJtLmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9Ly9mb3Itb2YgYWx0ZXJlZFRleHRMaXN0XHJcblxyXG4gICAgICAgIC8vIE5vdyBzZXQgYWx0ZXJlZFRleHRMaXN0IHRvIHRoZSBub0RvdWJsZUVudGVyIHN0cmluZyBvbmUuXHJcbiAgICAgICAgYWx0ZXJlZFRleHRMaXN0ID0gbm9Eb3VibGVFbnRlclRleHRMaXN0O1xyXG5cclxuICAgICAgICAvKiAtLS0tLSBTdGVwIDI6IGNsZWFuIHRoZSBhbHRlcmVkVGV4dExpc3QgLS0tLS0gKi9cclxuXHJcbiAgICAgICAgLy8gTm90ZTogdGhpcyBpcyBkb25lIHNlcGFyYXRlbHkgYmVjYXVzZSBpZiB0aGUgY29tYm9zIHN0ciBpcyBpbnZhbGlkLCBJIGRvbid0IFxyXG4gICAgICAgIC8vIHdhbnQgdG8gZG8gdW5uZWNlc3Nhcnkgd29yayBiZWZvcmUgZmluZGluZyB0aGF0IG91dC5cclxuXHJcbiAgICAgICAgLy8gTm93IGNsZWFuIHRoZSBsaXN0XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGFsdGVyZWRUZXh0TGlzdC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gUHJlcGFyZSBmb3IgY2xlYW5pbmdcclxuICAgICAgICAgICAgbGV0IG5ld0VsZW1lbnRDb21ib1N0cjogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvL2RlYnVnXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYGFsdGVyZWRUZXh0TGlzdCwgc3RlcCAyOiAke2FsdGVyZWRUZXh0TGlzdH1gKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcGxpdEVsZW1lbnRMaXN0OiBzdHJpbmdbXSA9IGFsdGVyZWRUZXh0TGlzdFtpXS5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICAgICAgLy9kZWJ1Z1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBzcGxpdEVsZW1lbnRMaXN0LCBzdGVwIDI6ICR7c3BsaXRFbGVtZW50TGlzdH1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFuIGVhY2ggZWxlbWVudCBpbiB0aGUgZWxlbWVudCBjb21ib1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgc3BsaXRFbGVtZW50TGlzdC5sZW5ndGg7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZGVidWdcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYHNwbGl0RWxlbWVudExpc3Rbal06ICR7c3BsaXRFbGVtZW50TGlzdFtqXX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudEVsZW0gPSBzcGxpdEVsZW1lbnRMaXN0W2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCByaWQgb2YgZXh0cmEgd2hpbGUgc3BhY2VcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtID0gY3VycmVudEVsZW0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgc3RyaW5nIHRvIGFsbCBsb3dlcmNhc2UgdG8gcHJldmVudCB1bm5lY2Vzc2FyeSBjYXBpdGFsaXphdGlvbiBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbSA9IGN1cnJlbnRFbGVtLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBjbGVhbmVkIGVsZW1lbnQgdG8gdGhlIG5ldyBlbGVtZW50IGNvbWJvIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudENvbWJvU3RyID0gbmV3RWxlbWVudENvbWJvU3RyICsgY3VycmVudEVsZW0gKyAnLCAnXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfS8vZm9yIGpcclxuXHJcbiAgICAgICAgICAgIC8vZGVidWdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgbmV3RWxlbWVudENvbWJvU3RyIGJlZm9yZSAsIDpcXG4gJHtuZXdFbGVtZW50Q29tYm9TdHJ9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUYWtlIG9mZiB0aGF0IGxhc3QgJywgJ1xyXG4gICAgICAgICAgICBuZXdFbGVtZW50Q29tYm9TdHIgPSBuZXdFbGVtZW50Q29tYm9TdHIuc3Vic3RyaW5nKDAsIG5ld0VsZW1lbnRDb21ib1N0ci5sZW5ndGggLSAyKTtcclxuXHJcbiAgICAgICAgICAgIC8vZGVidWdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgbmV3RWxlbWVudENvbWJvU3RyIGFmdGVyICwgOlxcbiAke25ld0VsZW1lbnRDb21ib1N0cn1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vdyB1cGRhdGUgdGhlIGFsdGVyZWRUZXh0TGlzdFxyXG4gICAgICAgICAgICBhbHRlcmVkVGV4dExpc3RbaV0gPSBuZXdFbGVtZW50Q29tYm9TdHI7XHJcblxyXG4gICAgICAgIH0vL2ZvciBpXHJcblxyXG4gICAgICAgIC8vIE5vdyByZXR1cm4gdGhlIGxpc3QhXHJcbiAgICAgICAgcmV0dXJuIGFsdGVyZWRUZXh0TGlzdDtcclxuXHJcbiAgICB9Ly9jb252ZXJ0Q29tYm9UZXh0VG9TdHJBcnJcclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlTmFtZVRvSWRNYXAoY29tYm9UeHRBcnI6IHN0cmluZ1tdKXtcclxuXHJcbiAgICAgICAgLy8gTWFwXHJcbiAgICAgICAgY29uc3QgbmV3TmFtZVRvSWRNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xyXG5cclxuICAgICAgICAvLyBpZCBnZW5lcmF0aW9uXHJcbiAgICAgICAgbGV0IGlkQ291bnQgPSAxO1xyXG5cclxuICAgICAgICAvLyBTZXQgZm9yIGdlbmVyYXRpbmcgbmFtZXNcclxuICAgICAgICBmb3IgKGNvbnN0IGNvbWJvU3RyIG9mIGNvbWJvVHh0QXJyKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJzdCBicmVhayB1cCBjb21ib1N0clxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50c0luQ29tYm9TdHI6IHN0cmluZ1tdID0gY29tYm9TdHIuc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vdyBnbyB0aHJvdWdoIGVhY2ggZWxlbWVudFxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW0gb2YgZWxlbWVudHNJbkNvbWJvU3RyKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHRyaW0gKHNpbmNlIHRoZSBzcGFjZSBpcyBsZWZ0IHRoZXJlIG9uIHB1cnBvdXNlKVxyXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRlZEVsZW1TdHI6IHN0cmluZyA9IGVsZW0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0J3MgaW4gdGhlIG1hcFxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld05hbWVUb0lkTWFwLmhhcyhlZGl0ZWRFbGVtU3RyKSA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgaXQncyBub3QsIGFkZCBpdCB0byB0aGUgbWFwXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TmFtZVRvSWRNYXAuc2V0KGVkaXRlZEVsZW1TdHIsIGlkQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgaWRDb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIGlkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9Ly8gZm9yIGVsZW0gaW4gY29tYm9TdHJcclxuXHJcbiAgICAgICAgfS8vZm9yIGNvbWJvVHh0QXJyXHJcblxyXG4gICAgICAgIC8vIE1hcCBjb21wbGV0ZSwgcmV0dXJuIGl0IVxyXG4gICAgICAgIHJldHVybiBuZXdOYW1lVG9JZE1hcDtcclxuXHJcbiAgICB9Ly9jcmVhdGVOYW1lVG9JZE1hcFxyXG5cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlSWRUb09iak1hcChjb21ib1R4dEFycjogc3RyaW5nW10sIG5hbWVUb0lkTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+KXtcclxuXHJcbiAgICAgICAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIG5hbWVUb0lkIG1hcCBpcyBlbXB0eVxyXG4gICAgICAgIGlmIChuYW1lVG9JZE1hcCA9PSBudWxsIHx8IG5hbWVUb0lkTWFwLnNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZElucHV0RXJyb3IoJ1RoZSBuYW1lVG9JZE1hcCBwYXJhbWV0ZXIgaXMgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNYXBcclxuICAgICAgICBjb25zdCBuZXdJZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+ID0gbmV3IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4oKTtcclxuXHJcbiAgICAgICAgLy8gR28gdGhyb3VnaCB0aGUgY29tYm9UeHRBcnIgYWdhaW4sIGJ1dCB0aGlzIHRpbWUgSSdtIGNyZWF0aW5nIGVsZW1lbnQgb2JqZWN0cyAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IGNvbWJvU3RyIG9mIGNvbWJvVHh0QXJyKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJzdCBicmVhayB1cCBjb21ib1N0clxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50c0luQ29tYm9TdHI6IHN0cmluZ1tdID0gY29tYm9TdHIuc3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB0d28gcGFyZW50IGlkcyBhbmQgcm93IG51bXMgaW4gdGhpcyBhcnIgZm9yIGVhc2Ugb2YgdXNlXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudElkczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Um93TnVtczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVsZW1lbnRzIDEgYW5kIDIgLT4gZ2V0IHBhcmVudCBpZHMsIGNyZWF0ZSBvYmpzIGZvciBiYXNlIGVsZW1lbnRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGVsZW1lbnQgbmFtZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbU5hbWU6IHN0cmluZyA9IGVsZW1lbnRzSW5Db21ib1N0cltpXS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBwYXJlbnQgaWQgdG8gdGhlIHBhcmVudElkc0FyclxyXG4gICAgICAgICAgICAgICAgcGFyZW50SWRzW2ldID0gbmFtZVRvSWRNYXAuZ2V0KGVsZW1OYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcGFyZW50IGVsZW1lbnQgZG9lc24ndCBleGlzdCwgd2hpY2ggbWVhbnMgaXQncyBhIGJhc2UgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgLy8gKGUuZy4gZmlyZSwgd2F0ZXIsIGVhcnRoLCBhaXIsIGV0Yy4pIGNyZWF0ZSBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0lkVG9PYmpNYXAuaGFzKHBhcmVudElkc1tpXSkgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBiYXNlIGVsZW1lbnQgcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SWRUb09iak1hcC5zZXQocGFyZW50SWRzW2ldLCBuZXcgQ29tYm9FbGVtZW50KHBhcmVudElkc1tpXSwgZWxlbU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9Ly9mb3IgaVxyXG5cclxuICAgICAgICAgICAgLy8gU2luY2UgdGhlIHBhcmVudCBlbGVtZW50cyBleGlzdCwgdXBkYXRlIHRoZSBwYXJlbnRSb3dOdW1zIGFycmF5XHJcbiAgICAgICAgICAgIHBhcmVudFJvd051bXNbMF0gPSBuZXdJZFRvT2JqTWFwLmdldChwYXJlbnRJZHNbMF0pLnJvd051bWJlcjtcclxuICAgICAgICAgICAgcGFyZW50Um93TnVtc1sxXSA9IG5ld0lkVG9PYmpNYXAuZ2V0KHBhcmVudElkc1sxXSkucm93TnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgLy8gRWxlbWVudHMgMyBhbmQgbWF5YmUgNCAtPiBoYW5kbGUgYXMgY2hpbGRyZW4uIEkgdXNlIC5sZW5ndGhcclxuICAgICAgICAgICAgLy8gaW4gY2FzZSB0aGUgNHRoIGVsZW1lbnQgZG9lc24ndCBleGlzdC5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDI7IGogPCBlbGVtZW50c0luQ29tYm9TdHIubGVuZ3RoOyBqKyspe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoaWxkIGVsZW1lbnQgbmFtZSBhbmQgaWRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkTmFtZTogc3RyaW5nID0gZWxlbWVudHNJbkNvbWJvU3RyW2pdLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkSWQ6IG51bWJlciA9IG5hbWVUb0lkTWFwLmdldChjaGlsZE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vdyBoYW5kbGUgdGhlIGNoaWxkIGVsZW1lbnQocylcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hpbGRFbGVtZW50cyhjaGlsZE5hbWUsIGNoaWxkSWQsIHBhcmVudElkcywgcGFyZW50Um93TnVtcywgXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SWRUb09iak1hcCk7XHJcblxyXG4gICAgICAgICAgICB9Ly9mb3IgalxyXG5cclxuICAgICAgICB9Ly9mb3IgY29tYm9UeHRBcnJcclxuXHJcbiAgICAgICAgLy8gTm93IHJldHVybiB0aGUgaWRUb09iak1hcCFcclxuICAgICAgICByZXR1cm4gbmV3SWRUb09iak1hcDtcclxuXHJcbiAgICB9IC8vY3JlYXRlSWRUb09iak1hcFxyXG5cclxuICAgIHN0YXRpYyBoYW5kbGVDaGlsZEVsZW1lbnRzKGNoaWxkTmFtZTogc3RyaW5nLCBjaGlsZElkOiBudW1iZXIsIHBhcmVudElkczogbnVtYmVyW10sXHJcbiAgICAgICAgIHBhcmVudFJvd051bXM6IG51bWJlcltdLCBuZXdJZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+KSB7XHJcblxyXG4gICAgICAgIC8vIFF1IDE6IGRvZXMgdGhlIGNoaWxkIGVsZW1lbnQgZXhpc3RcclxuICAgICAgICBpZiAobmV3SWRUb09iak1hcC5oYXMoY2hpbGRJZCkgPT09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY2hpbGQgcm93IG51bVxyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NoaWxkUm93TnVtOiBudW1iZXIgPSBuZXdJZFRvT2JqTWFwLmdldChjaGlsZElkKS5yb3dOdW1iZXI7XHJcblxyXG4gICAgICAgICAgICAvLyBRdSAyOiBJcyB0aGlzIGEgY3ljbGljYWwgY29tYm8/IChhdCBsZWFzdCBvbmUgb2YgdGhlIHBhcmVudCdzIHJvdyBudW1zXHJcbiAgICAgICAgICAgIC8vIGlzIGVxdWFsIHRvIG9yIGxhcmdlciB0aGFuIHRoZSBwcmUtZXhpc3RpbmcgY2hpbGQgZWxlbWVudCdzIHJvdyBudW0pXHJcbiAgICAgICAgICAgIGlmIChwYXJlbnRSb3dOdW1zWzBdID49IGV4aXN0aW5nQ2hpbGRSb3dOdW0gfHxcclxuICAgICAgICAgICAgICAgIHBhcmVudFJvd051bXNbMV0gPj0gZXhpc3RpbmdDaGlsZFJvd051bSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGFkZGl0aW9uYWwgcGFyZW50IGNvbWJvIHRvIHRoZSBjaGlsZCBlbGVtZW50IG9uIHRoZSBtYXAuIFxyXG4gICAgICAgICAgICAgICAgbmV3SWRUb09iak1hcC5nZXQoY2hpbGRJZCkuYWRkQ3ljbGljYWxQYXJlbnRQYWlyKG51bGwsIHBhcmVudElkcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBOb3QgYSBjeWNsaWNhbCBjb21ib1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgYWRkaXRpb25hbCBwYXJlbnQgY29tYm8gdG8gdGhlIGNoaWxkIGVsZW1lbnQgb24gdGhlIG1hcC4gXHJcbiAgICAgICAgICAgICAgICBuZXdJZFRvT2JqTWFwLmdldChjaGlsZElkKS5hZGRQYXJlbnRQYWlyKG51bGwsIHBhcmVudElkcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUXUgMzogSXMgdGhpcyBhIHNtYWxsZXIgcGFyZW50IGNvbWJvP1xyXG4gICAgICAgICAgICAgICAgLy8gRXguIExldCdzIHNheSBtdWQgPSByYWluIChzYXkgcm93IDUpICsgZGlydCAoc2F5IHJvdyA0KS5cclxuICAgICAgICAgICAgICAgIC8vIEJ1dCBpZiBsYXRlciwgaXQncyBmb3VuZCB3YXRlciArIGVhcnRoID0gbXVkLCB0aGVuIG11ZCBcclxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBpbiByb3cgMSwgbm90IDYuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFJvd051bXNbMF0gPCBleGlzdGluZ0NoaWxkUm93TnVtICYmIFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFJvd051bXNbMV0gPCBleGlzdGluZ0NoaWxkUm93TnVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgY2hpbGQncyBuZXcgcm93IG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Jvd051bSA9IENvbWJvRWxlbWVudC5jYWxjdWxhdGVSb3dOdW0ocGFyZW50Um93TnVtc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Um93TnVtc1sxXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgZWxlbWVudCdzIHJvdyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICBuZXdJZFRvT2JqTWFwLmdldChjaGlsZElkKS5yb3dOdW1iZXIgPSBuZXdSb3dOdW07XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBtYXAgRE9FUyBOT1QgaGF2ZSB0aGUgY29tYm8gZWxlbWVudCBmb3IgdGhpcyBpZCxcclxuICAgICAgICAvLyBzbyBjcmVhdGUgYSBuZXcgY2hpbGQgZWxlbWVudFxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNoaWxkJ3Mgcm93IG51bVxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZFJvd051bSA9IENvbWJvRWxlbWVudC5jYWxjdWxhdGVSb3dOdW0ocGFyZW50Um93TnVtc1swXSwgcGFyZW50Um93TnVtc1sxXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFyZW50IHBhaXJcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50UGFpcjogUGFyZW50UGFpciA9IG5ldyBQYXJlbnRQYWlyKHBhcmVudElkc1swXSwgcGFyZW50SWRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgIG5ld0lkVG9PYmpNYXAuc2V0KGNoaWxkSWQsXHJcbiAgICAgICAgICAgICAgICBuZXcgQ29tYm9FbGVtZW50KGNoaWxkSWQsIGNoaWxkTmFtZSwgcGFyZW50UGFpciwgY2hpbGRSb3dOdW0pKTtcclxuXHJcbiAgICAgICAgfSAvLyBpZiBjaGlsZCBlbGVtZW50IGV4aXN0cyBvciBub3RcclxuXHJcbiAgICB9Ly9oYW5kbGVDaGlsZEVsZW1lbnRzXHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZVJvd1RvSWRzTWFwKGlkVG9PYmpNYXA6IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4pe1xyXG5cclxuICAgICAgICBjb25zdCBuZXdSb3dUb0lkc01hcDogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcltdPigpO1xyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgaWRUb09iak1hcCBpcyBlbXB0eVxyXG4gICAgICAgIGlmIChpZFRvT2JqTWFwID09IG51bGwgfHwgaWRUb09iak1hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRJbnB1dEVycm9yKCdUaGUgaWRUb09iak1hcCBwYXJhbWV0ZXIgaXMgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWRDb3VudDogbnVtYmVyID0gMTtcclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSAoaWRDb3VudCA8PSBpZFRvT2JqTWFwLnNpemUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgcm93TnVtIG9mIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1Sb3dOdW0gPSBpZFRvT2JqTWFwLmdldChpZENvdW50KS5yb3dOdW1iZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3Um93VG9JZHNNYXAuaGFzKGVsZW1Sb3dOdW0pID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyByb3dJZEFyciBhbmQgYWRkIHRoZSByb3dOdW0gdG8gaXRcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Jvd0FycjogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIG5ld1Jvd0Fyci5wdXNoKGlkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgbmV3Um93VG9JZHNNYXAuc2V0KGVsZW1Sb3dOdW0sIG5ld1Jvd0Fycik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGUga2V5IGFscmVhZHkgZXhpc3RzLCBhZGQgaXQgdG8gdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICBuZXdSb3dUb0lkc01hcC5nZXQoZWxlbVJvd051bSkucHVzaChpZENvdW50KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudCB0aGUgaWQgY291bnRcclxuICAgICAgICAgICAgaWRDb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBuZXcgbWFwXHJcbiAgICAgICAgcmV0dXJuIG5ld1Jvd1RvSWRzTWFwO1xyXG4gICAgfVxyXG5cclxuXHJcbn0vL2NsYXNzIFRleHRUb0hhc2hNYXBzIiwiLyotLS0tLS0tLS0tLSBDVVNUT00gRVJST1JTIC0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGN1c3RvbSBlcnJvciB0aHJvd24gd2hlbmV2ZXIgdGhlcmUncyBhIHByb2JsZW0gd2l0aFxyXG4gKiBhIHByb3ZpZGVkIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFkSW5wdXRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiQmFkSW5wdXRFcnJvclwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGN1c3RvbSBlcnJvciB0aHJvd24gd2hlbmV2ZXIgdGhlcmUncyBhIHByb2JsZW0gd2l0aFxyXG4gKiBhbiBleHBlY3RlZCBvdXRwdXRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYWRPdXRwdXRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiQmFkSW5wdXRFcnJvclwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29tYm9FbGVtZW50IH0gZnJvbSBcIi4uLy4uL3NyYy9iYXNlX2ZpbGVzL2NvbWJvX2VsZW1lbnRcIjtcclxuaW1wb3J0IHsgQ29tYm9NYXAgfSBmcm9tIFwiLi4vLi4vc3JjL2Jhc2VfZmlsZXMvY29tYm9fbWFwXCJcclxuaW1wb3J0IHsgQmFkSW5wdXRFcnJvciB9IGZyb20gXCIuLi8uLi9zcmMvb3RoZXIvY3VzdG9tX2Vycm9yc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgYWxsb3dzIG1lIHRvIGRlYnVnIENvbWJvTWFwJ3MgcHJvdGVjdGVkIG1ldGhvZHNcclxuICogd2l0aG91dCB3b3JyeWluZyBhYm91dCBzb21lb25lIGFjY2lkZW50YWxseSBjYWxsaW5nIGEgXHJcbiAqIENvbWJvIE1hcCdzIHByb3RlY3RlZCBtZXRob2RzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGVidWdDb21ib01hcCBleHRlbmRzIENvbWJvTWFwIHtcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ09OU1RSVUNUT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBiYXNpY2FsbHkgYnlwYXNzZXMgdGhlIENvbWJvTWFwIGNvbnN0cnVjdG9yIVxyXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIEkgd2FudCB0byBwdXQgYW55IG1hcCBvciBkYXRhIGludG8gdGhlIGRlYnVnIG1hcFxyXG4gICAgLy8gd2hpbGUgcHJlc2VydmluaWcgaXRzIG1ldGhvZHMhXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICBDb21ib01hcC5jYW5DcmVhdGVEZWJ1Z01hcCA9IHRydWU7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBDb21ib01hcC5jYW5DcmVhdGVEZWJ1Z01hcCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSBHRVRURVJTIEFORCBTRVRURVJTIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldE5hbWVUb0lkTWFwKCk6IE1hcDxzdHJpbmcsIG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXROYW1lVG9JZE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBnZXRJZFRvT2JqTWFwKCk6IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4ge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRJZFRvT2JqTWFwKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZ2V0Um93VG9JZHNNYXAoKTogTWFwPG51bWJlciwgbnVtYmVyW10+IHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0Um93VG9JZHNNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2V0TmFtZVRvSWRNYXAobWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+KXtcclxuICAgICAgICBzdXBlci5zZXROYW1lVG9JZE1hcChtYXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXRJZFRvT2JqTWFwKG1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50Pil7XHJcbiAgICAgICAgc3VwZXIuc2V0SWRUb09iak1hcChtYXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXRSb3dUb0lkc01hcChtYXA6IE1hcDxudW1iZXIsIG51bWJlcltdPil7XHJcbiAgICAgICAgc3VwZXIuc2V0Um93VG9JZHNNYXAobWFwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVDb21ib0VsZW1lbnRSZWxhdGlvbnMoKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlQ29tYm9FbGVtZW50UmVsYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG59Ly9EZWJ1Z0NvbWJvTWFwXHJcblxyXG4iLCIvL3lhZGEgeWFkYVxyXG5cclxuaW1wb3J0IHsgY29udmVydFR4dEZpbGVEYXRhVG9TdHIgfSBmcm9tIFwiLi4vLi4vc3JjL2dlbmVyYXRlX2NvbWJvX21hcC9maWxlX3RvX2RhdGFfc3RyXCI7XHJcbmltcG9ydCB7IEJhZE91dHB1dEVycm9yIH0gZnJvbSBcIi4uLy4uL3NyYy9vdGhlci9jdXN0b21fZXJyb3JzXCI7XHJcblxyXG4vLyBUb2dnbGUgZnhuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVGaWxlRGF0YVRvU3RyVGVzdChkb1Rlc3Q6IGJvb2xlYW4pe1xyXG5cclxuICAgIGlmKGRvVGVzdCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1RoZSBmaWxlIGRhdGEgdG8gc3RyaW5nIHRlc3QgaXMgcmVhZHkuXFxuJyArXHJcbiAgICAgICAgICAgICdUbyBydW4gdGhlIHRlc3QsIGlucHV0IFxcJ3Rlc3RfY29tYm9zLnR4dFxcJyAnKTtcclxuICAgICAgICB0ZXN0X2NvbnZlcnRGaWxlVHh0VG9TdHIoKTtcclxuICAgIH1cclxuXHJcbn0vL3RvZ2dsZVRlc3RzXHJcblxyXG4vKipcclxuICogWWVzLiBJIGFtIGluc2FuZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0X2NvbnZlcnRGaWxlVHh0VG9TdHIoKXtcclxuXHJcbiAgICAvLyBOb3RlOiBJIERPIE5PVCB1c2UgdGhlIGZpbGUgc3RyZWFtLiBUdXJucyBvdXQsIGEgYnJvd3NlciB3b24ndCBhbGxvd1xyXG4gICAgLy8geW91IHRvIG1vZGlmeSBmaWxlcyBpbnNpZGUgb2YgaXQtIHdoaWNoLCBpbiByZXRyb3NwZWN0LCBtYWtlcyBzZW5zZVxyXG4gICAgLy8gYmVjYXVzZSBpdCB3b3VsZCBhbGwgYmUgaW4gb25lIGJ1bmRsZS5qcyBmaWxlIGFueXdheS4gU28gdGhlXHJcbiAgICAvLyB0ZXN0X2NvbWJvcy50eHQgZmlsZSBpcyBPTkxZIGZvciB0aGlzIHVuaXQgdGVzdC4gKEFuZCB0aHVzIHRoZXJlIHdpbGxcclxuICAgIC8vIGJlIG5vIGZpbGUgd3JpdGluZyB0byBiZSlcclxuXHJcbiAgICAvLyBHZXQgdGhlIGlucHV0IHRhZ1xyXG4gICAgY29uc3QgY29tYm9zRmlsZUlucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRDb21ib0ZpbGUnKTtcclxuXHJcbiAgICAvLyBFbmFibGUgdGhlIHRhZyB0byBpbmRpY2F0ZSBpdCBpcyBiZWluZyB0ZXN0ZWRcclxuICAgIC8vIEkgbmVlZCB0byBjYXN0IGl0IGZvciBpdCB0byB3b3JrIGJlY2F1c2UgSFRNTCBpcyBhd2Vzb21lXHJcbiAgICAoY29tYm9zRmlsZUlucHV0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGFuIGV2ZW50IGZvciB3aGVuIHNvbWVvbmUgdXBsb2FkcyBhIGZpbGUgdG8gdGhlXHJcbiAgICAvLyBnZXRDb21ib0ZpbGUgaW5wdXQgdGFnXHJcbiAgICBjb21ib3NGaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGVzdF9oZWxwZXJfY2hhbmdlRXZlbnQpO1xyXG5cclxufS8vdGVzdF9jb252ZXJ0RmlsZVR4dFRvU3RyXHJcblxyXG4vKipcclxuICogXHJcbiAqIFRoZSBpbnB1dCBlbGVtZW50IGluIHRoZSB0ZXN0IGh0bWwgZmlsZSBuZWVkcyB0byBiZSBjbGlja2VkIG9uIHRvIHJ1biBcclxuICogdGhlIGFjdHVhbCB0ZXN0LCBoZW5jZSB0aGlzIGZ4bi5cclxuICogXHJcbiAqIEBwYXJhbSBlIFRoZSBjaGFuZ2UgZXZlbnQuIERvbid0IGFzayBtZSB3aGF0IHRoZSB0eXBlIGlzLiBJIHRyaWVkLiBJIGNvdWxkbid0XHJcbiAqIGZpZ3VyZSBpdCBvdXQuIDtfO1xyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRlc3RfaGVscGVyX2NoYW5nZUV2ZW50KCl7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgLy8gcnVuIHRoZSBmaWxlIGhlcmUuLi5cclxuICAgICAgICBjb25zdCBvdXRTdHI6IHN0cmluZyA9IGF3YWl0IGNvbnZlcnRUeHRGaWxlRGF0YVRvU3RyKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBJZiBvdXRTdHIgaXMgbnVsbCBvciBiYXNpY2FsbHkgbnVsbCwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIEl0IGNvdWxkXHJcbiAgICAgICAgLy8gYmUgYSBmaWxlIGlzc3VlIG9yIGl0IGRpZG4ndCBhY3R1YWxseSBkcmF3IGFueSB0ZXh0LiBUaGUgcHJvdmlkZWQgdGVzdFxyXG4gICAgICAgIC8vIHRleHQgZmlsZSBpcyBOT1QgRU1QVFksIHNvIHRoYXQgd291bGRuJ3QgYmUgdGhlIGlzc3VlLlxyXG4gICAgICAgIGlmIChvdXRTdHIgPT0gbnVsbCB8fCBvdXRTdHIgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcignVGhlIGNvbnZlcnNpb24gZmlsZSBjb21wbGV0ZWQsIGJ1dCB0aGUgb3V0cHV0IHN0cmluZyBpcyBudWxsIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIGVycm9yLCBzbyBpdCBwYXNzZWQgdGhlIHVuaXQgdGVzdCFcclxuICAgICAgICBjb25zb2xlLmxvZygnVGVzdCB0ZXN0X2hlbHBlcl9jaGFuZ2VFdmVudCBwYXNzZWQhIDopJyk7XHJcblxyXG4gICAgfSBjYXRjaCAoZTogYW55KXtcclxuXHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBCYWRPdXRwdXRFcnJvcikge1xyXG4gICAgICAgICAgICAvLyBUZXN0IGZhaWx1cmU6IGJhZCBvdXRwdXQgZXJyb3JcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rlc3QgZmFpbHVyZSBpbiB0ZXN0X2hlbHBlcl9jaGFuZ2VFdmVudCwgdGhlIGVycm9yIGlzIGEgQmFkT3V0cHV0RXJyb3IuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVGVzdCBmYWlsdXJlOiB1bmtub3duIGVycm9yXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IGZhaWx1cmUgaW4gdGVzdF9oZWxwZXJfY2hhbmdlRXZlbnQsIHRoZSBlcnJvciBpcyB1bmtub3duLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLm5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ly8gdHJ5LWNhdGNoXHJcblxyXG59Ly90ZXN0X2hlbHBlcl9jaGFuZ2VFdmVudCIsImltcG9ydCB7IENvbWJvRWxlbWVudCB9IGZyb20gXCIuLi8uLi9zcmMvYmFzZV9maWxlcy9jb21ib19lbGVtZW50XCI7XHJcbmltcG9ydCB7IERlYnVnQ29tYm9NYXAgfSBmcm9tIFwiLi4vZGVidWdfb2JqZWN0cy9kZWJ1Z19jb21ib19tYXBcIjtcclxuaW1wb3J0IHsgUGFyZW50UGFpciB9IGZyb20gXCIuLi8uLi9zcmMvYmFzZV9maWxlcy9jb21ib19lbGVtZW50XCI7XHJcbmltcG9ydCB7IEJhZE91dHB1dEVycm9yIH0gZnJvbSBcIi4uLy4uL3NyYy9vdGhlci9jdXN0b21fZXJyb3JzXCI7XHJcblxyXG5cclxuLy8gVG9nZ2xlIGZ4blxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlR2VuZXJhdGluZ0NvbWJvTWFwVGVzdHMoZG9BbGw6IGJvb2xlYW4pe1xyXG5cclxuICAgIGlmKGRvQWxsID09PSB0cnVlKXtcclxuICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBDb21ib01hcCAoZ2VuZXJhdGlvbikgdGVzdHMuLi4nKTtcclxuICAgICAgICB0ZXN0X3VwZGF0ZUNvbWJvUmVsYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG59Ly90b2dnbGVUZXN0c1xyXG5cclxuLyoqXHJcbiAqIHF1ZXN0aW9uczpcclxuICogIC0gRm9yIHRoZSBiYXNpYyBjb21ibywgZG9lcyBtdWQgaGF2ZSBlYXJ0aCBhbmQgd2F0ZXIgaW4gaXRzIGNoaWxkT2Ygc2V0P1xyXG4gKiAgICAgIC0gRG8gd2F0ZXIgYW5kIGVhcnRoIGhhdmUgbXVkIGluIHRoZWlyIHBhcmVudE9mIHNldHM/XHJcbiAqICAtIEZvciBhbHRlcm5hdGUgcGFyZW50cywgZG9lcyByb2NrIGhhdmUgZmlyZSBhbmQgbXVkIGluIGl0cyBjaGlsZE9mIHNldD9cclxuICogICAgICAtIERvIGZpcmUgYW5kIG11ZCBoYXZlIHJvY2sgaW4gdGhlaXIgcGFyZW50T2Ygc2V0cz9cclxuICogIC0gRm9yIGN5Y2xpY2FsIHBhcmVudHMsIGRvZXMgbXVkIGhhdmUgcm9jayBhbmQgaXRzZWxmIGluIGl0cyBjeWNsaWNhbCBjaGlsZE9mIHNldD9cclxuICogICAgICAtIERvIHJvY2sgYW5kIG11ZCBoYXZlIG11ZCBpbiB0aGVpciBjeWNsaWNhbCBwYXJlbnRPZiBzZXRzP1xyXG4gKi9cclxuZnVuY3Rpb24gdGVzdF91cGRhdGVDb21ib1JlbGF0aW9ucygpe1xyXG5cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTRVQgVVAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIC8vICAgICAnZWFydGgsIHdhdGVyLCBtdWQnIC8vIGJhc2ljIGNvbWJvXHJcbiAgICAvLyAgICAgJ2ZpcmUsIGVhcnRoLCByb2NrJyAvLyBwYXJlbnQgY29tYm9cclxuICAgIC8vICAgICAnZmlyZSwgbXVkLCByb2NrJyAvLyBzZWNvbmQgcGFyZW50IGNvbWJvc1xyXG4gICAgLy8gICAgICd3YXRlciwgbXVkLCBtdWQnIC8vIGN5Y2xpY2FsIGNvbWJvXHJcbiAgICAvLyAgICAgJ3JvY2ssIHdhdGVyLCBtdWQnIC8vIHNlY29uZCBjeWNsaWNsIGNvbWJvXHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgZGVidWdJZFRvT2JqIG1hcFxyXG4gICAgICAgIGNvbnN0IGRlYnVnSWRUb09iak1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50PiA9IG5ldyBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGZpdmUgdW5pcWUgZWxlbWVudHMgZm9yIHRoZSBkZWJ1ZyBtYXBcclxuICAgICAgICBkZWJ1Z0lkVG9PYmpNYXAuc2V0KDEsIG5ldyBDb21ib0VsZW1lbnQoMSwgJ2VhcnRoJywgbnVsbCwgMCkpO1xyXG4gICAgICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMiwgbmV3IENvbWJvRWxlbWVudCgyLCAnd2F0ZXInLCBudWxsLCAwKSk7XHJcbiAgICAgICAgZGVidWdJZFRvT2JqTWFwLnNldCgzLCBuZXcgQ29tYm9FbGVtZW50KDMsICdtdWQnLCBuZXcgUGFyZW50UGFpcigxLCAyKSwgMSkpO1xyXG4gICAgICAgIGRlYnVnSWRUb09iak1hcC5zZXQoNCwgbmV3IENvbWJvRWxlbWVudCg0LCAnZmlyZScsIG51bGwsIDApKTtcclxuICAgICAgICBkZWJ1Z0lkVG9PYmpNYXAuc2V0KDUsIG5ldyBDb21ib0VsZW1lbnQoNSwgJ3JvY2snLCBuZXcgUGFyZW50UGFpcig0LCAxKSwgMSkpO1xyXG5cclxuICAgICAgICAvLyBzZWNvbmQgcGFyZW50IGNvbWJvIGZvciByb2NrXHJcbiAgICAgICAgZGVidWdJZFRvT2JqTWFwLmdldCg1KS5hZGRQYXJlbnRQYWlyKG5ldyBQYXJlbnRQYWlyKDQsIDMpKTtcclxuXHJcbiAgICAgICAgLy8gY3ljbGljYWwgY29tYm9zIGZvciBtdWRcclxuICAgICAgICBkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDMpLmFkZEN5Y2xpY2FsUGFyZW50UGFpcihuZXcgUGFyZW50UGFpcigyLCAzKSk7XHJcbiAgICAgICAgZGVidWdJZFRvT2JqTWFwLmdldCgzKS5hZGRDeWNsaWNhbFBhcmVudFBhaXIobmV3IFBhcmVudFBhaXIoNSwgMikpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBkZWJ1Z0NvbWJvTWFwXHJcbiAgICAgICAgY29uc3QgZGVidWdDb21ib01hcCA9IG5ldyBEZWJ1Z0NvbWJvTWFwKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgZGVidWcgaWRUb09iak1hcFxyXG4gICAgICAgIGRlYnVnQ29tYm9NYXAuc2V0SWRUb09iak1hcChkZWJ1Z0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICAvLyBOb3cgcnVuIHRoZSBtZXRob2RcclxuICAgICAgICBkZWJ1Z0NvbWJvTWFwLnVwZGF0ZUNvbWJvRWxlbWVudFJlbGF0aW9ucygpO1xyXG5cclxuICAgICAgICAvLyBUaGlzIHNpbXBsaWZ5cyB0aGluZ3MgZm9yIHRoZSB0ZXN0c1xyXG4gICAgICAgIGNvbnN0IGVhcnRoRWxlbTogQ29tYm9FbGVtZW50ID0gZGVidWdJZFRvT2JqTWFwLmdldCgxKTtcclxuICAgICAgICBjb25zdCB3YXRlckVsZW06IENvbWJvRWxlbWVudCA9IGRlYnVnSWRUb09iak1hcC5nZXQoMik7XHJcbiAgICAgICAgY29uc3QgbXVkRWxlbTogQ29tYm9FbGVtZW50ID0gZGVidWdJZFRvT2JqTWFwLmdldCgzKTtcclxuICAgICAgICBjb25zdCBmaXJlRWxlbTogQ29tYm9FbGVtZW50ID0gZGVidWdJZFRvT2JqTWFwLmdldCg0KTtcclxuICAgICAgICBjb25zdCByb2NrRWxlbTogQ29tYm9FbGVtZW50ID0gZGVidWdJZFRvT2JqTWFwLmdldCg1KTtcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVEVTVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAgICAgLy8gQmFzaWMgY29tYm9cclxuICAgICAgICBpZiAoKG11ZEVsZW0uY2hpbGRPZi5oYXMoMSkgJiYgbXVkRWxlbS5jaGlsZE9mLmhhcygyKSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgQmFzaWMgY29tYm8gY2hlY2sgZmFpbGVkLiBFeHBlY3RlZCBpZHMgMSBhbmQgMiBgICtcclxuICAgICAgICAgICAgICAgIGBpbiBtdWQncyBjaGlsZE9mIHNldCwgYnV0IGdvdCB0aGlzIGluc3RlYWQ6IGAgK1xyXG4gICAgICAgICAgICAgICAgYCR7bXVkRWxlbS5zZXRUb1N0cmluZyhtdWRFbGVtLmNoaWxkT2YpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChlYXJ0aEVsZW0ucGFyZW50T2YuaGFzKDMpICYmIHdhdGVyRWxlbS5wYXJlbnRPZi5oYXMoMykpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYEJhc2ljIGNvbWJvIGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgaWQgMyBpbiBgICtcclxuICAgICAgICAgICAgICAgIGBlYXJ0aCBhbmQgd2F0ZXIncyBwYXJlbnRPZiBzZXRzLCBidXQgZ290IHRoaXMgaW5zdGVhZDogYCArXHJcbiAgICAgICAgICAgICAgICBgeyR7ZWFydGhFbGVtLnNldFRvU3RyaW5nKGVhcnRoRWxlbS5wYXJlbnRPZil9fSwgYCArIFxyXG4gICAgICAgICAgICAgICAgYCR7d2F0ZXJFbGVtLnNldFRvU3RyaW5nKHdhdGVyRWxlbS5wYXJlbnRPZil9fWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWx0ZXJuYXRlIHBhcmVudCBjb21ib1xyXG4gICAgICAgIGlmICgocm9ja0VsZW0uY2hpbGRPZi5oYXMoNCkgJiYgcm9ja0VsZW0uY2hpbGRPZi5oYXMoMykpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYEFsdGVybmF0ZSBwYXJlbnQgY29tYm8gY2hlY2sgZmFpbGVkLiBFeHBlY3RlZCAgYCArXHJcbiAgICAgICAgICAgICAgICBgaWRzIDQgYW5kIDMgaW4gcm9jaydzIGNoaWxkT2Ygc2V0LCBidXQgZ290IHRoaXMgaW5zdGVhZDogYCArXHJcbiAgICAgICAgICAgICAgICBgJHtyb2NrRWxlbS5zZXRUb1N0cmluZyhyb2NrRWxlbS5jaGlsZE9mKX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoZmlyZUVsZW0ucGFyZW50T2YuaGFzKDUpICYmIG11ZEVsZW0ucGFyZW50T2YuaGFzKDUpKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBBbHRlcm5hdGUgcGFyZW50IGNvbWJvIGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgYCArXHJcbiAgICAgICAgICAgICAgICBgaWQgNSBpbiBmaXJlIGFuZCBtdWQncyBwYXJlbnRPZiBzZXRzLCBidXQgZ290IHRoaXMgaW5zdGVhZDogYCArXHJcbiAgICAgICAgICAgICAgICBgeyR7ZmlyZUVsZW0uc2V0VG9TdHJpbmcoZmlyZUVsZW0ucGFyZW50T2YpfX0sIGAgK1xyXG4gICAgICAgICAgICAgICAgYCR7bXVkRWxlbS5zZXRUb1N0cmluZyhtdWRFbGVtLnBhcmVudE9mKX19YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDeWNsaWNsIGNvbWJvXHJcbiAgICAgICAgaWYgKChtdWRFbGVtLmN5Y2xpY2FsQ2hpbGRPZi5oYXMoNSkgJiYgbXVkRWxlbS5jeWNsaWNhbENoaWxkT2YuaGFzKDMpKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBDeWNsaWNhbCBjb21ibyBjaGVjayBmYWlsZWQuIEV4cGVjdGVkIGlkcyA1IGFuZCAzIGAgK1xyXG4gICAgICAgICAgICAgICAgYGluIG11ZCdzIGN5Y2xpY2FsQ2hpbGRPZiBzZXQsIGJ1dCBnb3QgdGhpcyBpbnN0ZWFkOiBgICtcclxuICAgICAgICAgICAgICAgIGAke211ZEVsZW0uc2V0VG9TdHJpbmcobXVkRWxlbS5jeWNsaWNhbENoaWxkT2YpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChyb2NrRWxlbS5jeWNsaWNhbFBhcmVudE9mLmhhcygzKSAmJiBtdWRFbGVtLmN5Y2xpY2FsUGFyZW50T2YuaGFzKDMpKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBDeWNsaWNhbCBjb21ibyBjaGVjayBmYWlsZWQuIEV4cGVjdGVkIGlkIDMgaW4gcm9jayBgICtcclxuICAgICAgICAgICAgICAgIGBhbmQgbXVkJ3MgY3ljbGljYWxQYXJlbnRPZiBzZXRzLCBidXQgZ290IHRoaXMgaW5zdGVhZDogYCArXHJcbiAgICAgICAgICAgICAgICBgeyR7cm9ja0VsZW0uc2V0VG9TdHJpbmcocm9ja0VsZW0uY3ljbGljYWxQYXJlbnRPZil9fSwgYCArXHJcbiAgICAgICAgICAgICAgICBgJHttdWRFbGVtLnNldFRvU3RyaW5nKG11ZEVsZW0uY3ljbGljYWxQYXJlbnRPZil9fWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIGVycm9yLCBzbyBpdCBwYXNzZWQgdGhlIHVuaXQgdGVzdCFcclxuICAgICAgICBjb25zb2xlLmxvZygnVGVzdCB0ZXN0X3VwZGF0ZUNvbWJvUmVsYXRpb25zIHBhc3NlZCEgOiknKTtcclxuXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgQmFkT3V0cHV0RXJyb3IpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfdXBkYXRlQ29tYm9SZWxhdGlvbnMgdGVzdCBmYWlsZWQgZHVlIHRvIGEgYmFkIG91dHB1dC4nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBpZiAocHJpbnRNYXAgPT09IHRydWUpIHtcclxuICAgICAgICAvLyAgICAgcm93VG9JZHNNYXAuZm9yRWFjaChwcmludFRlc3RNYXApO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfdXBkYXRlQ29tYm9SZWxhdGlvbnMgdGVzdCBmYWlsZWQgZHVlIHRvIGFuIHVua25vd24gZXJyb3IuJyk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZS50eXBlKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnN0YWNrKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0vLyB0ZXN0X3VwZGF0ZUNvbWJvUmVsYXRpb25zXHJcblxyXG4vKipcclxuICogTm8gaWRlYSBob3cgdG8gd3JpdGUgYSB1bml0IHRlc3QgZm9yIHRoaXMsIHNvIEkgd2lsbCB1aCBqdXN0IHByaW50IGl0IGFuZCBzZWUgaWYgaXQncyByaWdodCFcclxuICogKFNpbmNlIHRoZXNlIHByaW50IGZ1bmN0aW9ucyBjYW4gaGF2ZSBzZW1hbnRpYyBjaGFuZ2VzLCBhIHVzZXIgdGVzdCB0aGF0IGxvb2tzIGZvciBleGFjdFxyXG4gKiBzdHJpbmdzIHNlZW1zIGR1bWIgdG8gbWUpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRNYXBNZXRob2RUZXN0aW5nKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2F0ZXIsIGZpcmUsIHN0ZWFtXHJcbiAgICAgKiBlYXJ0aCwgd2F0ZXIsIG11ZFxyXG4gICAgICogYWlyLCBhaXIsIHByZXNzdXJlXHJcbiAgICAgKiBtdWQsIHByZXNzdXJlLCByb2NrXHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBtYWtlIGRlYnVnIG1hcHNcclxuICAgIGNvbnN0IGRlYnVnTmFtZVRvSWRNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xyXG4gICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3dhdGVyJywgMSk7XHJcbiAgICBkZWJ1Z05hbWVUb0lkTWFwLnNldCgnZmlyZScsIDIpO1xyXG4gICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3N0ZWFtJywgMyk7XHJcbiAgICBkZWJ1Z05hbWVUb0lkTWFwLnNldCgnZWFydGgnLCA0KTtcclxuICAgIGRlYnVnTmFtZVRvSWRNYXAuc2V0KCdtdWQnLCA1KTtcclxuICAgIGRlYnVnTmFtZVRvSWRNYXAuc2V0KCdhaXInLCA2KTtcclxuICAgIGRlYnVnTmFtZVRvSWRNYXAuc2V0KCdwcmVzc3VyZScsIDcpO1xyXG4gICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3JvY2snLCA4KTtcclxuXHJcbiAgICBjb25zdCBkZWJ1Z0lkVG9PYmpNYXA6IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4gPSBuZXcgTWFwPG51bWJlciwgQ29tYm9FbGVtZW50PigpO1xyXG4gICAgZGVidWdJZFRvT2JqTWFwLnNldCgxLCBuZXcgQ29tYm9FbGVtZW50KDEsICd3YXRlcicsIG51bGwsIDApKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMiwgbmV3IENvbWJvRWxlbWVudCgyLCAnZmlyZScsIG51bGwsIDApKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMywgbmV3IENvbWJvRWxlbWVudCgzLCAnc3RlYW0nLCBuZXcgUGFyZW50UGFpcigxLCAyKSwgMSkpO1xyXG4gICAgZGVidWdJZFRvT2JqTWFwLnNldCg0LCBuZXcgQ29tYm9FbGVtZW50KDQsICdlYXJ0aCcsIG51bGwsIDApKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoNSwgbmV3IENvbWJvRWxlbWVudCg1LCAnbXVkJywgbmV3IFBhcmVudFBhaXIoNCwxKSwgMSkpO1xyXG4gICAgZGVidWdJZFRvT2JqTWFwLnNldCg2LCBuZXcgQ29tYm9FbGVtZW50KDYsICdhaXInLCBudWxsLCAwKSk7XHJcbiAgICBkZWJ1Z0lkVG9PYmpNYXAuc2V0KDcsIG5ldyBDb21ib0VsZW1lbnQoNywgJ3ByZXNzdXJlJywgbmV3IFBhcmVudFBhaXIoNiw2KSwgMSkpO1xyXG4gICAgZGVidWdJZFRvT2JqTWFwLnNldCg4LCBuZXcgQ29tYm9FbGVtZW50KDgsICdyb2NrJywgbmV3IFBhcmVudFBhaXIoNSwgNyksIDIpKTtcclxuXHJcbiAgICBjb25zdCBkZWJ1Z1Jvd1RvSWRzTWFwOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyW10+KCk7XHJcbiAgICBkZWJ1Z1Jvd1RvSWRzTWFwLnNldCgwLCBbMSwgMiwgNCwgNl0pO1xyXG4gICAgZGVidWdSb3dUb0lkc01hcC5zZXQoMSwgWzMsNSw3XSk7XHJcbiAgICBkZWJ1Z1Jvd1RvSWRzTWFwLnNldCgyLCBbOF0pO1xyXG5cclxuICAgIC8vIE1ha2UgZGVidWcgQ29tYm9NYXBcclxuICAgIGNvbnN0IGRlYnVnQ29tYm9NYXAgPSBuZXcgRGVidWdDb21ib01hcCgpO1xyXG5cclxuICAgIC8vIHRyeSB0aGUgbWV0aG9kLCBob3BlIGZvciB0aGUgYmVzdFxyXG4gICAgY29uc29sZS5sb2coJ0RlYnVnZ2luZyB0aGUgcHJpbnQgbWFwIG1ldGhvZCBpbiBDb21ib01hcCcpO1xyXG4gICAgY29uc29sZS5sb2coZGVidWdDb21ib01hcC5nZXRFbGVtZW50TWFwQXNTdHIoZGVidWdOYW1lVG9JZE1hcCkpO1xyXG4gICAgY29uc29sZS5sb2coZGVidWdDb21ib01hcC5nZXRFbGVtZW50TWFwQXNTdHIoZGVidWdJZFRvT2JqTWFwKSk7XHJcbiAgICBjb25zb2xlLmxvZyhkZWJ1Z0NvbWJvTWFwLmdldEVsZW1lbnRNYXBBc1N0cihkZWJ1Z1Jvd1RvSWRzTWFwKSk7XHJcblxyXG59Ly9wcmludE1ldGhvZFRlc3RpbmciLCJpbXBvcnQgeyBDb21ib0VsZW1lbnQsIFBhcmVudFBhaXIgfSBmcm9tIFwiLi4vLi4vc3JjL2Jhc2VfZmlsZXMvY29tYm9fZWxlbWVudFwiO1xyXG5pbXBvcnQgeyBUZXh0VG9IYXNoTWFwcyB9IGZyb20gXCIuLi8uLi9zcmMvZ2VuZXJhdGVfY29tYm9fbWFwL3R4dF90b19oYXNoX21hcHNcIjtcclxuaW1wb3J0IHsgQmFkSW5wdXRFcnJvciwgQmFkT3V0cHV0RXJyb3IgfSBmcm9tIFwiLi4vLi4vc3JjL290aGVyL2N1c3RvbV9lcnJvcnNcIjtcclxuXHJcbi8vIFRvZ2dsZSBmeG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVR4dFRvSGFzaE1hcHNUZXN0cyhkb0FsbDogYm9vbGVhbil7XHJcblxyXG4gICAgaWYoZG9BbGwgPT09IHRydWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIHRvZ2dsZVR4dFRvSGFzaE1hcHNUZXN0cy4uLicpO1xyXG4gICAgICAgIHRlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnIoKTtcclxuICAgICAgICB0ZXN0X2NvbnZlcnRHb29kQ29tYm9TdHJUb1N0ckFycigpO1xyXG4gICAgICAgIHRlc3RfY3JlYXRlTmFtZVRvSWRNYXAoKTtcclxuICAgICAgICB0ZXN0X2hhbmRsZUNoaWxkRWxlbWVudHMoKTtcclxuICAgICAgICB0ZXN0X2NyZWF0ZUlkVG9PYmpNYXAoKTtcclxuICAgICAgICB0ZXN0X2NyZWF0ZVJvd1RvSWRzTWFwKCk7XHJcbiAgICB9XHJcblxyXG59Ly90b2dnbGVUZXN0c1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHRlc3QgY2hlY2tzIGZvciB0aGUgZXhwZWN0ZWQgYmVoYXZpb3Igb2YgaW52YWxpZCBzdHJpbmcgaW5wdXRzXHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXN0X2NvbnZlcnRCYWRDb21ib1N0clRvU3RyQXJyKCl7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgY29uc3QgYmFkRGF0YVN0cnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIC8vIE5vdGU6IE11bHRpcGxlIGVudGVycyBzaG91bGQgbm90IGNhdXNlIHRoZSBjb21ib3MgZmlsZSB0byBiZSB0aHJvd24gb3V0LCBzb1xyXG4gICAgICAgIC8vIHRoYXQncyBoYW5kbGVkIGluIHRoZSBnb29kQ29tYm9TdHIgdGVzdC5cclxuXHJcbiAgICAgICAgLy8gTm90ZSAyOiBJIHRvb2sgb2ZmIHRoZSBlbnRlciBzcGFjZXMuIE15IGNvZGUgd291bGQgbm9ybWFsbHkgZmlsdGVyIHRob3NlIG91dCxcclxuICAgICAgICAvLyBhbmQgSSdtIG5vdCB0ZXN0aW5nIGZvciBlbnRlciBzcGFjZXMgaGVyZS5cclxuXHJcbiAgICAgICAgLy8gRW1wdHkgZWxlbWVudFxyXG4gICAgICAgIGJhZERhdGFTdHJzLnB1c2goJ2ZpcmUsICwgc21va2UnKTtcclxuXHJcbiAgICAgICAgLy8gVG9vIG1hbnkgZWxlbWVudHNcclxuICAgICAgICBiYWREYXRhU3Rycy5wdXNoKCdmaXJlLCB3YXRlciwgYWlyLCBwb2xsdXRpb24sIHNtb2tlJyk7XHJcblxyXG4gICAgICAgIC8vIHRvbyBmZXcgZWxlbWVudHNcclxuICAgICAgICBiYWREYXRhU3Rycy5wdXNoKCdmaXJlLCBsYXZhJyk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCB0aHJvdyBhIGJhZCBpbnB1dCBlcnJvciBmb3IgYW4gZW1wdHkgZWxlbWVudFxyXG4gICAgICAgICAgICBUZXh0VG9IYXNoTWFwcy5jb252ZXJ0Q29tYm9UZXh0VG9TdHJBcnIoYmFkRGF0YVN0cnNbMF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gSXQgZGlkbid0IHRocm93IGFuIGVycm9yLCBzbyB0aHJvdyBhIGJhZCBvdXRwdXQgZXJyb3JcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdBIEJhZElucHV0RXJyb3Igd2FzIGV4cGVjdGVkIGZvciBhbiBlbXB0eSBlbGVtZW50LCBidXQnICtcclxuICAgICAgICAgICAgICAgICdpdCBkaWRuXFwndCBoYXBwZW4nKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZElucHV0RXJyb3IgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgZXJyb3IgaXMgcmlnaHRcclxuICAgICAgICAgICAgICAgIGlmIChlLm1lc3NhZ2UgIT09IGBUaGUgY29tYmluYXRpb24gbGluZSAnJHtiYWREYXRhU3Ryc1swXX0nIGhhcyBhdCBsZWFzdCAxIGVtcHR5IHRlcm0uYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgVGhlIHJldHVybmVkIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSBlbXB0eSBlbGVtZW50IGNoZWNrIGlzIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgZGlmZmVyZW50IHRoYW4gZXhwZWN0ZWQuIFRoaXMgZXJyb3IgbWVzc2FnZSB3YXMgcmV0dXJuZWQgaW5zdGVhZDpcXG4ke2UubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnIgdGVzdCBmYWlsZWQgZHVlIHRvIHRoZSBlbXB0eSBzdHJpbmcgY2hlY2snKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgdGhyb3cgYSBiYWQgaW5wdXQgZXJyb3IgZm9yIHRvbyBtYW55IGVsZW1lbnRzXHJcbiAgICAgICAgICAgIFRleHRUb0hhc2hNYXBzLmNvbnZlcnRDb21ib1RleHRUb1N0ckFycihiYWREYXRhU3Ryc1sxXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJdCBkaWRuJ3QgdGhyb3cgYW4gZXJyb3IsIHNvIHRocm93IGEgYmFkIG91dHB1dCBlcnJvclxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoJ0EgQmFkSW5wdXRFcnJvciB3YXMgZXhwZWN0ZWQgZm9yIHRvbyBtYW55IGVsZW1lbnRzLCBidXQnICtcclxuICAgICAgICAgICAgICAgICdpdCBkaWRuXFwndCBoYXBwZW4nKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmV0dXJuZWQgZXJyb3IgbWVzc2FnZSBpcyBjb3JyZWN0XHJcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgQmFkSW5wdXRFcnJvciA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGVycm9yIGlzIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5tZXNzYWdlICE9PSBgVGhlIGNvbWJpbmF0aW9uIGxpbmUgJyR7YmFkRGF0YVN0cnNbMV19JyBzaG91bGQgaGF2ZSBgICtcclxuICAgICAgICAgICAgICAgICAgICBgMyBvciA0IHRlcm1zLCBidXQgaXQgaGFzIDUgdGVybXMgaW5zdGVhZC5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBUaGUgcmV0dXJuZWQgZXJyb3IgbWVzc2FnZSBmb3IgdGhlIHRvbyBtYW55IGVsZW1lbnRzIGNoZWNrIGlzIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgZGlmZmVyZW50IHRoYW4gZXhwZWN0ZWQuIFRoaXMgZXJyb3IgbWVzc2FnZSB3YXMgcmV0dXJuZWQgaW5zdGVhZDpcXG4ke2UubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnIgdGVzdCBmYWlsZWQgZHVlIHRvIHRoZSB0b28gbWFueSBlbGVtZW50cyBjaGVjaycpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS50eXBlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCB0aHJvdyBhIGJhZCBpbnB1dCBlcnJvciBmb3IgdG9vIGZldyBlbGVtZW50YVxyXG4gICAgICAgICAgICBUZXh0VG9IYXNoTWFwcy5jb252ZXJ0Q29tYm9UZXh0VG9TdHJBcnIoYmFkRGF0YVN0cnNbMl0pO1xyXG5cclxuICAgICAgICAgICAgLy8gSXQgZGlkbid0IHRocm93IGFuIGVycm9yLCBzbyB0aHJvdyBhIGJhZCBvdXRwdXQgZXJyb3JcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdBIEJhZElucHV0RXJyb3Igd2FzIGV4cGVjdGVkIGZvciB0b28gZmV3IGVsZW1lbnRzLCBidXQnICtcclxuICAgICAgICAgICAgICAgICdpdCBkaWRuXFwndCBoYXBwZW4nKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZElucHV0RXJyb3IgPT09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBlcnJvciBpcyByaWdodFxyXG4gICAgICAgICAgICAgICAgaWYgKGUubWVzc2FnZSAhPT0gYFRoZSBjb21iaW5hdGlvbiBsaW5lICcke2JhZERhdGFTdHJzWzJdfScgc2hvdWxkIGhhdmUgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYDMgb3IgNCB0ZXJtcywgYnV0IGl0IGhhcyAyIHRlcm1zIGluc3RlYWQuYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgVGhlIHJldHVybmVkIGVycm9yIG1lc3NhZ2UgZm9yIHRoZSB0b28gZmV3IGVsZW1lbnRzIGNoZWNrIGlzIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgZGlmZmVyZW50IHRoYW4gZXhwZWN0ZWQuIFRoaXMgZXJyb3IgbWVzc2FnZSB3YXMgcmV0dXJuZWQgaW5zdGVhZDpcXG4ke2UubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnIgdGVzdCBmYWlsZWQgZHVlIHRvIHRoZSB0b28gZmV3IGVsZW1lbnRzIGNoZWNrJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIHVuZXhwZWN0ZWQgZXJyb3IsIHNvIGl0IHBhc3NlZCB0aGUgdW5pdCB0ZXN0IVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IHRlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnIgcGFzc2VkISA6KScpO1xyXG5cclxuICAgIH0gY2F0Y2goZSkge1xyXG5cclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZE91dHB1dEVycm9yID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdF9jb252ZXJ0QmFkQ29tYm9TdHJUb1N0ckFyciB0ZXN0IGZhaWxlZCBkdWUgdG8gYW4gdW5leHBlY3RlZCBvdXRwdXQgZXJyb3InKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2NvbnZlcnRCYWRDb21ib1N0clRvU3RyQXJyIHRlc3QgZmFpbGVkIGR1ZSB0byBhbiB1bmtub3duIGVycm9yLCBhbmQgaXQgJyArXHJcbiAgICAgICAgICAgICAgICAnYnJva2Ugb3V0IG9mIHRoZSBvdGhlciB0cnktY2F0Y2hlcyBzb21laG93LiBXaGF0IGhhcHBlbmVkPz8/Jyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0vL3RyeS1jYXRjaCAoZm9yIHRoZSB3aG9sZSB0ZXN0KVxyXG5cclxufS8vIHRlc3RfY29udmVydEJhZENvbWJvU3RyVG9TdHJBcnJcclxuXHJcblxyXG4vKipcclxuICogVGhpcyB0ZXN0IGNoZWNrcyBmb3IgdGhlIGV4cGVjdGVkIGJlaGF2aW9yIG9mIHZhbGlkIHN0cmluZyBpbnB1dHNcclxuICovXHJcbmZ1bmN0aW9uIHRlc3RfY29udmVydEdvb2RDb21ib1N0clRvU3RyQXJyKCl7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgY29uc3QgZ29vZERhdGFTdHI6IHN0cmluZyA9XHJcbiAgICAgICAgJyAgICAgIGFpciwgYWlyLCBwcmVzc3VyZSAgIFxcbicgK1xyXG4gICAgICAgICdmaXJlLCAgICAgYWlyLCBcXHRcXHRzbSBvIGtlXFxuJyArXHJcbiAgICAgICAgJ3dBVEVyLCBmaVJFLCBTdEVhTVxcbicgK1xyXG4gICAgICAgICcoZUBydGgpLCBcXCd3JHQgKyBsIXHDumlkXFwnLCAmbSVkXFxuJyArIFxyXG4gICAgICAgICdcXG5cXG5cXG5maXJlLCBlYXJ0aCwgbGF2YVxcbicgKyBcclxuICAgICAgICAnXFxyd2F0ZXIsIHdhdGVyLCBwb25kXFxuJztcclxuXHJcbiAgICAgICAgY29uc3QgZ29vZERhdGFSZXN1bHRBcnIgPSBUZXh0VG9IYXNoTWFwcy5jb252ZXJ0Q29tYm9UZXh0VG9TdHJBcnIoZ29vZERhdGFTdHIpO1xyXG5cclxuICAgICAgICAvLyBOb3cgY2hlY2sgdGhlIGFycmF5XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRyaW0gd29ya2VkXHJcbiAgICAgICAgaWYgKGdvb2REYXRhUmVzdWx0QXJyWzBdICE9PSAnYWlyLCBhaXIsIHByZXNzdXJlJyl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgVHJpbSBjaGVjayBmYWlsZWQuIEdvdCB0aGlzIGluc3RlYWQ6XFxuYCArXHJcbiAgICAgICAgICAgICAgICBgJyR7Z29vZERhdGFSZXN1bHRBcnJbMF19J2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZXh0cmEgd2hpdGUgc3BhY2Ugd2FzIHRha2VuIG91dCwgYnV0IGludGVudGlvbmFsXHJcbiAgICAgICAgLy8gd2hpdGUgc3BhY2UgaXMgbGVmdCBpblxyXG4gICAgICAgIGlmKGdvb2REYXRhUmVzdWx0QXJyWzFdICE9PSAnZmlyZSwgYWlyLCBzbSBvIGtlJyl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgRXh0cmEgd2hpdGVzcGFjZSBjaGVjayBmYWlsZWQuIEdvdCB0aGlzIGluc3RlYWQ6XFxuYCArXHJcbiAgICAgICAgICAgICAgICBgJyR7Z29vZERhdGFSZXN1bHRBcnJbMV19J2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZXZlcnl0aGluZyBpcyBsb3dlciBjYXNlXHJcbiAgICAgICAgaWYoZ29vZERhdGFSZXN1bHRBcnJbMl0gIT09ICd3YXRlciwgZmlyZSwgc3RlYW0nKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBMb3dlciBjYXNlIGNoZWNrIGZhaWxlZC4gR290IHRoaXMgaW5zdGVhZDpcXG5gICtcclxuICAgICAgICAgICAgICAgIGAnJHtnb29kRGF0YVJlc3VsdEFyclsyXX0nYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc3BlY2lhbCBzeW1ib2xzIGFyZSBsZWZ0IGluXHJcbiAgICAgICAgaWYoZ29vZERhdGFSZXN1bHRBcnJbM10gIT09ICcoZUBydGgpLCBcXCd3JHQgKyBsIXHDumlkXFwnLCAmbSVkJyl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgU3BlY2lhbCBjaGF0YWN0ZXIgY2hlY2sgZmFpbGVkIChUaGV5IHNob3VsZCBiZSBpbiB0aGVyZSkuYCArXHJcbiAgICAgICAgICAgICAgICBgIEdvdCB0aGlzIGluc3RlYWQ6XFxuJyR7Z29vZERhdGFSZXN1bHRBcnJbM119J2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgZG91YmxlIGVudGVycyBhcmUgcHJvcGVybHkgZmlsdGVyZWQgb3V0XHJcbiAgICAgICAgaWYoZ29vZERhdGFSZXN1bHRBcnIubGVuZ3RoICE9PSA2IHx8IGdvb2REYXRhUmVzdWx0QXJyWzRdICE9PSAnZmlyZSwgZWFydGgsIGxhdmEnKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBEb3VibGUgZW50ZXIgY2hlY2sgZmFpbGVkLiBgICtcclxuICAgICAgICAgICAgICAgIGBHb3QgdGhpcyBpbnN0ZWFkOlxcbicke2dvb2REYXRhUmVzdWx0QXJyWzRdfSdcXG5sZW5ndGggb2YgYXJyOiBgICtcclxuICAgICAgICAgICAgICAgIGAke2dvb2REYXRhUmVzdWx0QXJyLmxlbmd0aH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGNhcnJpYWdlIHJldHVybnMgKFxccikgYXJlIHByb3Blcmx5IHJlcGxhY2VkIHdpdGggbm9ybWFsIFxcbiBlbnRlciBzcGFjZXNcclxuICAgICAgICBpZihnb29kRGF0YVJlc3VsdEFycls1XSAhPT0gJ3dhdGVyLCB3YXRlciwgcG9uZCcpe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYENhcnJpYWdlIHJldHVybiBjaGVjayBmYWlsZWQuIGAgK1xyXG4gICAgICAgICAgICAgICAgYEdvdCB0aGlzIGluc3RlYWQ6XFxuJyR7Z29vZERhdGFSZXN1bHRBcnJbNV19J2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIGVycm9yLCBzbyBpdCBwYXNzZWQgdGhlIHVuaXQgdGVzdCFcclxuICAgICAgICBjb25zb2xlLmxvZygnVGVzdCB0ZXN0X2NvbnZlcnRHb29kQ29tYm9TdHJUb1N0ckFyciBwYXNzZWQhIDopJyk7XHJcblxyXG4gICAgfWNhdGNoKGUpIHtcclxuXHJcbiAgICAgICAgaWYoZSBpbnN0YW5jZW9mIEJhZE91dHB1dEVycm9yID09PSB0cnVlKXtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2NvbnZlcnRDb21ib1N0clRvU3RyQXJyIHRlc3QgZmFpbGVkIGR1ZSB0byBhIGJhZCBvdXRwdXQuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2NvbnZlcnRDb21ib1N0clRvU3RyQXJyIHRlc3QgZmFpbGVkIGR1ZSB0byBhbiB1bmtub3duIGVycm9yLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfS8vY2F0Y2hcclxuXHJcbn0vL3Rlc3RfY29udmVydENvbWJvU3RyVG9TdHJBcnJcclxuXHJcbi8qKlxyXG4gKiBUZXN0IHF1ZXN0aW9uczpcclxuICogIC0gRGlkIHRoZSB0cmltIHdvcms/XHJcbiAqICAtIEFyZSBuYW1lcyBhY3R1YWxseSBiZWluZyBhc3NpZ25lZCB0byBpZHM/IChjaGVjayBpZiBlbXB0eSlcclxuICogIC0gQXJlIGlkcyBiZWluZyBhc3NpZ25lZCBjb3JyZWN0bHk/XHJcbiAqICAtIEFyZSB0aGVyZSBkdXBsaWNhdGVzIG9mIGFueSBuYW1lcz9cclxuICovXHJcbmZ1bmN0aW9uIHRlc3RfY3JlYXRlTmFtZVRvSWRNYXAoKSB7XHJcblxyXG4gICAgY29uc3QgY29tYm9UeHRBcnI6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdmaXJlLCB3YXRlciwgc3RlYW0nLCBcclxuICAgICAgICAnd2F0ZXIsIGVhcnRoLCBtdWQnXHJcbiAgICBdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3RlZCBuYW1lcyB0byBpZHM6XHJcbiAgICAgKiBcclxuICAgICAqICBmaXJlICAgIHwgMVxyXG4gICAgICogIHdhdGVyICAgfCAyXHJcbiAgICAgKiAgc3RlYW0gICB8IDNcclxuICAgICAqICBlYXJ0aCAgIHwgNFxyXG4gICAgICogIG11ZCAgICAgfCA1XHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIHRlc3QgaWQgbWFwXHJcbiAgICBjb25zdCBuYW1lVG9JZE1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IFRleHRUb0hhc2hNYXBzLmNyZWF0ZU5hbWVUb0lkTWFwKGNvbWJvVHh0QXJyKTtcclxuXHJcbiAgICAvLyBUaGlzIGlzIGEgdG9nZ2xlIGZvciBwcmludGluZyB0aGUgbWFwIGlmIG5lZWRlZFxyXG4gICAgbGV0IHByaW50TWFwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgaWYgKG5hbWVUb0lkTWFwLnNpemUgPT0gbnVsbCB8fCBuYW1lVG9JZE1hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcignRW1wdHkgbWFwIGNoZWNrIGZhaWxlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvciBmdXR1cmUgdGVzdHMsIHByaW50IHRoZSBtYXAgaWYgdGhlcmUncyBhIGJhZCBvdXRwdXQgZmFpbHVyZVxyXG4gICAgICAgIHByaW50TWFwID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWVUb0lkTWFwLnNpemUgIT09IDUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBTaXplIGNoZWNrIGZhaWxlZC4gVGhlIHNpemUgb2YgdGhlIG1hcCB3YXMgYCArXHJcbiAgICAgICAgICAgICAgICBgZXhwZWN0ZWQgdG8gYmUgNSwgYnV0IGlzIHRoaXMgaW5zdGVhZDogJHtuYW1lVG9JZE1hcC5zaXplfWApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChuYW1lVG9JZE1hcC5oYXMoJ2ZpcmUnKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoJ1RyaW0gY2hlY2sgZmFpbGVkLicpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChuYW1lVG9JZE1hcC5nZXQoJ3N0ZWFtJykgIT09IDMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdJZCBjaGVjayBmYWlsZWQuIFRoZSBlbGVtZW50IFxcJ3N0ZWFtXFwnIHdhcyBleHBlY3RlZCAnICtcclxuICAgICAgICAgICAgICAgICd0byBoYXZlIGFuIGlkIG9mIDMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZXJlIHdhc24ndCBhbiBlcnJvciwgc28gaXQgcGFzc2VkIHRoZSB1bml0IHRlc3QhXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1Rlc3QgdGVzdF9jcmVhdGVOYW1lVG9JZE1hcCBwYXNzZWQhIDopJyk7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZE91dHB1dEVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdF9jb252ZXJ0Q29tYm9TdHJUb1N0ckFyciB0ZXN0IGZhaWxlZCBkdWUgdG8gYSBiYWQgb3V0cHV0LicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByaW50TWFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lVG9JZE1hcC5mb3JFYWNoKHByaW50VGVzdE1hcCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfY29udmVydENvbWJvU3RyVG9TdHJBcnIgdGVzdCBmYWlsZWQgZHVlIHRvIGFuIHVua25vd24gZXJyb3IuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0vLyBjYXRjaFxyXG5cclxufS8vdGVzdF9jcmVhdGVOYW1lVG9JZE1hcFxyXG5cclxuLyoqXHJcbiAqIFRlc3QgcXVlc3Rpb25zOlxyXG4gKiAgLSBBcmUgdGhlIG5hbWUsIGlkLCBhbmQgcm93TnVtIGNvcnJlY3Q/XHJcbiAqICAtIElzIHRoZSBhZGRlZCBwYXJlbnQgcGFpciBjb3JyZWN0P1xyXG4gKiAgLSBJcyBhbiBvbGRlciBjaGlsZCBjb3JyZWN0bHkgZ2l2ZW4gYSBzZWNvbmQgcGFyZW50IHBhaXI/XHJcbiAqICAtIEFyZSBjeWNsaWNhbCBwYWlycyBhZGRlZCBjb3JyZWN0bHk/XHJcbiAqIFxyXG4gKi9cclxuZnVuY3Rpb24gdGVzdF9oYW5kbGVDaGlsZEVsZW1lbnRzKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgY29tYm9UeHRBcnI6XHJcbiAgICAgICAgJ2VhcnRoLCB3YXRlciwgbXVkJywgLy8gdGVzdCBiYXNpY1xyXG4gICAgICAgICdmaXJlLCBtdWQsIHJvY2snLCAvLyB0ZXN0IHJvd051bSBpbmNyZW1lbnRcclxuICAgICAgICAnbXVkLCBlYXJ0aCwgcm9jaycsIC8vIHRlc3QgYWx0ZXJuYXRlIHBhcmVudCBjb21ib1xyXG4gICAgICAgICdyb2NrLCBtdWQsIGVhcnRoJyAvLyB0ZXN0IGN5Y2xpY2FsIGNvbWJvXHJcbiAgICAgICAgJ2ZpcmUsIHdhdGVyLCBib2lsJ1xyXG4gICAgICAgICdib2lsLCByb2NrLCBsYXZhJ1xyXG4gICAgICAgICdmaXJlLCBlYXJ0aCwgbGF2YScgLy8gVGVzdCByZWR1Y2VkIHJvd051bVxyXG4gICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdGVkIG5hbWVzIHRvIGlkczpcclxuICAgICAqIFxyXG4gICAgICogZWFydGggICAgfCAxXHJcbiAgICAgKiB3YXRlciAgICB8IDJcclxuICAgICAqIG11ZCAgICAgIHwgM1xyXG4gICAgICogZmlyZSAgICAgfCA0IFxyXG4gICAgICogcm9jayAgICAgfCA1XHJcbiAgICAgKiBib2lsICAgICB8IDZcclxuICAgICAqIGxhdmEgICAgIHwgN1xyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3RlZCByb3dzOiBcclxuICAgICAqIFxyXG4gICAgICogMCB8IDEsIDIsIDRcclxuICAgICAqIDEgfCAzLCA2LCA3XHJcbiAgICAgKiAyIHwgNVxyXG4gICAgICovXHJcblxyXG4gICAgLy8gU2lkZSBub3RlOiBJIGRpZG4ndCBhZGQgd2F0ZXIgYW5kIGZpcmUgdG8gdGhlIGRlYnVnSWRNYXAgYmVjYXVzZSBJIGRpZG4ndCBuZWVkXHJcbiAgICAvLyB0by4gSSBvbmx5IGFkZGVkIGVhcnRoIGZvciB0aGUgY3ljbGljYWwgY29tYm8gdGVzdC5cclxuICAgIFxyXG4gICAgLy8gQ3JlYXRlIHRoZSB0ZXN0IGlkVG9PYmpNYXBcclxuICAgIGNvbnN0IGRlYnVnSWRUb09iak1hcDogTWFwPG51bWJlciwgQ29tYm9FbGVtZW50PiA9IG5ldyBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+KCk7XHJcblxyXG4gICAgLy8gcG9wdWxhdGUgdGhlIGRlYnVnIG1hcCB3aXRoIGEgdGVzdCBlbGVtZW50IChPbmx5IGRvaW5nIDIgZWxlbWVudHMgc2luY2UgdGhlXHJcbiAgICAvLyByZXN0IG9mIHRoZSBjaGlsZCBlbGVtZW50cyB3aWxsIGp1c3QgY2hlY2sgcGFyZW50IHBhaXJzKVxyXG5cclxuICAgIC8vIHRlc3QgYWx0ZXJuYXRlIHBhcmVudCBjb21ibyBmb3Igcm9ja1xyXG4gICAgLy9jb25zdCBkZWJ1Z1JvY2tFbGVtID0gbmV3IENvbWJvRWxlbWVudCg1LCAncm9jaycsIG5ldyBQYXJlbnRQYWlyKDQsIDMpLCAyKTtcclxuICAgIC8vIHRlc3QgY3ljbGljYWwgY29tYm8gZm9yIGVhcnRoXHJcbiAgICBjb25zdCBkZWJ1Z0VhcnRoRWxlbSA9IG5ldyBDb21ib0VsZW1lbnQoMSwgJ2VhcnRoJywgbnVsbCwgMCk7XHJcblxyXG4gICAgLy8gZGVidWdJZFRvT2JqTWFwLnNldCg1LCBkZWJ1Z1JvY2tFbGVtKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMSwgZGVidWdFYXJ0aEVsZW0pO1xyXG5cclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgYSBuZXcgZWxlbWVudCBvZiBpZCAzIHdhcyBhZGRlZCB0byB0aGUgaWRUb09iak1hcFxyXG4gICAgICAgIFRleHRUb0hhc2hNYXBzLmhhbmRsZUNoaWxkRWxlbWVudHMoJ211ZCcsIDMsIG5ldyBBcnJheTxudW1iZXI+KDEsIDIpLCBcclxuICAgICAgICBuZXcgQXJyYXk8bnVtYmVyPigwLDApLCBkZWJ1Z0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICBpZiAoZGVidWdJZFRvT2JqTWFwLmhhcygzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdBZGQgbmV3IGVsZW1lbnQgdG8gaWRUb09iak1hcCBjaGVjayBmYWlsZWQuICcgXHJcbiAgICAgICAgICAgICAgICArICdJZCBjb3VsZCBub3QgYmUgZm91bmQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBhZGRlZCBuZXcgZWxlbWVudCdzIGNvbnRlbnRzIGFyZSBjb3JyZWN0XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkQmVNdWQ6IENvbWJvRWxlbWVudCA9IGRlYnVnSWRUb09iak1hcC5nZXQoMyk7XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRCZU11ZC5uYW1lICE9PSAnbXVkJyB8fCBzaG91bGRCZU11ZC5wYXJlbnRQYWlyc1swXS5nZXQoMCkgIT09IDEgXHJcbiAgICAgICAgICAgIHx8IHNob3VsZEJlTXVkLnBhcmVudFBhaXJzWzBdLmdldCgxKSAhPT0gMiB8fCBzaG91bGRCZU11ZC5yb3dOdW1iZXIgIT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYEFkZCBuZXcgZWxlbWVudCB0byBpZG9PYmpNYXAgY2hlY2sgZmFpbGVkLiBgICtcclxuICAgICAgICAgICAgICAgICAgICBgRXhwZWN0ZWQgZWxlbWVudCAoJ211ZCcsIGlkID0gMywgcFBhaXIgPSBbMSwgMl0sIHJvd051bSA9IDEpLCBidXQgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYGdvdCB0aGlzIGluc3RlYWQ6IFxcbiR7c2hvdWxkQmVNdWQuZ2V0Q29tYm9FbGVtZW50QXNTdHIoZmFsc2UpfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRlc3QgaWYgdGhlIHJvdyBpbmNyZW1lbnQgaXMgd29ya2luZ1xyXG4gICAgICAgIFRleHRUb0hhc2hNYXBzLmhhbmRsZUNoaWxkRWxlbWVudHMoJ3JvY2snLCA1LCBuZXcgQXJyYXk8bnVtYmVyPig0LCAzKSwgXHJcbiAgICAgICAgbmV3IEFycmF5PG51bWJlcj4oMCwxKSwgZGVidWdJZFRvT2JqTWFwKTtcclxuXHJcbiAgICAgICAgaWYgKGRlYnVnSWRUb09iak1hcC5nZXQoNSkucm93TnVtYmVyICE9IDIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBOZXcgZWxlbWVudCByb3dOdW0gaW5jcmVtZW50IGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgYCArXHJcbiAgICAgICAgICAgICAgICBgcm93TnVtYmVyID0gMiwgYnV0IGdvdCBhIHJvd051bWJlciA9IGAgKyBcclxuICAgICAgICAgICAgICAgIGAke2RlYnVnSWRUb09iak1hcC5nZXQoNSkucm93TnVtYmVyfSBpbnN0ZWFkLmAgKyBcclxuICAgICAgICAgICAgICAgIGBQYWlyczogJHtkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDUpLmdldFBhcmVudFBhaXJzQXNTdHIoZmFsc2UpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVzdCBhbHRlcm5hdGUgcGFyZW50IGNvbWJvXHJcbiAgICAgICAgVGV4dFRvSGFzaE1hcHMuaGFuZGxlQ2hpbGRFbGVtZW50cygncm9jaycsIDUsIG5ldyBBcnJheTxudW1iZXI+KDMsIDEpLCBcclxuICAgICAgICBuZXcgQXJyYXk8bnVtYmVyPigwLDEpLCBkZWJ1Z0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICBjb25zdCByb2NrUGFyZW50UGFpcnMgPSBkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDUpLnBhcmVudFBhaXJzO1xyXG5cclxuICAgICAgICBpZiAocm9ja1BhcmVudFBhaXJzLmxlbmd0aCAhPSAyIHx8IHJvY2tQYXJlbnRQYWlyc1sxXS5nZXQoMCkgIT0gMyB8fCBcclxuICAgICAgICAgICAgcm9ja1BhcmVudFBhaXJzWzFdLmdldCgxKSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgQWx0ZXJuYXRlIHBhcmVudCBjb21ibyBjaGVjayBmYWlsZWQuIEV4cGVjdGVkIGAgK1xyXG4gICAgICAgICAgICAgICAgYHBhcmVudFBhaXJzID0geyBbNCwgM10sIFszLCAxXSB9LCBidXQgZ290IHRoaXMgaW5zdGVhZDogYCArIFxyXG4gICAgICAgICAgICAgICAgYCR7ZGVidWdJZFRvT2JqTWFwLmdldCg1KS5nZXRQYXJlbnRQYWlyc0FzU3RyKGZhbHNlKX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRlc3QgY3ljbGljYWwgY29tYm9cclxuICAgICAgICBUZXh0VG9IYXNoTWFwcy5oYW5kbGVDaGlsZEVsZW1lbnRzKCdlYXJ0aCcsIDEsIG5ldyBBcnJheTxudW1iZXI+KDUsIDMpLCBcclxuICAgICAgICBuZXcgQXJyYXk8bnVtYmVyPigyLDEpLCBkZWJ1Z0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICBpZihkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDEpLmN5Y2xpY2FsUGFyZW50UGFpcnMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYEN5Y2xpY2FsIHBhcmVudCBjaGVjayBmYWlsZWQuIFRoZSBjeWNsaWNhbFBhcmVudCBgICtcclxuICAgICAgICAgICAgICAgIGBhcnJheSBpcyBlbXB0eS5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGRlYnVnSWRUb09iak1hcC5nZXQoMSkuY3ljbGljYWxQYXJlbnRQYWlycy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBDeWNsaWNhbCBwYXJlbnQgY2hlY2sgZmFpbGVkLiBUaGUgY3ljbGljYWxQYXJlbnQgYCArXHJcbiAgICAgICAgICAgICAgICBgYXJyYXkgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBvbmUgcGFpciwgYnV0IGl0IGhhcyBgICtcclxuICAgICAgICAgICAgICAgIGAke2RlYnVnSWRUb09iak1hcC5nZXQoMSkuY3ljbGljYWxQYXJlbnRQYWlycy5sZW5ndGh9IHBhaXJzIGluc3RlYWQuYCArXHJcbiAgICAgICAgICAgICAgICBgUGFpcnM6ICR7ZGVidWdJZFRvT2JqTWFwLmdldCg1KS5nZXRQYXJlbnRQYWlyc0FzU3RyKHRydWUpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZGVidWdJZFRvT2JqTWFwLmdldCgxKS5jeWNsaWNhbFBhcmVudFBhaXJzWzBdLmdldCgwKSAhPSA1IHx8IFxyXG4gICAgICAgICAgICBkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDEpLmN5Y2xpY2FsUGFyZW50UGFpcnNbMF0uZ2V0KDEpICE9IDMgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgQ3ljbGljYWwgcGFyZW50IGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgY3ljbGljYWwgYCArXHJcbiAgICAgICAgICAgICAgICBgcGFyZW50IHBhaXIge1s1LCAzXX0sIGJ1dCBpcyBgICtcclxuICAgICAgICAgICAgICAgIGAke2RlYnVnSWRUb09iak1hcC5nZXQoMSkuZ2V0UGFyZW50UGFpcnNBc1N0cih0cnVlKX0gaW5zdGVhZC5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRlc3QgcmVkdWNlZCByb3dOdW1cclxuICAgICAgICBjb25zdCBkZWJ1Z0JvaWxFbGVtID0gbmV3IENvbWJvRWxlbWVudCg2LCAnYm9pbCcsIG5ldyBQYXJlbnRQYWlyKDQsMiksIDEpO1xyXG4gICAgICAgIGRlYnVnSWRUb09iak1hcC5zZXQoNiwgZGVidWdCb2lsRWxlbSk7XHJcblxyXG4gICAgICAgIFRleHRUb0hhc2hNYXBzLmhhbmRsZUNoaWxkRWxlbWVudHMoJ2xhdmEnLCA3LCBuZXcgQXJyYXk8bnVtYmVyPig2LCA1KSwgXHJcbiAgICAgICAgbmV3IEFycmF5PG51bWJlcj4oMSwyKSwgZGVidWdJZFRvT2JqTWFwKTtcclxuXHJcbiAgICAgICAgVGV4dFRvSGFzaE1hcHMuaGFuZGxlQ2hpbGRFbGVtZW50cygnbGF2YScsIDcsIG5ldyBBcnJheTxudW1iZXI+KDQsIDEpLCBcclxuICAgICAgICBuZXcgQXJyYXk8bnVtYmVyPigwLDApLCBkZWJ1Z0lkVG9PYmpNYXApO1xyXG5cclxuICAgICAgICBpZihkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDcpLnJvd051bWJlciAhPSAxICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYFJlZHVjZWQgcm93TnVtYmVyIGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgbGF2YSBgICtcclxuICAgICAgICAgICAgICAgIGB0byBoYXZlIGEgcm93TnVtIG9mIDEsIGJ1dCBnb3QgJHtkZWJ1Z0lkVG9PYmpNYXAuZ2V0KDcpLnJvd051bWJlcn0gYCArXHJcbiAgICAgICAgICAgICAgICBgaW5zdGVhZC5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5vdGU6IEEgY29tYm8gZWxlbWVudCB3aWxsIHRocm93IGFuIGVycm9yIGlmIHNvbWVvbmUgYXR0ZW1wdHMgdG8gc2V0IGEgbmV3XHJcbiAgICAgICAgLy8gcGFyZW50IHBhaXIgdG8gYSBiYXNlIGVsZW1lbnQgKHRoZSBwYXJlbnRQYWlycyBhcnIgaXMgc2V0IHRvIG51bGwpXHJcblxyXG4gICAgICAgIC8vIE5vdGUgMjogRG91YmxlIGNoaWxkIGVsZW1lbnRzIGFyZSBwcm9jZXNzZWQgb25lIGNoaWxkIGF0IGEgdGltZSwgc28gdGhhdCdzXHJcbiAgICAgICAgLy8gYmV5b25kIHRoZSBzY29wZSBvZiB0aGlzIG1ldGhvZC4gVGVzdGluZyBpZiB0d28gY2hpbGRyZW4gYXJlIGFkZGVkIGlzIGRvbmVcclxuICAgICAgICAvLyBpbiB0aGUgdGVzdF9jcmVhdGVJZFRvT2JqIG1hcFxyXG5cclxuICAgICAgICAvLyBUaGVyZSB3YXNuJ3QgYW4gZXJyb3IsIHNvIGl0IHBhc3NlZCB0aGUgdW5pdCB0ZXN0IVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IHRlc3RfaGFuZGxlQ2hpbGRFbGVtZW50cyBwYXNzZWQhIDopJyk7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZE91dHB1dEVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdF9oYW5kbGVDaGlsZEVsZW1lbnRzIHRlc3QgZmFpbGVkIGR1ZSB0byBhIGJhZCBvdXRwdXQuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2hhbmRsZUNoaWxkRWxlbWVudHMgdGVzdCBmYWlsZWQgZHVlIHRvIGFuIHVua25vd24gZXJyb3IuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IC8vY2F0Y2hcclxuXHJcbn0vLyB0ZXN0X2hhbmRsZUNoaWxkRWxlbWVudHNcclxuXHJcbi8qKlxyXG4gKiBUZXN0IHF1ZXN0aW9uczpcclxuICogLSBEb2VzIGl0IHRocm93IHRoZSBiYWQgaW5wdXQgZXJyb3IgY29ycmVjdGx5P1xyXG4gKiAgLSBJcyB0aGUgbnVtYmVyIG9mIGV4cGVjdGV0ZWQgZWxlbWVudHMgY29ycmVjdD9cclxuICogICAgICAtIElzIHRoZSBudW1iZXIgb2YgcGFyZW50IGVsZW1lbnRzIGNvcnJlY3Q/XHJcbiAqIC0gSXMgYSBiYXNlIHBhcmVudCBlbGVtZW50IGFkZGVkIGNvcnJlY3RseT9cclxuICogLSBJcyB0aGUgbWFwIHRoZSBjb3JyZWN0IHNpemU/XHJcbiAqIC0gRG8gZG91YmxlIGNoaWxkcmVuIGdldCB0d28gZW50cmllcyBvbiB0aGUgbWFwP1xyXG4gKiBcclxuICovXHJcbmZ1bmN0aW9uIHRlc3RfY3JlYXRlSWRUb09iak1hcCgpIHtcclxuXHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBjb25zdCBjb21ib1R4dEFycjogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgICAgICdmaXJlLCB3YXRlciwgc3RlYW0nLCBcclxuICAgICAgICAgICAgJ3dhdGVyLCBzdGVhbSwgY2xvdWQnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIFRlc3QgaWYgdGhlIG1ldGhvZCB0aHJvd3MgYSBCYWRPdXRwdXRFcnJvciBmb3IgcGFzc2luZyBpbiBhbiBlbXB0eSBtYXBcclxuICAgICAgICBjb25zdCBlbXB0eU5hbWVNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgdGhyb3cgYSBCYWRJbnB1dEVycm9yLiBcclxuICAgICAgICAgICAgVGV4dFRvSGFzaE1hcHMuY3JlYXRlSWRUb09iak1hcChjb21ib1R4dEFyciwgZW1wdHlOYW1lTWFwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFuIGVycm9yIHdhc24ndCB0aHJvd24gZnJvbSB0aGUgbWV0aG9kLCBidXQgaXQgc2hvdWxkIGhhdmUuXHJcbiAgICAgICAgICAgIC8vIFRocm93IGEgYmFkIG91dHB1dCBlcnJvciBiZWNhdXNlIHRoaXMgdGVzdCBoYXMgZmFpbGVkLlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoJ0VtcHR5IG1hcCBlcnJvciBjaGVjayBmYWlsZWQuIEEgQmFkSW5wdXRFcnJvciB3YXMgJyArXHJcbiAgICAgICAgICAgICdleHBlY3RlZCwgYnV0IG5ldmVyIHRocm93bi4nKTtcclxuXHJcbiAgICAgICAgLy8gQ2F0Y2ggdGhlIGV4cGVjdGVkIGVycm9yLiBJZiBpdCdzIGEgQmFkSW5wdXRFcnJvciBhcyBleHBlY3RkLCBub3RoaW5nIGhhcHBlbnNcclxuICAgICAgICAvLyBhbmQgdGhlIHRlc3QgbW92ZXMgb24uIEJ1dCBpZiBhIGRpZmZlcmVudCBlcnJvciBpcyB0aHJvd24sIHRoYXQgd2lsbCBmYWlsIHRoZSB0ZXN0LiBcclxuICAgICAgICB9IGNhdGNoIChlbXB0eVRlc3RFcnJvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhyb3cgdGhlIHVuZXhwZWN0ZWQgZXJyb3IgYXMgaXMuXHJcbiAgICAgICAgICAgIGlmICgoZW1wdHlUZXN0RXJyb3IgaW5zdGFuY2VvZiBCYWRJbnB1dEVycm9yKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGVtcHR5VGVzdEVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgdXAgZm9yIHRoZSBuZXh0IGZldyByb3VuZHMgb2YgdGVzdGluZ1xyXG4gICAgICAgIGNvbnN0IGRlYnVnTmFtZVRvSWRNYXAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xyXG4gICAgICAgIGRlYnVnTmFtZVRvSWRNYXAuc2V0KCdmaXJlJywgMSk7XHJcbiAgICAgICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3dhdGVyJywgMik7XHJcbiAgICAgICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3N0ZWFtJywgMyk7XHJcbiAgICAgICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ2Nsb3VkJywgNCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBuZXdJZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+ID0gXHJcbiAgICAgICAgICAgIFRleHRUb0hhc2hNYXBzLmNyZWF0ZUlkVG9PYmpNYXAoY29tYm9UeHRBcnIsIGRlYnVnTmFtZVRvSWRNYXApO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmV3SWRUb09iaiBtYXAgaXMgZW1wdHlcclxuICAgICAgICBpZiAobmV3SWRUb09iak1hcCA9PSBudWxsIHx8IG5ld0lkVG9PYmpNYXAuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoJ0VtcHR5IG1hcCBjaGVjayBmYWlsZWQuIFRoZSBuZXdJZFRvT2JqIG1hcCBpcyBlbXB0eS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYmFzZSBlbGVtZW50IHdhdGVyIHdhcyBjcmVhdGVkIGNvcnJlY3RseVxyXG4gICAgICAgIGlmIChuZXdJZFRvT2JqTWFwLmhhcygyKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdBZGQgcGFyZW50IGJhc2UgZWxlbWVudCBjaGVjayBmYWlsZWQuIENvdWxkIG5vdCBmaW5kICcgK1xyXG4gICAgICAgICAgICAgICAgJ3JlcXVlc3RlZCBlbGVtZW50IHRoYXQgc2hvdWxkIGV4aXN0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2hvdWxkQmVXYXRlcjogQ29tYm9FbGVtZW50ID0gbmV3SWRUb09iak1hcC5nZXQoMik7XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRCZVdhdGVyLm5hbWUgIT09ICd3YXRlcicgfHwgc2hvdWxkQmVXYXRlci5wYXJlbnRQYWlycyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgQWRkIHBhcmVudCBiYXNlIGVsZW1lbnQgY2hlY2sgZmFpbGVkLiBFbGVtZW50IHdpdGhgICtcclxuICAgICAgICAgICAgYGlkIDIgd2FzIGV4cGVjdGVkIHRvIGJlIHdhdGVyIHdpdGggbnVsbCBwYXJlbnRQYWlycywgYnV0IGdvdCB0aGlzIGluc3RlYWQ6XFxuYCArXHJcbiAgICAgICAgICAgIGAke3Nob3VsZEJlV2F0ZXIuZ2V0Q29tYm9FbGVtZW50QXNTdHJ9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGNoZWNrIGlzIGltcG9ydGFudCwgZXZlbiB0aG91Z2ggaXQgY2hlY2tzIHRoZSBoYW5kbGUgY2hpbGQgZWxlbWVudHMgbWV0aG9kLlxyXG4gICAgICAgIC8vIEZhaWxpbmcgdGhpcyBjaGVjayB3b3VsZCBpbXBseSBzb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgbWV0aG9kXHJcbiAgICAgICAgaWYgKG5ld0lkVG9PYmpNYXAuc2l6ZSAhPT0gNCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYG1hcCBzaXplIGNoZWNrIGZhaWxlZC4gRXhwZWN0ZWQgYSBzaXplIG9mIDQsIGJ1dCBnb3QgYCArXHJcbiAgICAgICAgICAgICAgICBgJHtuZXdJZFRvT2JqTWFwLnNpemV9IGluc3RlYWQuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUZXN0IGRvdWJsZSBjaGlsZHJlbi4gSWYgYWRkZWQgY29ycmN0bHksIGJvdGggY2hpbGRyZW4gd2lsbCBiZSBvbiB0aGUgbWFwXHJcblxyXG4gICAgICAgIC8vIEFkZCBlbnRyeSAtPiAnY2xvdWQsIHdhdGVyLCByYWluLCBzdG9ybSdcclxuICAgICAgICBjb21ib1R4dEFyci5wdXNoKCdjbG91ZCwgd2F0ZXIsIHJhaW4sIHN0b3JtJyk7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBBZGQgbmFtZVRvSWQgZW50cmllcyByYWluIGFuZCBzdG9ybVxyXG4gICAgICAgIGRlYnVnTmFtZVRvSWRNYXAuc2V0KCdyYWluJywgNSk7XHJcbiAgICAgICAgZGVidWdOYW1lVG9JZE1hcC5zZXQoJ3N0b3JtJywgNik7XHJcblxyXG4gICAgICAgIG5ld0lkVG9PYmpNYXAgPSBUZXh0VG9IYXNoTWFwcy5jcmVhdGVJZFRvT2JqTWFwKGNvbWJvVHh0QXJyLCBkZWJ1Z05hbWVUb0lkTWFwKTtcclxuXHJcbiAgICAgICAgaWYgKG5ld0lkVG9PYmpNYXAuc2l6ZSAhPT0gNikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQmFkT3V0cHV0RXJyb3IoYERvdWJsZSBjaGlsZCBjaGVjayBmYWlsZWQuIEV4cGVjdGVkIGEgc2l6ZSBvZiA2LCBidXQgYCArXHJcbiAgICAgICAgICAgICAgICBgZ290ICR7bmV3SWRUb09iak1hcC5zaXplfSBpbnN0ZWFkLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIHVuZXhwZWN0ZWQgZXJyb3IsIHNvIGl0IHBhc3NlZCB0aGUgdW5pdCB0ZXN0IVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IHRlc3RfY3JlYXRlSWRUb09iak1hcCBwYXNzZWQhIDopJyk7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEJhZE91dHB1dEVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdF9jcmVhdGVJZFRvT2JqTWFwIHRlc3QgZmFpbGVkIGR1ZSB0byBhIGJhZCBvdXRwdXQuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2NyZWF0ZUlkVG9PYmpNYXAgdGVzdCBmYWlsZWQgZHVlIHRvIGFuIHVua25vd24gZXJyb3IuJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuc3RhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ly9jYXRjaFxyXG5cclxufSAvL3Rlc3RfY3JlYXRlSWRUb09iak1hcFxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gbGF6aWx5IHdyaXRlIG91dCBhIGhhc2ggbWFwIGZvciB1bml0IHRlc3RpbmcgXHJcbiAqIFxyXG4gKiBAcGFyYW0gdmFsdWUgYW55IFxyXG4gKiBAcGFyYW0ga2V5IGFueVxyXG4gKiBAcGFyYW0gbWFwIE1hcDxhbnksIGFueT4gXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmludFRlc3RNYXAodmFsdWU6IGFueSwga2V5OiBhbnksIG1hcDogTWFwPGFueSwgYW55Pikge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBrZXk6ICR7a2V5fVxcbnZhbHVlOiAke3ZhbHVlfWApO1xyXG5cclxufS8vcHJpbnQgdGVzdCBtYXBcclxuXHJcbi8qKlxyXG4gKiBUZXN0IHF1ZXN0aW9uczpcclxuICogIC0gSXMgdGhlIGJhZCBpbnB1dCBlcnJvciB0aHJvd24gY29ycmVjdGx5P1xyXG4gKiAgLSBEbyB0aGUgZXhwZWN0ZWQgbnVtYmVyIG9mIHJvd3MgZXhpc3Q/XHJcbiAqICAtIEFyZSBpZHMgYWN0dWFsbHkgYmVpbmcgYXNzaWduZWQgdG8gcm93cz8gKGNoZWNrIGlmIGVtcHR5KVxyXG4gKiAgLSBBcmUgaWRzIGJlaW5nIGFzc2lnbmVkIGNvcnJlY3RseT9cclxuICogIC0gQXJlIHRoZXJlIHRoZSBjb3JyZWN0IG51bWJlciBvZiBpZHM/IChhY2NvdW50aW5nIGR1cGxpY2F0ZXMpXHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXN0X2NyZWF0ZVJvd1RvSWRzTWFwKCkge1xyXG5cclxuICAgIC8vIGNvbnN0IGNvbWJvVHh0QXJyOiBzdHJpbmdbXSA9IFtcclxuICAgIC8vICAgICAnZmlyZSwgd2F0ZXIsIHN0ZWFtJywgXHJcbiAgICAvLyAgICAgJ3dhdGVyLCBlYXJ0aCwgbXVkJ1xyXG4gICAgLy8gXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwZWN0ZWQgaWRzIHRvIHJvd3M6XHJcbiAgICAgKiBcclxuICAgICAqICAwIHwgMSAoZmlyZSksIDIgKHdhdGVyKSwgNCAoZWFydGgpXHJcbiAgICAgKiAgMSB8IDMgKHN0ZWFtKSwgNSAobXVkKVxyXG4gICAgICovXHJcblxyXG4gICAgLy8gVGVzdCBpZiB0aGUgbWV0aG9kIHRocm93cyBhIEJhZE91dHB1dEVycm9yIGZvciBwYXNzaW5nIGluIGFuIGVtcHR5IG1hcFxyXG4gICAgY29uc3QgZW1wdHlJZFRvT2JqTWFwID0gbmV3IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4oKTtcclxuXHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICAvLyBUaGlzIHNob3VsZCB0aHJvdyBhIEJhZElucHV0RXJyb3IuIFxyXG4gICAgICAgIFRleHRUb0hhc2hNYXBzLmNyZWF0ZVJvd1RvSWRzTWFwKGVtcHR5SWRUb09iak1hcCk7XHJcblxyXG4gICAgICAgIC8vIEFuIGVycm9yIHdhc24ndCB0aHJvd24gZnJvbSB0aGUgbWV0aG9kLCBidXQgaXQgc2hvdWxkIGhhdmUuXHJcbiAgICAgICAgLy8gVGhyb3cgYSBiYWQgb3V0cHV0IGVycm9yIGJlY2F1c2UgdGhpcyB0ZXN0IGhhcyBmYWlsZWQuXHJcbiAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKCdFbXB0eSBtYXAgZXJyb3IgY2hlY2sgZmFpbGVkLiBBIEJhZElucHV0RXJyb3Igd2FzICcgK1xyXG4gICAgICAgICdleHBlY3RlZCwgYnV0IG5ldmVyIHRocm93bi4nKTtcclxuXHJcbiAgICAvLyBDYXRjaCB0aGUgZXhwZWN0ZWQgZXJyb3IuIElmIGl0J3MgYSBCYWRJbnB1dEVycm9yIGFzIGV4cGVjdGQsIG5vdGhpbmcgaGFwcGVuc1xyXG4gICAgLy8gYW5kIHRoZSB0ZXN0IG1vdmVzIG9uLiBCdXQgaWYgYSBkaWZmZXJlbnQgZXJyb3IgaXMgdGhyb3duLCB0aGF0IHdpbGwgZmFpbCB0aGUgdGVzdC4gXHJcbiAgICB9IGNhdGNoIChlbXB0eVRlc3RFcnJvcikge1xyXG5cclxuICAgICAgICAvLyBUaHJvdyB0aGUgdW5leHBlY3RlZCBlcnJvciBhcyBpcy5cclxuICAgICAgICBpZiAoKGVtcHR5VGVzdEVycm9yIGluc3RhbmNlb2YgQmFkSW5wdXRFcnJvcikgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVtcHR5VGVzdEVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgYSBkZWJ1ZyBpZFRvT2JqIG1hcFxyXG4gICAgY29uc3QgZGVidWdJZFRvT2JqTWFwOiBNYXA8bnVtYmVyLCBDb21ib0VsZW1lbnQ+ID0gbmV3IE1hcDxudW1iZXIsIENvbWJvRWxlbWVudD4oKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMSwgbmV3IENvbWJvRWxlbWVudCgxLCAnZmlyZScsIG51bGwsIDApKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoMiwgbmV3IENvbWJvRWxlbWVudCgyLCAnd2F0ZXInLCBudWxsLCAwKSk7XHJcbiAgICBkZWJ1Z0lkVG9PYmpNYXAuc2V0KDMsIG5ldyBDb21ib0VsZW1lbnQoMywgJ3N0ZWFtJywgbmV3IFBhcmVudFBhaXIoMSwgMiksIDEpKTtcclxuICAgIGRlYnVnSWRUb09iak1hcC5zZXQoNCwgbmV3IENvbWJvRWxlbWVudCg0LCAnZWFydGgnLCBudWxsLCAwKSk7XHJcbiAgICBkZWJ1Z0lkVG9PYmpNYXAuc2V0KDUsIG5ldyBDb21ib0VsZW1lbnQoNSwgJ211ZCcsIG5ldyBQYXJlbnRQYWlyKDIsIDQpLCAxKSk7XHJcblxyXG4gICAgLy8gVGhpcyBpcyBhIHRvZ2dsZSBmb3IgcHJpbnRpbmcgdGhlIG1hcCBpZiBuZWVkZWRcclxuICAgIGxldCBwcmludE1hcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgYWN0dWFsIHRlc3QgbWFwXHJcbiAgICBjb25zdCByb3dUb0lkc01hcCA9IFRleHRUb0hhc2hNYXBzLmNyZWF0ZVJvd1RvSWRzTWFwKGRlYnVnSWRUb09iak1hcCk7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgaWYgKHJvd1RvSWRzTWFwLnNpemUgPT0gbnVsbCB8fCByb3dUb0lkc01hcC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcignRW1wdHkgbWFwIGNoZWNrIGZhaWxlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb3dUb0lkc01hcC5zaXplICE9PSAyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgU2l6ZSBjaGVjayBmYWlsZWQuIFRoZSBzaXplIG9mIHRoZSBtYXAgKG51bWJlciBvZiBgICtcclxuICAgICAgICAgICAgICAgIGAgcm93cykgd2FzIGV4cGVjdGVkIHRvIGJlIDIsIGJ1dCBpcyB0aGlzIGluc3RlYWQ6ICR7cm93VG9JZHNNYXAuc2l6ZX1gKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAocm93VG9JZHNNYXAuZ2V0KDApID09IG51bGwgfHwgcm93VG9JZHNNYXAuZ2V0KDApLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcignSWQgYXJyYXkgY2hlY2sgZmFpbGVkLiBUaGUgaWQgYXJyYXkgYXQgcm93IDAgaXMgZW1wdHknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByaW50IHRoZSBtYXAgaWYgZnV0dXJlIHRlc3RzIGZhaWxcclxuICAgICAgICBwcmludE1hcCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChyb3dUb0lkc01hcC5nZXQoMClbMl0gIT09IDQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZE91dHB1dEVycm9yKGBJZCBhcnJheSBjaGVjayBmYWlsZWQuIFRoZSBpZCA0IChlYXJ0aCkgYXQgcm93IDAsIGAgK1xyXG4gICAgICAgICAgICAgICAgYGluZGV4IDIgd2FzIGV4cGVjdGVkLCBidXQgZ290IGlkICR7cm93VG9JZHNNYXAuZ2V0KDApWzJdfSBpbnN0ZWFkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm93VG9JZHNNYXAuZ2V0KDApLmxlbmd0aCAhPT0gMyB8fCByb3dUb0lkc01hcC5nZXQoMSkubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBCYWRPdXRwdXRFcnJvcihgSWQgYXJyYXkgY2hlY2sgZmFpbGVkLiBUaGUgc2l6ZSBvZiByb3dzIDAgYW5kIDEgYCArIFxyXG4gICAgICAgICAgICAgICAgYHdlcmUgZXhwZWN0ZWQgdG8gYmUgMyBhbmQgMiByZXNwZWN0aXZlbHksIGJ1dCBhcmUgYCArXHJcbiAgICAgICAgICAgICAgICBgJHtyb3dUb0lkc01hcC5nZXQoMCkubGVuZ3RofSBhbmQgJHtyb3dUb0lkc01hcC5nZXQoMSkubGVuZ3RofSBpbnN0ZWFkLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlcmUgd2Fzbid0IGFuIHVuZXhwZWN0ZWQgZXJyb3IsIHNvIGl0IHBhc3NlZCB0aGUgdW5pdCB0ZXN0IVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IHRlc3RfY3JlYXRlUm93VG9JZHNNYXAgcGFzc2VkISA6KScpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBCYWRPdXRwdXRFcnJvcikge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3RfY3JlYXRlUm93VG9JZHNNYXAgdGVzdCBmYWlsZWQgZHVlIHRvIGEgYmFkIG91dHB1dC4nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcmludE1hcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcm93VG9JZHNNYXAuZm9yRWFjaChwcmludFRlc3RNYXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0X2NyZWF0ZVJvd1RvSWRzTWFwIHRlc3QgZmFpbGVkIGR1ZSB0byBhbiB1bmtub3duIGVycm9yLicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnR5cGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ly8gY2F0Y2hcclxuXHJcbn0vL3Rlc3RfY3JlYXRlTmFtZVRvSWRNYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFJ1biB1bml0IHRlc3Qgc2hpdCBoZXJlXHJcblxyXG4vLyBXQVJOSU5HOiBETyBOT1QgUlVOIFdJVEggTk9ERSEgT1BFTiBUSEUgVEVTVCBSRVNVTFRTIElOIEJST1dTRVIhISFcclxuXHJcbmltcG9ydCB7IHRvZ2dsZUZpbGVEYXRhVG9TdHJUZXN0IH0gZnJvbSBcIi4vdGVzdF9iYXNlX2ZpbGVzL3Rlc3RfZmlsZV9kYXRhX3RvX3N0clwiO1xyXG5pbXBvcnQgeyBwcmludE1hcE1ldGhvZFRlc3RpbmcsIHRvZ2dsZUdlbmVyYXRpbmdDb21ib01hcFRlc3RzIH0gZnJvbSBcIi4vdGVzdF9nZW5lcmF0ZV9jb21ib19tYXAvZ2VuZXJhdGluZ19jb21ib19tYXBfdGVzdHNcIjtcclxuaW1wb3J0IHsgdG9nZ2xlVHh0VG9IYXNoTWFwc1Rlc3RzIH0gZnJvbSBcIi4vdGVzdF9nZW5lcmF0ZV9jb21ib19tYXAvdGVzdF90eHRfdG9faGFzaF9tYXBzXCI7XHJcblxyXG5jb25zb2xlLmxvZygnVW5pdCB0ZXN0aW5nIHJlYWR5IScpO1xyXG5cclxuLyogLS0tLS0tLS0tIFRlc3QgdG9nZ2xlcyAtLS0tLS0tLS0gKi8gXHJcbnRvZ2dsZVR4dFRvSGFzaE1hcHNUZXN0cyh0cnVlKTtcclxudG9nZ2xlR2VuZXJhdGluZ0NvbWJvTWFwVGVzdHModHJ1ZSk7XHJcblxyXG4vLyBUaGlzIHVuaXQgdGVzdCBkb2VzIG5vdCBkaWUgaW4gYSBmaXJlLCBzbyBJIGNhbiBhbHdheXMgY2hlY2sgaXQgd2hlbiBuZWVkZWQhIDopXHJcbi8vcHJpbnRNYXBNZXRob2RUZXN0aW5nKCk7XHJcblxyXG4vLyBUaGlzIGdvZXMgbGFzdCBzbyBJIGNhbiBtb3JlIGVhc2lseSBzZWUgaXRcclxudG9nZ2xlRmlsZURhdGFUb1N0clRlc3QoZmFsc2UpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==