function numberOfRoutes(grid: string[], d: number): number {
    const MOD = 1000000007n;
    const n = grid.length;
    const m = grid[0].length;
    // up[c]: ways standing on (r, c) after an arrival from below (or the
    // start); same_: ways standing there after a same-row slide. A slide
    // may not follow another slide, so slides feed only from up.
    let up: bigint[] = new Array(m);
    for (let c = 0; c < m; ++c) up[c] = grid[n - 1][c] === "." ? 1n : 0n;

    const slidesOf = (upValues: bigint[], row: number): bigint[] => {
        // Prefix sums over the row's up-values; the Euclidean bound for a
        // same-row move is |dc| <= d (dr = 0).
        const pref: bigint[] = new Array(m + 1).fill(0n);
        for (let v = 0; v < m; ++v) {
            pref[v + 1] = grid[row][v] === "." ? (pref[v] + upValues[v]) % MOD : pref[v];
        }
        const out: bigint[] = new Array(m).fill(0n);
        for (let c = 0; c < m; ++c) {
            if (grid[row][c] !== ".") continue;
            const lo = Math.max(0, c - d);
            const hi = Math.min(m - 1, c + d);
            out[c] = (pref[hi + 1] - pref[lo] - upValues[c]) % MOD;
            if (out[c] < 0n) out[c] += MOD;
        }
        return out;
    };

    let same_: bigint[] = slidesOf(up, n - 1);
    // An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
    // floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
    const wUp = Math.floor(Math.sqrt(d * d - 1));
    for (let r = n - 2; r >= 0; --r) {
        // Every way of standing anywhere in row r+1 may step up into
        // row r's window around column c.
        const pref: bigint[] = new Array(m + 1).fill(0n);
        for (let v = 0; v < m; ++v) {
            pref[v + 1] = grid[r + 1][v] === "." ? (pref[v] + up[v] + same_[v]) % MOD : pref[v];
        }
        const newUp: bigint[] = new Array(m).fill(0n);
        for (let c = 0; c < m; ++c) {
            if (grid[r][c] !== ".") continue;
            const lo = Math.max(0, c - wUp);
            const hi = Math.min(m - 1, c + wUp);
            newUp[c] = (pref[hi + 1] - pref[lo]) % MOD;
            if (newUp[c] < 0n) newUp[c] += MOD;
        }
        same_ = slidesOf(newUp, r);
        up = newUp;
    }
    let ans = 0n;
    for (let c = 0; c < m; ++c) {
        if (grid[0][c] === ".") ans = (ans + up[c] + same_[c]) % MOD;
    }
    return Number(ans);
}
