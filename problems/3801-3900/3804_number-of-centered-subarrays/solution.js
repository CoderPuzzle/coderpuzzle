/**
 * @param {number[]} nums
 * @return {number}
 */
var centeredSubarrays = function (nums) {
    // Totals stay within 500 * 10^5 = 5 * 10^7 and the count within
    // 125,250, so plain numbers hold every integer here exactly, far
    // inside the 2^53 safe range.
    const n = nums.length;
    let count = 0;
    // Anchor the left end and grow the right, carrying the window sum
    // and a counter of the values currently inside the window. The
    // window [i..j] is centered exactly when its running total is one
    // of the values the counter holds.
    for (let i = 0; i < n; i++) {
        const window = new Map();
        let total = 0;
        for (let j = i; j < n; j++) {
            total += nums[j];
            window.set(nums[j], (window.get(nums[j]) || 0) + 1);
            if ((window.get(total) || 0) > 0) {
                count += 1;
            }
        }
    }
    return count;
};
