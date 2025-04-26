/**
 * One of those "this only exists b/c I need to unit test it" fxns
 * Note that I have to pass in "this", the event function (?), for
 * e. I don't understand, why is JavaScript so jank...
 * 
 * Also moved to a seprate file because I don't want my unit tests
 * running my main script.
 */
export async function convertTxtFileDataToStr(e: any){

    // Save the file as a var for readability
    const fileList = e.files;
    const comboFile: File = fileList[0];

    // So I can return the string for unit testing
    let returnStr: string = '';

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

}//convertTxtFileDataToStr