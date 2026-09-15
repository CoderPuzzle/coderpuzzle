/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // Boyer-Moore voting: one candidate, one counter. A match raises the
    // counter, a mismatch spends it; at zero the candidate is swapped for the
    // current element.
    let candidate = nums[0];
    let count = 0;
    for (const value of nums) {
        if (count === 0) candidate = value;
        count += value === candidate ? 1 : -1;
    }
    // Every cancellation removes one majority and one minority element, and the
    // majority holds more than half the array, so it always survives.
    return candidate;
};
