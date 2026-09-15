/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number}
 */
var maximumProcessableQueries = function (nums, queries) {
    const n = nums.length;
    const m = queries.length;
    // dp[l][r]: most queries processable while nums[l:r] all survive. The
    // window starts as the whole array and shrinks one index per step; a
    // leaving end either serves the next query in order or was dropped
    // silently by the once-only subsequence op.
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    let best = 0;
    for (let span = n - 1; span >= 0; --span) {
        for (let l = 0; l + span <= n; ++l) {
            const r = l + span;
            let t = 0;
            if (l > 0) {
                const p = dp[l - 1][r];
                t = Math.max(t, p);
                if (p < m && nums[l - 1] >= queries[p]) t = Math.max(t, p + 1);
            }
            if (r < n) {
                const p = dp[l][r + 1];
                t = Math.max(t, p);
                if (p < m && nums[r] >= queries[p]) t = Math.max(t, p + 1);
            }
            dp[l][r] = t;
            // Every survivor block can be op-deleted too, so empty
            // windows carry the answer.
            if (span === 0) best = Math.max(best, t);
        }
    }
    return best;
};
