/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function (nums) {
    // Erasing one all-distinct subarray for the highest score is a
    // search for the maximum-sum window with no repeated value. Sweep
    // the right end forward, and while the incoming value is already
    // inside the window, retire elements from the left, dropping their
    // sum. Values lie in [1, 10^4], so a flat count array spots the
    // repeat in constant time, and because every value is positive the
    // longest distinct window ending at each right end is also the
    // richest one there. The total can reach 10^5 * 10^4 = 10^9, far
    // below 2^53, so a plain number carries it exactly.
    const freq = new Array(10001).fill(0);
    let left = 0;
    let windowSum = 0;
    let best = 0;
    for (const value of nums) {
        while (freq[value] > 0) {
            freq[nums[left]] -= 1;
            windowSum -= nums[left];
            left += 1;
        }
        freq[value] += 1;
        windowSum += value;
        best = Math.max(best, windowSum);
    }
    return best;
};
