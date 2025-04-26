/* ================================================================= */
/* ------------------------- COMBO ELEMENT ------------------------- */
/* ================================================================= */

import { BadInputError } from "../other/custom_errors";

/**
 * Need to make a description here, too lazy rn
 */
export class ComboElement {

    /* -------------------------- FIELDS -------------------------- */

    /**
     * Mainly used to generate ids for all of the elements, but
     * useful knowledge nonetheless!
     */
    static #numOfElements = 0;

    readonly #id: number;
    readonly #name: string;

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
    #rowNum: number;

    /**
     * This is an array of parent pairs for each listed combo. This can
     * be null for base elements, such as water and fire.
     */
    #parentPairs: ParentPair[] | null;

    /**
     * This set is a list of parent ids this element is a child of.
     * This can be null for base elements, such as water and fire.
     */
    #childOf: Set<number> | null;

    /**
     * This set is a list of child ids this element is a parent of.
     */
    #parentOf: Set<number>;

    /**
     * Sometimes a previous element can be created by later elements.
     * For example, lightening + woods = fire. Fire is still a row 0
     * element, and the map handles cyclical parents differently
     */
    #cyclicalParentPairs: ParentPair[];

    /**
     * This set is a list of cyclical parent ids this element is a
     * cyclical child of.
     */
    #cyclicalChildOf: Set<number>;

    /**
     * This set is a list of cyclical child ids this element is a
     * cyclical parent of.
     */
    #cyclicalParentOf: Set<number>;

    /* ------------------------ CONSTRUCTOR ------------------------ */

    constructor(id: number, name: string, parentPair: ParentPair | null,
        rowNum: number){

        // Instantiate and set the parent pair arr, or don't if it's a base
        // element. By making the whole thing null, this should prevent the 
        // issue of adding parent pairs that shouldn't be there. The same
        // thing applies to the childOf set
        if (parentPair === null) {
            this.#parentPairs = null;
            this.#childOf = null;
        } else {
            this.#parentPairs = [];
            this.#parentPairs.push(parentPair);
            this.#childOf = new Set<number>();
        }

        // Instantiate arrays
        this.#parentOf = new Set<number>();

        this.#cyclicalParentPairs = new Array<ParentPair>();
        this.#cyclicalChildOf = new Set<number>();
        this.#cyclicalParentOf = new Set<number>();

        // Set properties
        this.#id = id;
        this.#name = name;
        this.#rowNum = rowNum;

    }//constructor

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

    set rowNumber(rowNum: number) {
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

    addParentPair(pPair?: ParentPair, pairArr?: number[], p1?: number, p2?: number) {

        // Useful for post generation security later
        if (this.#parentPairs === null) {
            throw new BadInputError(`You cannot add a parent pair to a base element.`);
        } else {
            if (pPair != null) {
                this.#parentPairs.push(pPair);
            } else if (pairArr != null && pairArr.length === 2) {
                const arrPPair: ParentPair = new ParentPair(pairArr[0], pairArr[1]);
                this.#parentPairs.push(arrPPair);
            } else if (p1 != null && p2 != null) {
                const numPPair: ParentPair = new ParentPair(p1, p2);
                this.#parentPairs.push(numPPair);
            } else {
                throw new BadInputError('Invalid input. Please add one Parent Pair, a number ' +
                    'array of length 2, or two numbers.');
            }
        }
    }

    addChildOf(parentId: number) {

        // Useful for post generation security later
        if (this.#childOf === null) {
            throw new BadInputError(`You cannot add a childOf id to a base element.`);
        } else {
            this.#childOf.add(parentId);
        }
    }

    addParentOf(childId: number) {
        this.#parentOf.add(childId);
    }

    // cyclical parent - child

    get cyclicalParentPairs() {
        return this.#cyclicalParentPairs;
    }

    get cyclicalChildOf(){
        return this.#cyclicalChildOf;
    }

    get cyclicalParentOf() {
        return this.#cyclicalParentOf;
    }

    addCyclicalParentPair(pPair?: ParentPair, pairArr?: number[], p1?: number, p2?: number) {
        
        if (pPair != null) {
            this.#cyclicalParentPairs.push(pPair);
        } else if (pairArr != null && pairArr.length === 2) {
            const arrPPair: ParentPair = new ParentPair(pairArr[0], pairArr[1]);
            this.#cyclicalParentPairs.push(arrPPair);
        } else if (p1 != null && p2 != null) {
            const numPPair: ParentPair = new ParentPair(p1, p2);
            this.#cyclicalParentPairs.push(numPPair);
        } else {
            throw new BadInputError('Invalid input. Please add one Parent Pair, a number ' +
                'array of length 2, or two numbers.');
        }

    }

    addCyclicalChildOf(cyclicalParentId: number){
        this.#cyclicalChildOf.add(cyclicalParentId);
    }

    addCyclicalParentOf(cyclicalChildId: number) {
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
    public static calculateRowNum(r1: number, r2: number) {
        if (r1 >= r2) {
            return r1 + 1;
        } else {
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
    checkIfParentPairIsUnique(pair: ParentPair) {

    }

    /**
     * Used for both normal and cyclical parent pairs
     * Output: { [id1, id2], [id1, id2], ... etc. }
     */
    getParentPairsAsStr(isCyclical: boolean) {

        let arrToIterate: ParentPair[] | null = null;

        if (isCyclical === false) {
            arrToIterate = this.#parentPairs;
        } else {
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

        let returnStr: string = `{ `;

        // Adds '[id1, id2], ' to the returnStr
        for (const pPair of arrToIterate) {
            returnStr = returnStr + pPair.printPairAsStr() + `, `;
        }

        // Cut off the last ', ' and add a ' }' instead
        returnStr = returnStr.substring(0, returnStr.length - 2);
        returnStr = returnStr + ` }`;

        return returnStr;

    }// getParentPairsAsStr


    // TODO: Finish updating this in the future
    /**
     * Output: "< name: 'name', id: 'id', pPairs: {...}, rowNumber: 'rowNum' >"
     */
    getComboElementAsStr(doFullString: boolean){

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

    setToString(s: Set<number>) {

        if (s == null) {
            return 'null';
        }

        // Get the iterator and the first value in it
        const iterator: SetIterator<number> = s.values();
        let nextVal: number | null = iterator.next().value;

        let returnStr: string = `{`;

        while(nextVal != null) {

            returnStr = returnStr + `${nextVal}, `;

            // Advance the iterator
            nextVal = iterator.next().value;

        }

        // Clean up and prepare the string
        if(returnStr.length !== 1) {
            returnStr = returnStr.substring(0, (returnStr.length - 2));
        }
        
        returnStr = returnStr + `}`;

        return returnStr;

    }

}// class Combo Element 

/* ================================================================= */
/* -------------------------- PAIR CLASSES ------------------------- */
/* ================================================================= */

/**
 * A simple class to help preserve combo information. It only
 * holds two ids. This class prevents problems with number[][]
 * dubious typing and confusion
 */
export class ParentPair {

    #pair: number[] = [];

    constructor(p1Id: number, p2Id: number) {
        this.#pair.push(p1Id);
        this.#pair.push(p2Id);
    }

    get pair() {
        return this.#pair;
    }

    get(index: number) {
        return this.#pair[index];
    }

    printPairAsStr() {
        return `[${this.#pair[0]}, ${this.#pair[1]}]`;
    }

}//class ParentPair


// /**
//  * Another helper class to make my life a little easier
//  */
export class ConstraintPair {

    /**
     * The id to constrain to
     */
    #constrId: number;

    /**
     * prime mod base list
     */
    #modList: number[];

    constructor(idToConstrainTo: number, primeModBaseList: number[]){

        this.#constrId = idToConstrainTo;
        this.#modList = primeModBaseList;
    }

    get constrId(){
        return this.#constrId;
    }

    get modList() {
        return this.#modList;
    }
    
}//class ConstraintPair



