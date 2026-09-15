/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function (A, B) {
    // One shared walk bumps a frequency counter for each value; because both
    // arrays are permutations, a counter reaching 2 means that value now
    // appears in both prefixes, so each hit raises the running total.
    const seen = new Array(A.length + 1).fill(0);
    let common = 0;
    const result = [];
    for (let index = 0; index < A.length; index++) {
        if (++seen[A[index]] === 2) common++;
        if (++seen[B[index]] === 2) common++;
        result.push(common);
    }
    return result;
};
