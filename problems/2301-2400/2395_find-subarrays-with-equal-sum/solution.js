/**
 * @param {number[]} nums
 * @return {boolean}
 */
var findSubarrays = function (nums) {
    // Sweep the n-1 length-2 window sums into a set; the first repeat
    // answers true. Window sums fit well within Number exactness:
    // |sum| <= 2 * 10^9 < 2^53.
    const seen = new Set();
    for (let i = 0; i + 1 < nums.length; ++i) {
        const sum = nums[i] + nums[i + 1];
        if (seen.has(sum)) {
            return true;
        }
        seen.add(sum);
    }
    return false;
};
