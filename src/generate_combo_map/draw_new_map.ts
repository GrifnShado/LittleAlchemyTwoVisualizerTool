// // JavaScript source code

// // Create a graphology graph
// const graph = new graphology.Graph();

// //demo();

// // I guess for now, color code anything from row 0 to x, row 1 to x, etc.

// // Instantiate sigma.js and render the graph
// const sigmaInstance = new Sigma(graph, document.getElementById("container"));

// // Jokes on me, they want me to be using Type Script all along

// function demo() {

//     graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "red" });
//     graph.addNode("2", { label: "Node 2", x: 1, y: 0, size: 10, color: "blue" });
//     graph.addNode("3", { label: "Node 3", x: 0, y: -1, size: 10, color: "green" });
//     graph.addNode("4", { label: "Node 4", x: 1, y: -1, size: 10, color: "gold" });
//     graph.addNode("5", { label: "Node 5", x: 2, y: -2, size: 10, color: "turquoise" });
//     graph.addNode("6", { label: "Node 6", x: 0, y: -2, size: 10, color: "maroon" });
//     graph.addNode("7", { label: "Node 7", x: 1, y: -2, size: 10, color: "forestgreen" });

//     graph.addEdge("1", "3", { size: 5, color: "black" });
//     graph.addEdge("2", "3", { size: 5, color: "black" });
//     graph.addEdge("1", "4", { size: 10, color: "black" });
//     graph.addEdge("1", "7", { size: 5, color: "black" });
//     graph.addEdge("2", "5", { size: 5, color: "black" });

//     graph.addEdge("4", "6", { size: 10, color: "pink" });
//     graph.addEdge("3", "7", { size: 5, color: "pink" });
//     graph.addEdge("3", "5", { size: 5, color: "pink" });

// } // demo

// function drawComboMap(idToObjMap, rowsMap, childConstraints,
//     alignmentConstraints, rowToPdxMap, totalElements) {

//     /* ============================== */
//     /* ====== PART 1: THE DOTS ====== */
//     /* ============================== */

//     let elementCount = 1;
//     let rowIncrement = 0;

//     /**
//      * x position map (ElemId, x pos)
//      */
//     const xPositionMap = new Map();

//     //debug
//     console.log("I'm in the drawComboMap fxn, right???");
//     console.log(`ElementCount: ${elementCount}, Total elements: ${totalElements}`);

//     // First, plot out all of the points
//     while (elementCount <= totalElements) {

//         // debug
//         console.log(`elementCount: ${elementCount}`);

//         // determine the x position for the row vars
//         const xSlotArr = [];
//         // map is (id, x position)
//         //const xSlotMap = new Map();
//         // Set to -1 since the fxn automatically adds one to it, and I want to use x = 0 if I can
//         let smallestXAvalible = -1;

//         // This needs to be its own fxn
//         // Before diving into the main process, I need to get any paradox elements out of the way
//         if (rowToPdxMap.has(rowIncrement) == true) {

//             for (pdxId of rowToPdxMap.get(rowIncrement)) {

//                 // Get the element
//                 const pdxElemObj = idToObjMap.get(pdxId);

//                 //debug
//                 console.log("pdxElemObj:");
//                 console.log(pdxElemObj);

//                 // Check its parent pair to get its parent
//                 // Note: a pdx element should only have ONE parent pair with the parent id as
//                 // the first element
//                 // chain: obj -> parentIdArr (parent pairs arr) -> first parent pair -> 
//                 // pair (arr of two ids) -> first id (the parent)
//                 const parentId = pdxElemObj.parentPairIds[0].pair[0];

//                 // Find the placement OF that parent (Seeing the value of the xSlotMap now...)
//                 const parentPos = xPositionMap.get(parentId);

//                 // Put that either to the right or the left of the parent... or really right
//                 // of the parent in case there are multiple paradox pairs

//                 let pdxPos = 0;

//                 //check if the left spot is taken
//                 if (parentPos > 1 && xSlotArr[parentPos - 1] == null) {

//                     pdxPos = parentPos - 1;

//                 // now check if the immediate right spot is taken
//                 } else if (xSlotArr[parentPos + 1] == null) {

//                     pdxPos = parentPos + 1;

//                     // Now just keep going until I can find a spot...
//                 // WARNING: I NEED TO MAKE SURE THE PDX POINT FOLLOWS MOD CONSTRAINTS
//                 } else {

//                     // Blehhhh....

//                     // Get the pdx point's child constraint
//                     // map -> constr pair -> modList -> first (and only) index
//                     pdxMod = childConstraints.get(pdxId).modList[0];

//                     // Then go through the xSlotArr. I want it close-ish to the parent, and I
//                     // don't want to go to the left because then I could hit the beginning of
//                     // the array and get stuck
//                     pdxPos = smallestAvalibleXCoord((parentPos + 1), xSlotArr);

//                     // Now do mod checks until it works

//                     // safety
//                     let tooManyLoops = 0;
//                     const tooManyLoopsLimit = 1000;

//                     while (tooManyLoops < tooManyLoopsLimit) {

//                         if (pdxPos % pdxMod !== 0) {
//                             //found it!
//                             break;
//                         } else {
//                             pdsPos = smallestAvalibleXCoord(pdxPos, xSlotArr);
//                             tooManyLoops++;
//                         }

//                     }//while

//                 }// calculate the pdx position

//                 // Note: positioning the child element is pretty pointless since without the
//                 // paradox element, it will end up wherever it would have been given normal
//                 // constraints.

//                 // Save the slot in the xSlotsArr and xSlotsMap
//                 xSlotArr[pdxPos] = pdxId;
//                 xPositionMap.set(pdxId, pdxPos);

//                 // Now lay down the pdx element
//                 // For now, the label will be "pdx" until I change it later. Since all of the element ids are unique,
//                 // I'll just use the pdx elem id instead of the elem count var

//                 graph.addNode(pdxId.toString(), { label: 'pdx', x: pdxPos, y: (rowIncrement * -1), size: 5, color: 'magenta' });

//             }//for-of pdxId

//         } // if pdx elems exists in row

//         for (const elementId of rowsMap.get(rowIncrement)) {

//             const name = idToObjMap.get(elementId).name;

//             /* ----- Now for the nerd part ----- */

//             let xCoord = 0;

//             // Update the smallestXAvalible. Saving the previous smallestX saves time
//             smallestXAvalible = smallestAvalibleXCoord(smallestXAvalible, xSlotArr);

//             // Read the constraints time!
//             xCoord = determineXCoord(elementId, childConstraints, alignmentConstraints, xSlotArr, xPositionMap,
//                 smallestXAvalible);

//             // Now update the xSlot arr and map!
//             xSlotArr[xCoord] = elementId;
//             xPositionMap.set(elementId, xCoord);

//             // Now draw the node!
//             graph.addNode(elementId.toString(), { label: name, x: xCoord, y: (rowIncrement * -1), size: 12, color: 'black' });

//             // Next element!
//             elementCount++;

//         }//for-of

//         rowIncrement++;

//     } //while


//     /* =============================== */
//     /* ====== PART 2: The Lines ====== */
//     /* =============================== */

//     // So now I go through each element's parent pairs and draw lines!

//     // TODO: iterate through the obj map, need to get an iterator

//     const edgeThickness = 3;
//     const doubleParentEdgeThickness = 5;


//     const iterator = idToObjMap.keys();
//     let key = iterator.next().value;

//     //debug
//     console.log(`idToObjMap.size = ${idToObjMap.size}`);

//     while (key != null) {

//         // Get the element
//         const elem = idToObjMap.get(key);

//         //debug

//         console.log(`elem.id: ${elem.id}`);

//         //if (elem.id === 4) {
//         //    return;
//         //}

//         if (elem.id === 1) {
//             console.log(`water, id 1:`);
//             console.log(elem);
//         }

//         if (elem.id === 12) {
//             console.log(`earthquake, id 12:`);
//             console.log(elem);
//         }

//         // First draw parent pairs

//         if (elem.parentPairIds[0] != null || elem.parentPairIds.length === 0) {

//             // A set useful for weeding out duplicate parents
//             // This will prevent duplicate drawn lines
//             // This is better than the childrenOf arr so I can draw
//             // double lines
//             const parentIdSet = new Set();

//             for (const pPair of elem.parentPairIds) {

//                 //debug
//                 //console.log(`elemId: ${elem.id}, elem.parentPairIds\n`);
//                 //console.log(elem.parentPairIds);

//                 // check for double parents
//                 if (pPair.pair[0] === pPair.pair[1]) {

//                     // WARNING: Didn't think of this until now. A parent can
//                     // be both a double and single line to an element. I'm...
//                     // not going to bother now...
//                     if (parentIdSet.has(pPair.pair[0]) === false) {
//                         parentIdSet.add(pPair.pair[0]);
//                     }

//                     // Row of parent
//                     const parentRowNum = idToObjMap.get(pPair.pair[0]).rowNumber;
//                     const edgeColor = getRowColor(parentRowNum);

//                     // debug
//                     if (elem.id === 12) {
//                         console.log(`earthquake, id 12. Double parent.\n` +
//                             `pPair.pair[0]: ${pPair.pair[0]}, pPair.pair[1]: ${pPair.pair[1]}`);
//                     }

//                     // draw a thick line
//                     graph.addEdge(pPair.pair[0].toString(), elem.id.toString(),
//                         { size: doubleParentEdgeThickness, color: edgeColor });

//                     // Next pair
//                     continue;
//                 }

//                 // Normal parent

//                 // Draw the first parent, if it hasn't been drawn yet
//                 if (parentIdSet.has(pPair.pair[0]) === false) {

//                     // Add to set
//                     parentIdSet.add(pPair.pair[0]);

//                     // Row of parent
//                     const parentRowNum = idToObjMap.get(pPair.pair[0]).rowNumber;
//                     const edgeColor = getRowColor(parentRowNum);

//                     //console.log(`edgeColor ${edgeColor} is typeof ${typeof edgeColor}`);

//                     //debug
//                     if (elem.id === 12) {
//                         console.log(`earthquake, id 12. First parent of parent pair drawn.\n` +
//                         `pPair.pair[0]: ${pPair.pair[0]}`);
//                     }

//                     // draw a normalline
//                     graph.addEdge(pPair.pair[0].toString(), elem.id.toString(),
//                         { size: edgeThickness, color: edgeColor });
                    
//                 }

//                 // Check if the other parent is a paradox slot. If so,
//                 // skip it
//                 if (pPair.pair[1] === -1) {
//                     continue;
//                 }

//                 // Draw the second parent, if it hasn't been drawn yet
//                 if (parentIdSet.has(pPair.pair[1]) === false) {

//                     // Add to set
//                     parentIdSet.add(pPair.pair[1]);

//                     // Row of parent
//                     const parentRowNum = idToObjMap.get(pPair.pair[1]).rowNumber;
//                     const edgeColor = getRowColor(parentRowNum);

//                     //debug
//                     if (elem.id === 12) {
//                         console.log(`earthquake, id 12. Second parent of parent pair drawn.\n` +
//                             `pPair.pair[1]: ${pPair.pair[1]}`);
//                     }

//                     // draw a normalline
//                     graph.addEdge(pPair.pair[1].toString(), elem.id.toString(),
//                         { size: edgeThickness, color: edgeColor });

//                 }

//             }//for of pPair

//         }// if parentPairIds != undefined

//         // Then draw cyclical child lines

//         // NOTE: In the future, I need like a dedicated map...

//         if (elem.cyclicalParentOfArr.length === 0) {

//             // WARNING: I also didn't think about cyclical children
//             // being double parents. Oh well.

//             const cycChildIdSet = new Set();

//             for (cycChildId of elem.cyclicalParentOfArr) {

                
//                 // Draw the edge, if it hasn't been drawn yet
//                 if (cycChildIdSet.has(cycChildId) === false) {

//                     // Add to set
//                     cycChildIdSet.add(cycChildId);

//                     // Row of the element (to make it clear it's going UP)
//                     const elemRowNum = idToObjMap.get(elem.id).rowNum;
//                     const edgeColor = getRowColor(elemRowNum);

//                     // debug
//                     if (elem.id === 12) {
//                         console.log(`earthquake, id 12. CycChild.\n` +
//                             `cycChildId: ${cycChildId}`);
//                     }

//                     // draw a normalline
//                     graph.addEdge(elem.id.toString(), cycChildId.toString(),
//                         { size: edgeThickness, color: edgeColor });

//                 }


//             }//for of cycChildId


//         }//elem.cyclicalParentOfArr != undefined

//         // Now advance the key
//         key = iterator.next().value;


//     } // while key != null




//     // Note: double parents (shown in the parent pair) get a special thicker line

// }//drawComboMap

// /**
//  * A debug fxn for me to check edge connections
//  */
// function getRowColor(rowNum) {

//     let returnColor = '';

//     switch (rowNum) {

//         case 0:
//             returnColor = 'orangered';
//             break;
//         case 1:
//             returnColor = 'orange'
//             break;
//         case 2:
//             returnColor = 'gold';
//             break;
//         case 3:
//             returnColor = 'lime';
//             break;
//         case 4:
//             returnColor = 'turquoise';
//             break;
//         case 5:
//             returnColor = 'dodgerblue';
//             break;
//         case 6:
//             returnColor = 'mediumpurple';
//             break;
//         case 7:
//             returnColor = 'rebeccapurple';
//             break;
//         case 8:
//             returnColor = 'magenta';
//             break;
//         case 9:
//             returnColor = 'saddlebrown';
//             break;
//         default:
//             returnColor = 'gray';
            
//     }//switch

//     return returnColor;

// }//getRowColor

// function determineXCoord(elemId, childConstrMap, alignConstrMap, xSlotArr, xPositionMap, firstAvalibleX) {

//     // First, check if there are any alignment or child constraints. 
//     const hasAlignmentConstraints = alignConstrMap.has(elemId);
//     const hasChildConstraints = childConstrMap.has(elemId);

//     // potential x
//     let potentialXCoord = firstAvalibleX;

//     // failsafe
//     //const oopsieLimit = 1000;
//     //const oopsieLimit = 50;
//     const oopsieLimit = 12;
//     let loopCount = 0;

//     while (true) {

//         // The don't kill my browser safe guard
//         if (loopCount >= oopsieLimit) {
//             throw new Error(`The determineXCoord() fxn hit its loop cap. The parameters are ` +
//                 `the following:\nelemId: ${elemId}, childConstrMap: ${childConstrMap}, ` +
//                 `alignConstrMap: ${alignConstrMap}, xSlotArr: ${xSlotArr}, xPositionMap: ${xPositionMap}, ` +
//                 `firstAvalibleX: ${firstAvalibleX}`);
//         }

//         // First, check alignment constrints (me guessing those will have smaller modulo numbers)
//         if (hasAlignmentConstraints === true && doesPassAlignConstrs(elemId, alignConstrMap, potentialXCoord,
//             xPositionMap) === false) {


//             // Note: If hasAlignmentConstraints is false, then this check gets skipped entirely. From there,
//             // this code is ignored if the alignment constraints work but runs when it fails.

//             // start over the loop
//             potentialXCoord = smallestAvalibleXCoord(potentialXCoord, xSlotArr);
//             loopCount++;
//             continue;

//         }//alignment constraints

//         // Now check the child constraints
//         // Note: if I created a seprate function for this (which I did), you still have to do a check with
//         // the row increment, and now you just have two functions that are basically identical (bad idea).
//         if (hasChildConstraints === true && doesPassChildConstrs(elemId, childConstrMap, potentialXCoord,
//             xPositionMap) === false) {

//             // start over the loop
//             potentialXCoord = smallestAvalibleXCoord(potentialXCoord, xSlotArr);
//             loopCount++;
//             continue;

//         }//child constraints

//         // The element got here, so it passes!
//         break;

//     }//while

//     // Now return the value
//     return potentialXCoord;

// }//determineXCoord


// function doesPassAlignConstrs(elemId, alignConstrMap, potentialXCoord, xPositionMap) {


//     //debug
//     //xPositionMap.forEach(lazyMapForEach);

//     if (elemId === 22) {
//         console.log(`doesPassAlignConstrs?\nelemId: ${elemId}`);
//     }

//     //console.log(`doesPassAlignConstrs?\nelemId: ${elemId}`);


//     // Get the alignmentArr
//     const alignmentArr = alignConstrMap.get(elemId);

//     // Goal: find which modulo values I should ALIGN with
//     // Note: constraint pair- (id | modList)
//     for (const constrPair of alignmentArr) {

//         for (m of constrPair.modList) {

//             // First, get the x position of the element in question
//             const parentPosition = xPositionMap.get(constrPair.id);

//             //debug

//             if (elemId === 22) {
//                 console.log(`potentialXCoord: ${potentialXCoord}, m:${m}, parentPosition: ${parentPosition}`);
//             }

//             //console.log(`potentialXCoord: ${potentialXCoord}, m:${m}, parentPosition: ${parentPosition}`);

//             // If the parent x coord is say 1 mod m, the potential x coord should
//             // also be 1 mod m.
//             if (potentialXCoord % m !== parentPosition % m) {
//                 // If it doesn't line up with the alignment constraint,
//                 // return false.
//                 return false;
//             }

//         }//for mod val m

//     }//for-of constrPair

//     //debug

//     if (elemId === 22) {
//         console.log("I passed in the does pass align constrs method!");
//     }

//     //console.log("I passed in the does pass align constrs method!");

//     // It passed!
//     return true;

// }//doesPassAlignConstrs

// function doesPassChildConstrs(elemId, childConstrMap, potentialXCoord, xPositionMap) {

//     // Get the childConstrMap
//     const childArr = childConstrMap.get(elemId);

//     if (elemId === 22) {
//         console.log(`doesPassChildConstrs?\nelemId: ${elemId}`);
//         console.log(`elemId: ${elemId}, childArr:`);
//         console.log(childArr);
//     }

//     //debug
//     //console.log(`doesPassChildConstrs?\nelemId: ${elemId}`);

//     //console.log(`elemId: ${elemId}, childArr:`);
//     //console.log(childArr);

//     // Goal: find which modulo values I should AVOID
//     // Note: constraint pair- (id | modList)
//     for (const constrPair of childArr) {

//         for (m of constrPair.modList) {

//             // First, get the x position of the element in question
//             const parentPosition = xPositionMap.get(constrPair.id);

//             //debug

//             if (elemId === 22) {
//                 console.log(`potentialXCoord: ${potentialXCoord}, m:${m}, constrPair.id: ${constrPair.id}, ` +
//                     ` parentPosition: ${parentPosition}`);
//             }

//             // If the parent x coord is say 1 mod m, the potential x coord should
//             // also be 1 mod m.
//             if (potentialXCoord % m === parentPosition % m) {
//                 // If it lines up with the child constraint,
//                 // return false.
//                 return false;
//             }

//         }//for mod val m

//     }//for-of constrPair

//     // It passed!
//     return true;

// }//doesPassChildConstrs

// function smallestAvalibleXCoord(prevSmallestAvalible, xSlotArr) {

//     // Note: the passed in array has holes in it.

//     let checkIndex = prevSmallestAvalible + 1;
//     const uhOhLimit = 100;

//     while (xSlotArr[checkIndex]) {

//         checkIndex++;

//         if (checkIndex >= uhOhLimit) {
//             throw new Error(`The smallestAvalibleXCoord fxn hit its ${uhOhLimit} cap. ` +
//                 `The parameters are the following:\n prevSmallestAvalible: ${prevSmallestAvalible}, ` +
//             `xSlotArr: ${xSlotArr}`);
//         }

//     }//while index is not null

//     // Found the smallest avalible index!
//     return checkIndex;

// }//smallestAvalibleXCoord

// //debug fxn
// function lazyMapForEach(value, key, map) {
//     //console.log(`key: ${key}, value: ${value.toString()}`);
//     console.log(`key: ${key}, value:`);
//     console.log(value);
// }


// // DEBUG CRAP

// //const debugArr = [2, 5];

// //debugArr[4] = 3;
// //debugArr[9] = 1;
// //debugArr[10] = 5;
// //debugArr[5] = 6;
// //debugArr[6] = 2;
// //debugArr[12] = 9;

// //console.log(debugArr);

// //let smallestAvalibleX = 0;

// //for (i = 0; i < 5; i++) {

// //    const randomNum = Math.floor(Math.random() * 11) + 10;
// //    smallestAvalibleX = smallestAvalibleXCoord(smallestAvalibleX, debugArr);
// //    debugArr[smallestAvalibleX] = randomNum;
// //    debugArr[0] = 100;
// //    //debugArr.

// //    console.log(`randomNum: ${randomNum}, smolAvalX: ${smallestAvalibleX}`);

// //}

// //console.log(debugArr);