class PrimeBaseList {

    primeArr: number;

    constructor(list: number[]) {
        // Do math thingy
    }

    convertToPrimeBaseList(list: number[]) {



    }

    getPrimeBasesOfNum(n: number) {

        //const returnList: number[] = 


    }


}//class




class NumberListFunctions {

    // (!) WAIT HOW DO I KNOW IF THE LIST IS ACTUALLY PRIME???

    static getSharedPrimeBases(list1: number[], list2: number[]) {

        const returnList: number[] = [];

        // First, pick the shorter (or same sized) list
        let shorterList: number[];
        let longerList: number[];

        if (list1.length <= list2.length){
            shorterList = list1;
            longerList = list2;
        } else {
            shorterList = list2;
            longerList = list1;
        }

        // Next, get the product of the longer list. That way, I can
        // do mod checks instead of compare each index to other indecies
        const productOfLongerList: number = 
        NumberListFunctions.multiplyNumbersInList(longerList);

        // Next, do said mod checks
        for (const n of shorterList) {

            if (productOfLongerList % n === 0) {

            }

        }



    }//getSharedPrimeBases


    /**
     * A very simple function that multiplies all of the values of a list
     * 
     * ex. [1, 5, 2, 4] -> 1 * 5 * 2 * 4 = 40
     * @param list 
     * @returns 
     */
    static multiplyNumbersInList(list: number[]) {

        let returnNum: number = 1;

        for (const n of list) {
            returnNum = returnNum * n;
        }

        return returnNum;

    }



}//class




// getSharedPrimeBases(listOne, listTwo) {

//     const returnList = [];

//     // First, pick the shorter (or same sized) list
//     let shorterList;
//     let longerList;

//     if (listOne.length <= listTwo) {
//         shorterList = listOne;
//         longerList = listTwo;
//     } else {
//         shorterList = listTwo;
//         longerList = listOne;
//     }

//     // Create a combined longer list number for mod checks later on
//     const longerListNum = this.multiplyNumbersInList(longerList);

//     // Next, go through the shorter (or same sized) list
//     // and do mod checks

//     for (const n of shorterList) {

//         if (longerListNum % n === 0) {
//             returnList.push(n);
//         }

//     }//for-of

//     // If there is nothing in common, return null
//     if (returnList.length === 0) {
//         return null;
//     } else {
//         return returnList;
//     }

// }//getSharePrimeBases

// /**
//  * I needed another one ;_;
//  * 
//  * The process in a nutshell is multiply the base factorization of all
//  * of the list numbers, and then do mod checks on the total given the 
//  * base factorization of THAT number.
//  * 
//  * Let's say I have the list 20, 4, 5, 6, 7, and 3. The end goal is to
//  * get the results [2, 3, 5]. At least 20 and 4 share 2 as a base prime  
//  * factor, 6 and 3 share 3, and 20 and 5 share 5.
//  * 
//  * The next step is to boil down that list to its base primes
//  * [(2,5), (2), (5), (2,3), (7), (3)]
//  * and then multiply it all up, which equals 12600
//  * 
//  * After that, I get the base factorization of the combined total
//  * 12600 -> (2, 3, 5, 7)
//  * 
//  * The last step is to do mod checks to see if the number is
//  * divisible by any of its base factors squared. 12600 is divisible
//  * by 4, 9, and 25, but it is not divisible by 49. That means at least
//  * two of the numbers in the list share 2, 3, and 5 as base prime factors,
//  * but only one number was divisible by 7. Thus, the results [2, 3, 5]
//  * 
//  * @param {any} numsList
//  */
// findBasePrimesInAtLeastTwoNums(numsList) {

//     const returnList = [];

//     let combinedPrimeBaseListNum = 1;

//     for (const n of numsList) {

//         // First, get the base primes of n
//         const basePrimesOfN = this.calculateBaseFactorization(n);

//         // Next, multiply those together into one number
//         const combinedBasePrimesOfN = this.multiplyNumbersInList(basePrimesOfN);

//         // Now multiply that number to combinedPrimeBaseListNum
//         combinedPrimeBaseListNum = combinedPrimeBaseListNum * combinedBasePrimesOfN;

//     }//for-of

//     // Now get the base factorization of the combinedNumber so I can run modulo tests
//     // for the next step
//     const theBasePrimesOfTheCombinedNum =
//         this.calculateBaseFactorization(combinedPrimeBaseListNum);


//     // Now it's time to do the mod checks. If the number is divisible by the prime
//     // base squared, that means at least two of the numbers in the list share a
//     // base prime
//     for (const p of theBasePrimesOfTheCombinedNum) {

//         // Flooring to prevent goofy modulo issues
//         const pSquared = Math.floor(Math.pow(p, 2));

//         // A match was found, add it to the return list!
//         if (combinedPrimeBaseListNum % pSquared === 0) {
//             returnList.push(p);
//         }

//     }//for-of

//     // Return the list, or... nothing.
//     if (returnList.length === 0) {
//         return null;
//     } else {
//         return returnList;
//     }

// }//findBasePrimesInAtLeastTwoNums

// calculateBaseFactorization(num) {

//     const primeBaseArr = [];

//     // If num < 2 throw an error
//     if (num < 2) {
//         throw new Error(`The parameter num is ${num}, which is too small for ` +
//             `the calculateBaseFactorization method.`);
//     }

//     // Using the square root as a limit is a trick for saving time
//     // while checking if a number is prime or not (or in this case,
//     // if what is left over is prime or not)
//     let sqrtLimit = Math.floor(Math.sqrt(num));

//     // check 2, 3, 5, 7 automatically
//     // 2-7 gives me about 75% of the composite numbers
//     // [P(1/2 + 1/3 + ... + 1/7) - P(1/6 + ...) + P(1/15 + ...) - P(1/210)]
//     // The save gains are dog shit after that, so that's what the recursive
//     // formula is for.
//     // The 11 is there so my stuff doesn't break, I don't check 11.

//     const smallPrimesArr = [2, 3, 5, 7, 11];

//     for (let i = 0; i < 4; i++) {

//         let smallPrime = smallPrimesArr[i];

//         // Check the small prime
//         if (num % smallPrime === 0) {

//             // Add the prime to the prime base arr
//             primeBaseArr.push(smallPrime);

//             // Reduce the rest
//             while (num % smallPrime === 0) {
//                 num = num / smallPrime;
//             }

//             // Now check the square root limit to see if it makes sense
//             // to continue

//             sqrtLimit = Math.floor(Math.sqrt(num));

//             // Do I need to continue?
//             if (sqrtLimit < smallPrimesArr[i + 1]) {

//                 // I found the last prime... or 1
//                 if (num !== 1) {
//                     primeBaseArr.push(num);
//                 }
//                 return primeBaseArr;
//             }

//         }

//     }//for-of

//     // And then resursive the rest
//     let otherPrimeBasesFound = this.recursivePrimeBaseHunter(num, 11);

//     // TODO? sort the list or something
//     const combinedPrimeBaseArr = [];

//     if (primeBaseArr.length !== undefined) {
//         for (let i = 0; i < primeBaseArr.length; i++) {
//             combinedPrimeBaseArr.push(primeBaseArr[i]);
//         }//for i
//     }

//     if (otherPrimeBasesFound.length !== undefined) {
//         for (let j = 0; j < otherPrimeBasesFound.length; j++) {
//             combinedPrimeBaseArr.push(otherPrimeBasesFound[j]);
//         }//for j
//     }

//     // In theory, I'm done
//     return combinedPrimeBaseArr;

// }//calculateBaseFactorization