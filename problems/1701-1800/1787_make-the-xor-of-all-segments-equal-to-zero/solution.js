/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minChanges = function (nums, k) {
    // dp[x] holds the fewest changes among the residue classes handled so
    // far when the chosen class values XOR to x; values are below 2^10, so
    // 1024 states cover every reachable XOR.
    const X = 1024;
    const INF = 1 << 20;
    let dp = new Array(X).fill(INF);
    dp[0] = 0;
    for (let r = 0; r < k; ++r) {
        const count = new Array(X).fill(0);
        let size = 0;
        for (let i = r; i < nums.length; i += k) {
            count[nums[i]]++;
            size++;
        }
        // Rewriting a whole class costs its full size and leaves its value
        // free, so every state is reachable at best; keeping a value that
        // already occurs can only improve on that.
        let best = INF;
        for (let x = 0; x < X; ++x) {
            if (dp[x] < best) {
                best = dp[x];
            }
        }
        best += size;
        const nxt = new Array(X).fill(best);
        for (let v = 0; v < X; ++v) {
            const c = count[v];
            if (c === 0) {
                continue;
            }
            const cost = size - c;
            for (let u = 0; u < X; ++u) {
                const t = dp[u] + cost;
                const w = u ^ v;
                if (t < nxt[w]) {
                    nxt[w] = t;
                }
            }
        }
        dp = nxt;
    }
    return dp[0];
};
