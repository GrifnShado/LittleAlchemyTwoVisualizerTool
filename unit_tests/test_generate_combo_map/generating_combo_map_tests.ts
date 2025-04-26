import { ComboElement } from "../../src/base_files/combo_element";
import { DebugComboMap } from "../debug_objects/debug_combo_map";
import { ParentPair } from "../../src/base_files/combo_element";
import { BadOutputError } from "../../src/other/custom_errors";


// Toggle fxn
export function toggleGeneratingComboMapTests(doAll: boolean){

    if(doAll === true){
        console.log('running ComboMap (generation) tests...');
        test_updateComboRelations();
    }

}//toggleTests

/**
 * questions:
 *  - For the basic combo, does mud have earth and water in its childOf set?
 *      - Do water and earth have mud in their parentOf sets?
 *  - For alternate parents, does rock have fire and mud in its childOf set?
 *      - Do fire and mud have rock in their parentOf sets?
 *  - For cyclical parents, does mud have rock and itself in its cyclical childOf set?
 *      - Do rock and mud have mud in their cyclical parentOf sets?
 */
function test_updateComboRelations(){

    /* --------------------------------- SET UP  --------------------------------- */

    //     'earth, water, mud' // basic combo
    //     'fire, earth, rock' // parent combo
    //     'fire, mud, rock' // second parent combos
    //     'water, mud, mud' // cyclical combo
    //     'rock, water, mud' // second cyclicl combo

    try {

        // Create a debugIdToObj map
        const debugIdToObjMap: Map<number, ComboElement> = new Map<number, ComboElement>;

        // Create the five uniqe elements for the debug map
        debugIdToObjMap.set(1, new ComboElement(1, 'earth', null, 0));
        debugIdToObjMap.set(2, new ComboElement(2, 'water', null, 0));
        debugIdToObjMap.set(3, new ComboElement(3, 'mud', new ParentPair(1, 2), 1));
        debugIdToObjMap.set(4, new ComboElement(4, 'fire', null, 0));
        debugIdToObjMap.set(5, new ComboElement(5, 'rock', new ParentPair(4, 1), 1));

        // second parent combo for rock
        debugIdToObjMap.get(5).addParentPair(new ParentPair(4, 3));

        // cyclical combos for mud
        debugIdToObjMap.get(3).addCyclicalParentPair(new ParentPair(2, 3));
        debugIdToObjMap.get(3).addCyclicalParentPair(new ParentPair(5, 2));

        // Create a debugComboMap
        const debugComboMap = new DebugComboMap();

        // Add the debug idToObjMap
        debugComboMap.setIdToObjMap(debugIdToObjMap);

        // Now run the method
        debugComboMap.updateComboElementRelations();

        // This simplifys things for the tests
        const earthElem: ComboElement = debugIdToObjMap.get(1);
        const waterElem: ComboElement = debugIdToObjMap.get(2);
        const mudElem: ComboElement = debugIdToObjMap.get(3);
        const fireElem: ComboElement = debugIdToObjMap.get(4);
        const rockElem: ComboElement = debugIdToObjMap.get(5);

    /* --------------------------------- TESTS  ---------------------------------- */

        // Basic combo
        if ((mudElem.childOf.has(1) && mudElem.childOf.has(2)) === false) {
            throw new BadOutputError(`Basic combo check failed. Expected ids 1 and 2 ` +
                `in mud's childOf set, but got this instead: ` +
                `${mudElem.setToString(mudElem.childOf)}`);
        }

        if ((earthElem.parentOf.has(3) && waterElem.parentOf.has(3)) === false) {
            throw new BadOutputError(`Basic combo check failed. Expected id 3 in ` +
                `earth and water's parentOf sets, but got this instead: ` +
                `{${earthElem.setToString(earthElem.parentOf)}}, ` + 
                `${waterElem.setToString(waterElem.parentOf)}}`);
        }

        // Alternate parent combo
        if ((rockElem.childOf.has(4) && rockElem.childOf.has(3)) === false) {
            throw new BadOutputError(`Alternate parent combo check failed. Expected  ` +
                `ids 4 and 3 in rock's childOf set, but got this instead: ` +
                `${rockElem.setToString(rockElem.childOf)}`);
        }

        if ((fireElem.parentOf.has(5) && mudElem.parentOf.has(5)) === false) {
            throw new BadOutputError(`Alternate parent combo check failed. Expected ` +
                `id 5 in fire and mud's parentOf sets, but got this instead: ` +
                `{${fireElem.setToString(fireElem.parentOf)}}, ` +
                `${mudElem.setToString(mudElem.parentOf)}}`);
        }

        // Cyclicl combo
        if ((mudElem.cyclicalChildOf.has(5) && mudElem.cyclicalChildOf.has(3)) === false) {
            throw new BadOutputError(`Cyclical combo check failed. Expected ids 5 and 3 ` +
                `in mud's cyclicalChildOf set, but got this instead: ` +
                `${mudElem.setToString(mudElem.cyclicalChildOf)}`);
        }

        if ((rockElem.cyclicalParentOf.has(3) && mudElem.cyclicalParentOf.has(3)) === false) {
            throw new BadOutputError(`Cyclical combo check failed. Expected id 3 in rock ` +
                `and mud's cyclicalParentOf sets, but got this instead: ` +
                `{${rockElem.setToString(rockElem.cyclicalParentOf)}}, ` +
                `${mudElem.setToString(mudElem.cyclicalParentOf)}}`);
        }

        // There wasn't an error, so it passed the unit test!
        console.log('Test test_updateComboRelations passed! :)');

    } catch (e) {

        if (e instanceof BadOutputError) {

        console.log('test_updateComboRelations test failed due to a bad output.');
        console.log(e.message);

        // if (printMap === true) {
        //     rowToIdsMap.forEach(printTestMap);
        // }

        } else {
            console.log('test_updateComboRelations test failed due to an unknown error.');
            //console.log(e.type);
            //console.log(e.message);
            console.log(e.stack);

        }

    }

}// test_updateComboRelations

/**
 * No idea how to write a unit test for this, so I will uh just print it and see if it's right!
 * (Since these print functions can have semantic changes, a user test that looks for exact
 * strings seems dumb to me)
 */
export function printMapMethodTesting() {

    /**
     * water, fire, steam
     * earth, water, mud
     * air, air, pressure
     * mud, pressure, rock
     */

    // make debug maps
    const debugNameToIdMap: Map<string, number> = new Map<string, number>();
    debugNameToIdMap.set('water', 1);
    debugNameToIdMap.set('fire', 2);
    debugNameToIdMap.set('steam', 3);
    debugNameToIdMap.set('earth', 4);
    debugNameToIdMap.set('mud', 5);
    debugNameToIdMap.set('air', 6);
    debugNameToIdMap.set('pressure', 7);
    debugNameToIdMap.set('rock', 8);

    const debugIdToObjMap: Map<number, ComboElement> = new Map<number, ComboElement>();
    debugIdToObjMap.set(1, new ComboElement(1, 'water', null, 0));
    debugIdToObjMap.set(2, new ComboElement(2, 'fire', null, 0));
    debugIdToObjMap.set(3, new ComboElement(3, 'steam', new ParentPair(1, 2), 1));
    debugIdToObjMap.set(4, new ComboElement(4, 'earth', null, 0));
    debugIdToObjMap.set(5, new ComboElement(5, 'mud', new ParentPair(4,1), 1));
    debugIdToObjMap.set(6, new ComboElement(6, 'air', null, 0));
    debugIdToObjMap.set(7, new ComboElement(7, 'pressure', new ParentPair(6,6), 1));
    debugIdToObjMap.set(8, new ComboElement(8, 'rock', new ParentPair(5, 7), 2));

    const debugRowToIdsMap: Map<number, number[]> = new Map<number, number[]>();
    debugRowToIdsMap.set(0, [1, 2, 4, 6]);
    debugRowToIdsMap.set(1, [3,5,7]);
    debugRowToIdsMap.set(2, [8]);

    // Make debug ComboMap
    const debugComboMap = new DebugComboMap();

    // try the method, hope for the best
    console.log('Debugging the print map method in ComboMap');
    console.log(debugComboMap.getElementMapAsStr(debugNameToIdMap));
    console.log(debugComboMap.getElementMapAsStr(debugIdToObjMap));
    console.log(debugComboMap.getElementMapAsStr(debugRowToIdsMap));

}//printMethodTesting