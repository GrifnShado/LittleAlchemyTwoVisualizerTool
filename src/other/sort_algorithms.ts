// // Not as fast as the Geeks for Geeks one, but I don't want to get
// // in trouble for copyright infringement

// /* -------- Functions -----------*/

// // This function merges two lists into one, assuming both are sorted.
// function mergeTwoSortedLists(listA, listB) {

// 	// Step 1: Establish some variables
// 	indexToSortA = 0;
// 	indexToSortB = 0;
// 	returnList = []

// 	// Step 2: Comparison hell
// 	while (indexToSortA < listA.length && indexToSortB < listB.length) {

// 		if (listA[indexToSortA] <= listB[indexToSortB]) {
// 			//list A had the smaller (or equal) index!
// 			returnList.push(listA[indexToSortA]);
// 			indexToSortA++;
// 		} else {
// 			//list B had the smaller index!
// 			returnList.push(listB[indexToSortB]);
// 			indexToSortB++;
// 		}

// 	}//while comparison hell

// 	// Step 3: Straggler prep
// 	let unfinishedIndex = 0;
// 	let unfinishedList = [];

// 	if (indexToSortA < listA.length) {
// 		unfinishedIndex = indexToSortA;
// 		unfinishedList = listA;
// 	} else {
// 		unfinishedIndex = indexToSortB;
// 		unfinishedList = listB;
// 	}

// 	// Step 4: Get any stragglers and tack them onto the end of the list
// 	while (unfinishedIndex < unfinishedList.length) {
// 		returnList.push(unfinishedList[unfinishedIndex]);
// 		unfinishedIndex++;
// 	}//while scooping stragglers

// 	// Step 5: Return the list!
// 	return returnList;

// }//mergeTwoSortedLists

// /////////////////////////////////
// /* -------- THE ONE -----------*/
// /////////////////////////////////

// // Merge sort without the weird cut in half bs. It picks the first two numbers, merges them, etc.
// function mergeSort(list) {

// 	let listHolder = [];

// 	/* -------- Step 1: Populate the list holder with pairs -------- */

// 	// Making this a seprate variable for clarity. It's the length of listHolder / 2, rounded down.
// 	// If the list length is odd, later I will grab the last index value and add it as its own list.
// 	listHolderForLoopStop = Math.floor(list.length / 2);

// 	for (let k = 0; k < listHolderForLoopStop; k++) {

// 		// First, get the pair of indecies respective to k
// 		let a = list[(2 * k)];
// 		let b = list[(2 * k + 1)];

// 		// Next, add the sorted pair to a pair list
// 		let pairList = [];
// 		if (a <= b) {
// 			pairList.push(a);
// 			pairList.push(b);
// 		} else {
// 			pairList.push(b);
// 			pairList.push(a);
// 		}

// 		// Last, add the pair list to the list holder
// 		listHolder.push(pairList);

// 	}//for i

// 	// If the list length is odd, add the last index as its own list
// 	if (list.length % 2 == 1) {
// 		// I'm passing in an array, contianing the last index of the list. Sorry it looks ugly.
// 		listHolder.push([list[list.length - 1]]);
// 	}

// 	/* -------- Step 2: Merge time! -------- */

// 	// After testing it, I relized I can just pop the lists instead of retrieve them at a
// 	// certain index lol
// 	while (listHolder.length > 1) {

// 		// First, I need a temp list to hold the new lists
// 		tempList = [];

// 		// If the length of list holder is odd, then pop off the last list and save it for later
// 		if (listHolder.length % 2 == 1) {
// 			tempList.push(listHolder.pop());
// 		}

// 		// Now go through the rest and merge them by pairs
// 		while (listHolder.length > 0) {

// 			// Pop off the lists (I'm scared popping the list twice on one line would be unstable)
// 			lA = listHolder.pop();
// 			lB = listHolder.pop();

// 			// Now save the merged list to the temp list
// 			tempList.push(mergeTwoSortedLists(lA, lB));

// 		}//while there are lists to merge still

// 		//This round of lists have been merged, it's time to reassign them to ListHolder
// 		listHolder = tempList;

// 	}//while listHolder has more than one list

// 	/* -------- Step 3: Return! -------- */
// 	return listHolder[0];

// }//mergeSort

// /**
//  * In retrospect it didn't need to be written backwards, but I'm too lazy
//  * to fix it
//  * @param {any} arr
//  * @returns
//  */
// function bubbleSortLargeOnLeft(arr) {

// 	for (let i = 0; i < arr.length; i++) {

// 		// Note: i is the stopping value. So once I get the largest
// 		// item on i = 0, the limit for the next round is i = 1.

// 		for (let j = (arr.length-1); j > i; j--) {

// 			// Compare j and j - 1. (That's why j > i)
// 			// If j is larger, then swap.
// 			if (arr[j] > arr[j - 1]) {
// 				const a = arr[j];
// 				const b = arr[j - 1];
// 				arr[j] = b;
// 				arr[j - 1] = a;
// 			}

// 		}//for j

// 	}//for i

// 	return arr;

// }//bubbleSortLargeOnLeft


// function bubbleSortSmallOnLeft(arr) {

// 	for (let i = 0; i < arr.length; i++) {

// 		// Note: i is the stopping value. So once I get the largest
// 		// item on i = 0, the limit for the next round is i = 1.

// 		for (let j = 0; j < arr.length - 1 - i; j++) {

// 			// Compare j and j +1. If j is larger
// 			// than j + 1, swap
// 			if (arr[j] > arr[j + 1]) {
// 				const a = arr[j];
// 				const b = arr[j + 1];
// 				arr[j] = b;
// 				arr[j + 1] = a;
// 			}

// 		}//for j

// 	}//for i

// 	return arr;

// }//bubbleSortLargeOnLeft

// /**
//  * An even more hyper specific function. This is to sort a list of arr pairs
//  * in the ComboMap fxn. The expected input list is 
//  * [ [rowDiff, id], [rowDiff, id], ... ]
//  * So my goal is to sort rows, largest to smallst, but when row numbers match,
//  * sort the ids smallest to largest. The row differences that are larger refer
//  * to parents higher up on the map. The parent ids being ordered smallest to
//  * means the smaller id element was drawn first, so its position reference exists
//  * 
//  * @param {any} arr
//  * @returns
//  */
// function bubbleSortArrPairsSmallOnLeft(arrPairList) {

// 	for (let i = 0; i < arrPairList.length; i++) {

// 		// Note: i is the stopping value. So once I get the largest
// 		// item on i = 0, the limit for the next round is i = 1.

// 		for (let j = 0; j < arrPairList.length - 1 - i; j++) {

// 			// Compare pairs j and j + 1. If j is larger
// 			// than j + 1, swap
// 			if (doSwapArrPairs(arrPairList[j], arrPairList[j+1]) === true) {
				
// 				const a = arrPairList[j];
// 				const b = arrPairList[j + 1];
// 				arrPairList[j] = b;
// 				arrPairList[j + 1] = a;
// 			}

// 		}//for j

// 	}//for i

// 	return arrPairList;

// }//bubbleSortLargeOnLeft

// /**
//  * 
//  *  WARNING: The description is WRONG, but the example is right
//  * 
//  * A hyper specific fxn for a hyper specific sort fxn. If arrPairA
//  * has both a larger row number OR it has the same size rowNum AND
//  * its id is larger compared to arrPairB, then this fxn returns true.
//  * Otherwise, it returns false.
//  * 
//  * Examples:
//  * 
//  * A = [5, 10], B = [2, 4]. Don't swap.
//  * A = [0, 17], B = [1, 4]. Swap.
//  * A = [2, 9], B = [2, 7]. Swap.
//  */
// function doSwapArrPairs(arrPairA, arrPairB) {

// 	// arrPairA's rowDiff is smaller than arrPairB's 
// 	if (arrPairA[0] < arrPairB[0]) {

// 		return true;

// 	// arrPairA's rowNum is equal to arrPairB's
// 	} else if (arrPairA[0] === arrPairB[0]) {

// 		// Now check to see if arrPairA's id is larger than arrPairB's.
// 		// Duplicate ids CAN happen-
// 		// for example, let's say fire and earth make lava, but so can
// 		// earth and heat. When getting all of the parent ids, for lava,
// 		// earth would pop up at least twice.
// 		// So I just won't swap them :)
// 		if (arrPairA[1] > arrPairB[1]) {
// 			return true;

// 		} else {
// 			return false;
// 		}

// 	// arrPairA's rowNum is larger than arrPairB's
// 	} else {
// 		return false;
// 	}

// }//doSwapArrPairs