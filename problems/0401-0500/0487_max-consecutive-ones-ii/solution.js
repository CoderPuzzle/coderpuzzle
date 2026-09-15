/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    // Flipping a 0 turns it into a 1 for free, so a stretch can be
    // made all-ones exactly when it holds at most one 0: sweep for
    // the longest such window. Grow it one element at a time on the
    // right; when a second 0 slips in, advance the left edge until
    // the earlier 0 drops out and the one-flip budget is restored.
    // The largest window seen is the answer.
    let best = 0;
    let left = 0;
    let zeros = 0;
    for (let right = 0; right < nums.length; ++right) {
        if (nums[right] === 0) {
            zeros++;
        }
        while (zeros > 1) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
};
