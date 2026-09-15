/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function (nums, target) {
    let total = 0;
    // Fix the left endpoint and grow the window one element at a time;
    // each step updates the running count of target in constant time.
    for (let start = 0; start < nums.length; start++) {
        let count = 0;
        for (let end = start; end < nums.length; end++) {
            if (nums[end] === target) {
                count++;
            }
            // target is the majority exactly when it holds strictly
            // more than half of the window: twice its count beats
            // the length.
            if (2 * count > end - start + 1) {
                total++;
            }
        }
    }
    return total;
};
