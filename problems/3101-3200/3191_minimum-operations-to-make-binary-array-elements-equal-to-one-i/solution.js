/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const arr = nums.slice();
    const n = arr.length;
    let operations = 0;
    // The leftmost 0 can only be fixed by the one flip starting there, so
    // every position whose running value is 0 forces exactly one operation.
    for (let i = 0; i + 2 < n; i++) {
        if (arr[i] === 0) {
            operations++;
            arr[i] ^= 1;
            arr[i + 1] ^= 1;
            arr[i + 2] ^= 1;
        }
    }
    // The sweep leaves positions 0..n-3 all 1; the last two cells can no
    // longer be operated on, so a surviving 0 means the array is unfixable.
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) return -1;
    }
    // Each counted flip was forced, so no cheaper sequence of flips exists.
    return operations;
};
