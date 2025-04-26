import { ComboElement, ParentPair } from "../../src/base_files/combo_element";
import { TextToHashMaps } from "../../src/generate_combo_map/txt_to_hash_maps";
import { BadInputError, BadOutputError } from "../../src/other/custom_errors";

// Toggle fxn
export function toggleTxtToHashMapsTests(doAll: boolean){

    if(doAll === true){
        console.log('running toggleTxtToHashMapsTests...');
        test_convertBadComboStrToStrArr();
        test_convertGoodComboStrToStrArr();
        test_createNameToIdMap();
        test_handleChildElements();
        test_createIdToObjMap();
        test_createRowToIdsMap();
    }

}//toggleTests


/**
 * This test checks for the expected behavior of invalid string inputs
 */
function test_convertBadComboStrToStrArr(){

    try {

        const badDataStrs: string[] = [];

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
            TextToHashMaps.convertComboTextToStrArr(badDataStrs[0]);

            // It didn't throw an error, so throw a bad output error
            throw new BadOutputError('A BadInputError was expected for an empty element, but' +
                'it didn\'t happen');

        } catch(e) {

            if (e instanceof BadInputError === true) {
                
                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[0]}' has at least 1 empty term.`) {
                    throw new BadOutputError(`The returned error message for the empty element check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
                
            } else {
                console.log('test_convertBadComboStrToStrArr test failed due to the empty string check');
                console.log(e.type);
                console.log(e.message);
            }
        }

        try {

            // This should throw a bad input error for too many elements
            TextToHashMaps.convertComboTextToStrArr(badDataStrs[1]);

            // It didn't throw an error, so throw a bad output error
            throw new BadOutputError('A BadInputError was expected for too many elements, but' +
                'it didn\'t happen');

        } catch(e) {

            // Check if the returned error message is correct
            if (e instanceof BadInputError === true) {

                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[1]}' should have ` +
                    `3 or 4 terms, but it has 5 terms instead.`) {
                    throw new BadOutputError(`The returned error message for the too many elements check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
                
            } else {
                console.log('test_convertBadComboStrToStrArr test failed due to the too many elements check');
                console.log(e.type);
                console.log(e.message);
            }
        }

        try {

            // This should throw a bad input error for too few elementa
            TextToHashMaps.convertComboTextToStrArr(badDataStrs[2]);

            // It didn't throw an error, so throw a bad output error
            throw new BadOutputError('A BadInputError was expected for too few elements, but' +
                'it didn\'t happen');

        } catch(e) {

            if (e instanceof BadInputError === true) {

                // Check that the error is right
                if (e.message !== `The combination line '${badDataStrs[2]}' should have ` +
                    `3 or 4 terms, but it has 2 terms instead.`) {
                    throw new BadOutputError(`The returned error message for the too few elements check is ` +
                        `different than expected. This error message was returned instead:\n${e.message}`);
                }
                
            } else {
                console.log('test_convertBadComboStrToStrArr test failed due to the too few elements check');
                console.log(e.type);
                console.log(e.message);
            }
        }

        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_convertBadComboStrToStrArr passed! :)');

    } catch(e) {

        if (e instanceof BadOutputError === true) {

            console.log('test_convertBadComboStrToStrArr test failed due to an unexpected output error');
            console.log(e.message);

        } else {

            console.log('test_convertBadComboStrToStrArr test failed due to an unknown error, and it ' +
                'broke out of the other try-catches somehow. What happened???');
            console.log(e.type);
            console.log(e.message);
        }

    }//try-catch (for the whole test)

}// test_convertBadComboStrToStrArr


/**
 * This test checks for the expected behavior of valid string inputs
 */
function test_convertGoodComboStrToStrArr(){

    try {

        const goodDataStr: string =
        '      air, air, pressure   \n' +
        'fire,     air, \t\tsm o ke\n' +
        'wATEr, fiRE, StEaM\n' +
        '(e@rth), \'w$t + l!qúid\', &m%d\n' + 
        '\n\n\nfire, earth, lava\n' + 
        '\rwater, water, pond\n';

        const goodDataResultArr = TextToHashMaps.convertComboTextToStrArr(goodDataStr);

        // Now check the array

        // Check if trim worked
        if (goodDataResultArr[0] !== 'air, air, pressure'){
            throw new BadOutputError(`Trim check failed. Got this instead:\n` +
                `'${goodDataResultArr[0]}'`);
        }

        // Check if extra white space was taken out, but intentional
        // white space is left in
        if(goodDataResultArr[1] !== 'fire, air, sm o ke'){
            throw new BadOutputError(`Extra whitespace check failed. Got this instead:\n` +
                `'${goodDataResultArr[1]}'`);
        }

        // Check if everything is lower case
        if(goodDataResultArr[2] !== 'water, fire, steam'){
            throw new BadOutputError(`Lower case check failed. Got this instead:\n` +
                `'${goodDataResultArr[2]}'`);
        }

        // Check if the special symbols are left in
        if(goodDataResultArr[3] !== '(e@rth), \'w$t + l!qúid\', &m%d'){
            throw new BadOutputError(`Special chatacter check failed (They should be in there).` +
                ` Got this instead:\n'${goodDataResultArr[3]}'`);
        }

        // Check if double enters are properly filtered out
        if(goodDataResultArr.length !== 6 || goodDataResultArr[4] !== 'fire, earth, lava'){
            throw new BadOutputError(`Double enter check failed. ` +
                `Got this instead:\n'${goodDataResultArr[4]}'\nlength of arr: ` +
                `${goodDataResultArr.length}`);
        }

        // Check if carriage returns (\r) are properly replaced with normal \n enter spaces
        if(goodDataResultArr[5] !== 'water, water, pond'){
            throw new BadOutputError(`Carriage return check failed. ` +
                `Got this instead:\n'${goodDataResultArr[5]}'`);
        }

        // There wasn't an error, so it passed the unit test!
        console.log('Test test_convertGoodComboStrToStrArr passed! :)');

    }catch(e) {

        if(e instanceof BadOutputError === true){

            console.log('test_convertComboStrToStrArr test failed due to a bad output.');
            console.log(e.message);

        } else {
            console.log('test_convertComboStrToStrArr test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);

        }

    }//catch

}//test_convertComboStrToStrArr

/**
 * Test questions:
 *  - Did the trim work?
 *  - Are names actually being assigned to ids? (check if empty)
 *  - Are ids being assigned correctly?
 *  - Are there duplicates of any names?
 */
function test_createNameToIdMap() {

    const comboTxtArr: string[] = [
        'fire, water, steam', 
        'water, earth, mud'
    ]

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
    const nameToIdMap: Map<string, number> = TextToHashMaps.createNameToIdMap(comboTxtArr);

    // This is a toggle for printing the map if needed
    let printMap: boolean = false;

    try {

        if (nameToIdMap.size == null || nameToIdMap.size === 0) {
            throw new BadOutputError('Empty map check failed.');
        }

        // For future tests, print the map if there's a bad output failure
        printMap = true;

        if (nameToIdMap.size !== 5) {
            throw new BadOutputError(`Size check failed. The size of the map was ` +
                `expected to be 5, but is this instead: ${nameToIdMap.size}`);
        }
    
        if (nameToIdMap.has('fire') === false){
            throw new BadOutputError('Trim check failed.');
        }
    
        if (nameToIdMap.get('steam') !== 3) {
            throw new BadOutputError('Id check failed. The element \'steam\' was expected ' +
                'to have an id of 3');
        }

        // There wasn't an error, so it passed the unit test!
        console.log('Test test_createNameToIdMap passed! :)');

    } catch (e) {

        if (e instanceof BadOutputError) {

            console.log('test_convertComboStrToStrArr test failed due to a bad output.');
            console.log(e.message);

            if (printMap === true) {
                nameToIdMap.forEach(printTestMap);
            }

        } else {
            console.log('test_convertComboStrToStrArr test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
        }

    }// catch

}//test_createNameToIdMap

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
    const debugIdToObjMap: Map<number, ComboElement> = new Map<number, ComboElement>();

    // populate the debug map with a test element (Only doing 2 elements since the
    // rest of the child elements will just check parent pairs)

    // test alternate parent combo for rock
    //const debugRockElem = new ComboElement(5, 'rock', new ParentPair(4, 3), 2);
    // test cyclical combo for earth
    const debugEarthElem = new ComboElement(1, 'earth', null, 0);

    // debugIdToObjMap.set(5, debugRockElem);
    debugIdToObjMap.set(1, debugEarthElem);

    try {

        // Check that a new element of id 3 was added to the idToObjMap
        TextToHashMaps.handleChildElements('mud', 3, new Array<number>(1, 2), 
        new Array<number>(0,0), debugIdToObjMap);

        if (debugIdToObjMap.has(3) === false) {
            throw new BadOutputError('Add new element to idToObjMap check failed. ' 
                + 'Id could not be found.');
        }

        // Check that the added new element's contents are correct
        const shouldBeMud: ComboElement = debugIdToObjMap.get(3);

        if (shouldBeMud.name !== 'mud' || shouldBeMud.parentPairs[0].get(0) !== 1 
            || shouldBeMud.parentPairs[0].get(1) !== 2 || shouldBeMud.rowNumber != 1){
                throw new BadOutputError(`Add new element to idoObjMap check failed. ` +
                    `Expected element ('mud', id = 3, pPair = [1, 2], rowNum = 1), but ` +
                    `got this instead: \n${shouldBeMud.getComboElementAsStr(false)}`);
            }

        // Test if the row increment is working
        TextToHashMaps.handleChildElements('rock', 5, new Array<number>(4, 3), 
        new Array<number>(0,1), debugIdToObjMap);

        if (debugIdToObjMap.get(5).rowNumber != 2) {
            throw new BadOutputError(`New element rowNum increment check failed. Expected ` +
                `rowNumber = 2, but got a rowNumber = ` + 
                `${debugIdToObjMap.get(5).rowNumber} instead.` + 
                `Pairs: ${debugIdToObjMap.get(5).getParentPairsAsStr(false)}`);
        }

        // Test alternate parent combo
        TextToHashMaps.handleChildElements('rock', 5, new Array<number>(3, 1), 
        new Array<number>(0,1), debugIdToObjMap);

        const rockParentPairs = debugIdToObjMap.get(5).parentPairs;

        if (rockParentPairs.length != 2 || rockParentPairs[1].get(0) != 3 || 
            rockParentPairs[1].get(1) != 1) {
            throw new BadOutputError(`Alternate parent combo check failed. Expected ` +
                `parentPairs = { [4, 3], [3, 1] }, but got this instead: ` + 
                `${debugIdToObjMap.get(5).getParentPairsAsStr(false)}`);
        }

        // Test cyclical combo
        TextToHashMaps.handleChildElements('earth', 1, new Array<number>(5, 3), 
        new Array<number>(2,1), debugIdToObjMap);

        if(debugIdToObjMap.get(1).cyclicalParentPairs == null) {
            throw new BadOutputError(`Cyclical parent check failed. The cyclicalParent ` +
                `array is empty.`);
        }

        if(debugIdToObjMap.get(1).cyclicalParentPairs.length !== 1) {
            throw new BadOutputError(`Cyclical parent check failed. The cyclicalParent ` +
                `array is expected to have one pair, but it has ` +
                `${debugIdToObjMap.get(1).cyclicalParentPairs.length} pairs instead.` +
                `Pairs: ${debugIdToObjMap.get(5).getParentPairsAsStr(true)}`);
        }

        if(debugIdToObjMap.get(1).cyclicalParentPairs[0].get(0) != 5 || 
            debugIdToObjMap.get(1).cyclicalParentPairs[0].get(1) != 3 ) {
            throw new BadOutputError(`Cyclical parent check failed. Expected cyclical ` +
                `parent pair {[5, 3]}, but is ` +
                `${debugIdToObjMap.get(1).getParentPairsAsStr(true)} instead.`);
        }

        // Test reduced rowNum
        const debugBoilElem = new ComboElement(6, 'boil', new ParentPair(4,2), 1);
        debugIdToObjMap.set(6, debugBoilElem);

        TextToHashMaps.handleChildElements('lava', 7, new Array<number>(6, 5), 
        new Array<number>(1,2), debugIdToObjMap);

        TextToHashMaps.handleChildElements('lava', 7, new Array<number>(4, 1), 
        new Array<number>(0,0), debugIdToObjMap);

        if(debugIdToObjMap.get(7).rowNumber != 1 ) {
            throw new BadOutputError(`Reduced rowNumber check failed. Expected lava ` +
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

    } catch (e) {

        if (e instanceof BadOutputError) {

            console.log('test_handleChildElements test failed due to a bad output.');
            console.log(e.message);

        } else {
            console.log('test_handleChildElements test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
            console.log(e.stack);
        }

    } //catch

}// test_handleChildElements

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

        const comboTxtArr: string[] = [
            'fire, water, steam', 
            'water, steam, cloud',
        ];

        // Test if the method throws a BadOutputError for passing in an empty map
        const emptyNameMap = new Map<string, number>();

        try {

            // This should throw a BadInputError. 
            TextToHashMaps.createIdToObjMap(comboTxtArr, emptyNameMap);

            // An error wasn't thrown from the method, but it should have.
            // Throw a bad output error because this test has failed.
            throw new BadOutputError('Empty map error check failed. A BadInputError was ' +
            'expected, but never thrown.');

        // Catch the expected error. If it's a BadInputError as expectd, nothing happens
        // and the test moves on. But if a different error is thrown, that will fail the test. 
        } catch (emptyTestError) {

            // Throw the unexpected error as is.
            if ((emptyTestError instanceof BadInputError) === false) {
                throw emptyTestError;
            }
        }

        // Set up for the next few rounds of testing
        const debugNameToIdMap = new Map<string, number>();
        debugNameToIdMap.set('fire', 1);
        debugNameToIdMap.set('water', 2);
        debugNameToIdMap.set('steam', 3);
        debugNameToIdMap.set('cloud', 4);
        

        let newIdToObjMap: Map<number, ComboElement> = 
            TextToHashMaps.createIdToObjMap(comboTxtArr, debugNameToIdMap);

        // Check if the newIdToObj map is empty
        if (newIdToObjMap == null || newIdToObjMap.size === 0) {
            throw new BadOutputError('Empty map check failed. The newIdToObj map is empty.');
        }

        // Check to see if the base element water was created correctly
        if (newIdToObjMap.has(2) === false) {
            throw new BadOutputError('Add parent base element check failed. Could not find ' +
                'requested element that should exist.');
        }

        const shouldBeWater: ComboElement = newIdToObjMap.get(2);

        if (shouldBeWater.name !== 'water' || shouldBeWater.parentPairs !== null){
            throw new BadOutputError(`Add parent base element check failed. Element with` +
            `id 2 was expected to be water with null parentPairs, but got this instead:\n` +
            `${shouldBeWater.getComboElementAsStr}`);
        }

        // This check is important, even though it checks the handle child elements method.
        // Failing this check would imply something went wrong with that method
        if (newIdToObjMap.size !== 4) {
            throw new BadOutputError(`map size check failed. Expected a size of 4, but got ` +
                `${newIdToObjMap.size} instead.`);
        }

        // Test double children. If added corrctly, both children will be on the map

        // Add entry -> 'cloud, water, rain, storm'
        comboTxtArr.push('cloud, water, rain, storm');
       
        // Add nameToId entries rain and storm
        debugNameToIdMap.set('rain', 5);
        debugNameToIdMap.set('storm', 6);

        newIdToObjMap = TextToHashMaps.createIdToObjMap(comboTxtArr, debugNameToIdMap);

        if (newIdToObjMap.size !== 6) {
            throw new BadOutputError(`Double child check failed. Expected a size of 6, but ` +
                `got ${newIdToObjMap.size} instead.`);
        }

        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_createIdToObjMap passed! :)');

    } catch (e) {

        if (e instanceof BadOutputError) {

            console.log('test_createIdToObjMap test failed due to a bad output.');
            console.log(e.message);

        } else {
            console.log('test_createIdToObjMap test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
            console.log(e.stack);
        }

    }//catch

} //test_createIdToObjMap

/**
 * This function is to lazily write out a hash map for unit testing 
 * 
 * @param value any 
 * @param key any
 * @param map Map<any, any> 
 */
function printTestMap(value: any, key: any, map: Map<any, any>) {

    console.log(`key: ${key}\nvalue: ${value}`);

}//print test map

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
    const emptyIdToObjMap = new Map<number, ComboElement>();

    try {

        // This should throw a BadInputError. 
        TextToHashMaps.createRowToIdsMap(emptyIdToObjMap);

        // An error wasn't thrown from the method, but it should have.
        // Throw a bad output error because this test has failed.
        throw new BadOutputError('Empty map error check failed. A BadInputError was ' +
        'expected, but never thrown.');

    // Catch the expected error. If it's a BadInputError as expectd, nothing happens
    // and the test moves on. But if a different error is thrown, that will fail the test. 
    } catch (emptyTestError) {

        // Throw the unexpected error as is.
        if ((emptyTestError instanceof BadInputError) === false) {
            throw emptyTestError;
        }
    }

    // Create a debug idToObj map
    const debugIdToObjMap: Map<number, ComboElement> = new Map<number, ComboElement>();
    debugIdToObjMap.set(1, new ComboElement(1, 'fire', null, 0));
    debugIdToObjMap.set(2, new ComboElement(2, 'water', null, 0));
    debugIdToObjMap.set(3, new ComboElement(3, 'steam', new ParentPair(1, 2), 1));
    debugIdToObjMap.set(4, new ComboElement(4, 'earth', null, 0));
    debugIdToObjMap.set(5, new ComboElement(5, 'mud', new ParentPair(2, 4), 1));

    // This is a toggle for printing the map if needed
    let printMap: boolean = false;

    // Create the actual test map
    const rowToIdsMap = TextToHashMaps.createRowToIdsMap(debugIdToObjMap);

    try {

        if (rowToIdsMap.size == null || rowToIdsMap.size === 0) {
            throw new BadOutputError('Empty map check failed.');
        }

        if (rowToIdsMap.size !== 2) {
            throw new BadOutputError(`Size check failed. The size of the map (number of ` +
                ` rows) was expected to be 2, but is this instead: ${rowToIdsMap.size}`);
        }
    
        if (rowToIdsMap.get(0) == null || rowToIdsMap.get(0).length == 0) {
            throw new BadOutputError('Id array check failed. The id array at row 0 is empty');
        }

        // Print the map if future tests fail
        printMap = true;

        if (rowToIdsMap.get(0)[2] !== 4) {
            throw new BadOutputError(`Id array check failed. The id 4 (earth) at row 0, ` +
                `index 2 was expected, but got id ${rowToIdsMap.get(0)[2]} instead`);
        }

        if (rowToIdsMap.get(0).length !== 3 || rowToIdsMap.get(1).length !== 2) {
            throw new BadOutputError(`Id array check failed. The size of rows 0 and 1 ` + 
                `were expected to be 3 and 2 respectively, but are ` +
                `${rowToIdsMap.get(0).length} and ${rowToIdsMap.get(1).length} instead.`);
        }

        // There wasn't an unexpected error, so it passed the unit test!
        console.log('Test test_createRowToIdsMap passed! :)');

    } catch (e) {

        if (e instanceof BadOutputError) {

            console.log('test_createRowToIdsMap test failed due to a bad output.');
            console.log(e.message);

            if (printMap === true) {
                rowToIdsMap.forEach(printTestMap);
            }

        } else {
            console.log('test_createRowToIdsMap test failed due to an unknown error.');
            console.log(e.type);
            console.log(e.message);
        }

    }// catch

}//test_createNameToIdMap