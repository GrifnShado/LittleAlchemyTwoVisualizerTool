
import { ComboMap } from "./base_files/combo_map";
import { convertTxtFileDataToStr } from "./generate_combo_map/file_to_data_str";

// Notify the programmer their code won't work or break until they
// actually upload the combos txt file
console.log("To get started, upload the combos file!");

// Important objects

let comboMap: ComboMap = null;
let combosStr = '';

// Create an event for when someone uploads a file to the
// getComboFile input tag
const combosFile: HTMLElement = document.getElementById('getComboFile');
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

    combosStr = await convertTxtFileDataToStr(this);

    // Now the main code of the program is ready to run!
    main();

}//extractComboFileTextEvent




function main() {

    // Now that my file is ready, create the combo map!
    comboMap = new ComboMap(combosStr);
    
    // // Now that my file is ready, convert the text to data!
    // combosInMemory = new CombosInMemory(combosStr);

    // Create the map

    // graphMap = new ComboMap(combosInMemory.idToElementObjMap,
    //     combosInMemory.rowNumToIdMap);

    //graphMap = new ComboMap();

}//main

