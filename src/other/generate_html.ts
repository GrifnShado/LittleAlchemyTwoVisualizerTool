// The first function I want to add is the "show list" fxn. This will create a pop-up window with the full list of combinations.
// You can then close the window.

/**
//      * Prints the combos from #comboList into the HTML div
//      */
//     printCombosToCombosDisplayDiv() {

//         // Get the div
//         const combosDisplayDiv = document.getElementById('combosDisplay');
//         // Clear the div
//         while (combosDisplayDiv.firstChild != null) {
//             combosDisplayDiv.removeChild(combosDisplayDiv.lastChild);
//         }

//         // Now populate the div with the new information
//         for (const combo of this.#comboList) {

//             let childToAdd = document.createElement('p');
//             childToAdd.innerHTML = combo.toString();
//             combosDisplayDiv.appendChild(childToAdd);

//         }//for-of

//     }//printCombosToDiv

