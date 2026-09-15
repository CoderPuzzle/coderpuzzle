/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
    // dp[i] is the maximum score of a hopping path that starts at index i
    // and ends at the last element: the next hop goes to some j > i and pays
    // (j - i) * nums[j] plus whatever the best continuation from j earns.
    // Every hop distance telescopes into the n - 1 units between index 0 and
    // the end, so the answer stays below (n - 1) * max(nums) < 2^31, well
    // within exact Number range.
    const n = nums.length;
    const dp = new Array(n).fill(0);
    for (let i = n - 2; i >= 0; i--) {
        let best = 0;
        for (let j = i + 1; j < n; j++) {
            const score = (j - i) * nums[j] + dp[j];
            if (score > best) {
                best = score;
            }
        }
        dp[i] = best;
    }
    return dp[0];
};
