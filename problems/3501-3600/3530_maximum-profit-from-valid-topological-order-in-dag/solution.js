/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} score
 * @return {number}
 */
var maxProfit = function (n, edges, score) {
    const pred = new Int32Array(n);
    for (const e of edges) {
        pred[e[1]] |= 1 << e[0];
    }

    const full = (1 << n) - 1;
    const dp = new Int32Array(1 << n).fill(-1);
    dp[0] = 0;

    for (let mask = 0; mask <= full; mask++) {
        const cur = dp[mask];
        if (cur < 0) continue;
        let pos = 0;
        for (let m = mask; m; m &= m - 1) pos++;
        pos += 1;
        let remaining = full ^ mask;
        while (remaining !== 0) {
            const bit = remaining & -remaining;
            const node = 31 - Math.clz32(bit);
            if ((pred[node] & mask) === pred[node]) {
                const nm = mask | bit;
                const val = cur + score[node] * pos;
                if (val > dp[nm]) dp[nm] = val;
            }
            remaining -= bit;
        }
    }
    return dp[full];
};
