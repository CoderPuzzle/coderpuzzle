/**
 * @param {number} n
 * @param {number[][]} highways
 * @param {number} k
 * @return {number}
 */
var maximumCost = function (n, highways, k) {
    if (k + 1 > n) return -1;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b, toll] of highways) {
        adj[a].push([b, toll]);
        adj[b].push([a, toll]);
    }
    const NEG = -Infinity;
    const dp = [];
    for (let mask = 0; mask < 1 << n; mask++) {
        dp.push(new Array(n).fill(NEG));
    }
    for (let v = 0; v < n; v++) dp[1 << v][v] = 0;
    let best = -1;
    for (let mask = 0; mask < 1 << n; mask++) {
        let pc = 0;
        for (let b = 0; b < n; b++) if (mask & (1 << b)) pc++;
        if (pc > k + 1) continue;
        for (let v = 0; v < n; v++) {
            const cur = dp[mask][v];
            if (cur === NEG) continue;
            if (pc === k + 1) {
                if (cur > best) best = cur;
                continue;
            }
            for (const [u, toll] of adj[v]) {
                if ((mask & (1 << u)) === 0) {
                    const nxt = cur + toll;
                    const nm = mask | (1 << u);
                    if (nxt > dp[nm][u]) dp[nm][u] = nxt;
                }
            }
        }
    }
    return best;
};
