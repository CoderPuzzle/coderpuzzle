/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumStrength = function (nums, k) {
    const NEG = -Infinity;
    const n = nums.length;
    // nxt[j][x] = dp[i+1][j][x]
    let nxt = [];
    for (let j = 0; j <= k; j++) nxt.push([NEG, NEG]);
    nxt[0][0] = 0;
    for (let i = n - 1; i >= 0; i--) {
        const cur = [];
        for (let j = 0; j <= k; j++) cur.push([NEG, NEG]);
        for (let j = 0; j <= k; j++) {
            if (j >= 1) {
                const coeff = j & 1 ? j : -j;
                let best = nxt[j - 1][0];
                if (nxt[j][1] > best) best = nxt[j][1];
                cur[j][1] = nums[i] * coeff + best;
            }
            cur[j][0] = nxt[j][0];
            if (cur[j][1] > cur[j][0]) cur[j][0] = cur[j][1];
        }
        nxt = cur;
    }
    return nxt[k][0];
};
