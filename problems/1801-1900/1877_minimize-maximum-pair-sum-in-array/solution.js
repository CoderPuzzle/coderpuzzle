/**
 * @param {number[]} nums
 * @return {number}
 */
var minPairSum = function (nums) {
    // Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
    // argument shows this minimizes the largest pair sum. Sums are at
    // most 2e5, exact as a JS number.
    const s = [...nums].sort((a, b) => a - b);
    const n = s.length;
    let best = 0;
    for (let i = 0; i + i < n; i++) {
        if (s[i] + s[n - 1 - i] > best) {
            best = s[i] + s[n - 1 - i];
        }
    }
    return best;
};
