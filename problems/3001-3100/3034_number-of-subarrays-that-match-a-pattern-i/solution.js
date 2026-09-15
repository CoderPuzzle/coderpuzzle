/**
 * @param {number[]} nums
 * @param {number[]} pattern
 * @return {number}
 */
var countMatchingSubarrays = function (nums, pattern) {
    const n = nums.length;
    const m = pattern.length;

    // Reduce every adjacent pair to its relation: rise, fall, or tie.
    const signs = [];
    for (let i = 0; i + 1 < n; i++) {
        const rise = nums[i + 1] > nums[i] ? 1 : 0;
        const fall = nums[i + 1] < nums[i] ? 1 : 0;
        signs.push(rise - fall);
    }

    // A size m+1 subarray matches iff its m relations equal the pattern.
    let count = 0;
    for (let start = 0; start + m < n; start++) {
        let match = true;
        for (let k = 0; k < m && match; k++) {
            match = signs[start + k] === pattern[k];
        }
        if (match) {
            count++;
        }
    }
    return count;
};
