/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberGame = function (nums) {
    // Each round hands Alice the round's smallest value and Bob the next
    // smallest, but Bob appends first — so the sorted array with every
    // adjacent pair swapped is exactly arr.
    const arr = [...nums].sort((a, b) => a - b);
    for (let i = 0; i + 1 < arr.length; i += 2) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
    return arr;
};
