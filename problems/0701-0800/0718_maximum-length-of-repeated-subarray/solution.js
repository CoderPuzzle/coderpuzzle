/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
    const m = nums1.length,
        n = nums2.length;
    // dp[j] = longest common run starting exactly at nums1[i+1], nums2[j];
    // sweeping i downward keeps row i+1 available when row i is computed.
    let dp = new Array(n + 1).fill(0);
    let best = 0;
    for (let i = m - 1; i >= 0; i--) {
        const cur = new Array(n + 1).fill(0);
        for (let j = n - 1; j >= 0; j--) {
            if (nums1[i] === nums2[j]) {
                // Match extends the run starting at (i+1, j+1); a mismatch
                // leaves 0 — no shared subarray starts there.
                cur[j] = dp[j + 1] + 1;
                if (cur[j] > best) best = cur[j];
            }
        }
        // Roll: only the previous row is ever read.
        dp = cur;
    }
    return best;
};
