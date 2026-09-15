/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function (nums) {
    const n = nums.length;
    let best = 0;
    // Fix the left endpoint and stretch the right one; the two sets hold the
    // distinct even and odd values of the current window, so equal sizes mean
    // the window is balanced.
    for (let left = 0; left < n; left++) {
        const evens = new Set();
        const odds = new Set();
        for (let right = left; right < n; right++) {
            if (nums[right] % 2 === 0) {
                evens.add(nums[right]);
            } else {
                odds.add(nums[right]);
            }
            if (evens.size === odds.size) {
                best = Math.max(best, right - left + 1);
            }
        }
    }
    // No window ever balanced leaves best at 0.
    return best;
};
