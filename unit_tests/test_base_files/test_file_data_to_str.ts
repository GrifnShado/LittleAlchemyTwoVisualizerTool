//yada yada

import { convertTxtFileDataToStr } from "../../src/generate_combo_map/file_to_data_str";
import { BadOutputError } from "../../src/other/custom_errors";

// Toggle fxn
export function toggleFileDataToStrTest(doTest: boolean){

    if(doTest === true){
        console.log('The file data to string test is ready.\n' +
            'To run the test, input \'test_combos.txt\' ');
        test_convertFileTxtToStr();
    }

}//toggleTests

/**
 * Yes. I am insane.
 */
export function test_convertFileTxtToStr(){

    // Note: I DO NOT use the file stream. Turns out, a browser won't allow
    // you to modify files inside of it- which, in retrospect, makes sense
    // because it would all be in one bundle.js file anyway. So the
    // test_combos.txt file is ONLY for this unit test. (And thus there will
    // be no file writing to be)

    // Get the input tag
    const combosFileInput: HTMLElement = document.getElementById('getComboFile');

    // Enable the tag to indicate it is being tested
    // I need to cast it for it to work because HTML is awesome
    (combosFileInput as HTMLInputElement).disabled = false;

    // Create an event for when someone uploads a file to the
    // getComboFile input tag
    combosFileInput.addEventListener('change', test_helper_changeEvent);

}//test_convertFileTxtToStr

/**
 * 
 * The input element in the test html file needs to be clicked on to run 
 * the actual test, hence this fxn.
 * 
 * @param e The change event. Don't ask me what the type is. I tried. I couldn't
 * figure it out. ;_;
 */
export async function test_helper_changeEvent(){

    try {

        // run the file here...
        const outStr: string = await convertTxtFileDataToStr(this);

        // If outStr is null or basically null, something went wrong. It could
        // be a file issue or it didn't actually draw any text. The provided test
        // text file is NOT EMPTY, so that wouldn't be the issue.
        if (outStr == null || outStr === '') {
            throw new BadOutputError('The conversion file completed, but the output string is null or empty.');
        }

        // There wasn't an error, so it passed the unit test!
        console.log('Test test_helper_changeEvent passed! :)');

    } catch (e: any){

        if (e instanceof BadOutputError) {
            // Test failure: bad output error
            console.log('Test failure in test_helper_changeEvent, the error is a BadOutputError.');
            console.log(e.message);
        } else {
            // Test failure: unknown error
            console.log('Test failure in test_helper_changeEvent, the error is unknown.');
            console.log(e.name);
            console.log(e.message);
        }

    }// try-catch

}//test_helper_changeEvent