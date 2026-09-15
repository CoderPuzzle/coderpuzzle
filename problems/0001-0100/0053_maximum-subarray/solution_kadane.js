/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // Kadane's algorithm: current is the best sum of a subarray ending
    // exactly here; the answer is its maximum over all indices.
    // Seeding with nums[0] (not 0) makes all-negative inputs come out
    // right: an empty-prefix 0 must not be allowed to win.
    let best = nums[0];
    let current = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const value = nums[i];
        // Extend the best subarray ending at i-1, or start fresh: a
        // negative running sum can only drag down what follows.
        current = current < 0 ? value : current + value;
        if (current > best) best = current;
    }
    return best;
};
