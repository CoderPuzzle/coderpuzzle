/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
var minimumScore = function (nums, edges) {
    const n = nums.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Iterative DFS from node 0 with an explicit stack: tin/tout record
    // each subtree as the half-open interval [tin[u], tout[u]) of entry
    // stamps, so the ancestor test is a plain range check. Popping the ~u
    // marker is the post-order moment -- fold sub[u] into its parent
    // there, after every descendant has already contributed.
    const tin = new Array(n).fill(0);
    const tout = new Array(n).fill(0);
    const parent = new Array(n).fill(-1);
    const sub = nums.slice();
    let timer = 0;
    const stack = [0];
    while (stack.length > 0) {
        const u = stack.pop();
        if (u >= 0) {
            tin[u] = timer++;
            stack.push(~u);
            for (const v of adj[u]) {
                if (v !== parent[u]) {
                    parent[v] = u;
                    stack.push(v);
                }
            }
        } else {
            const w = ~u;
            tout[w] = timer;
            const p = parent[w];
            if (p >= 0) sub[p] ^= sub[w];
        }
    }

    const total = sub[0];

    // Every edge is its child endpoint, so the pairs below run over all
    // ways to remove two edges. The three cases are exhaustive and
    // mutually exclusive, and in each the third component's XOR is
    // recovered from the other two. Values are at most 10^8 (< 2^27), so
    // every XOR and every score difference fits in 32 bits.
    let best = Infinity;
    for (let x = 1; x < n; x++) {
        const sx = sub[x];
        const tx = tin[x];
        const ex = tout[x];
        const tpx = total ^ sx;
        for (let y = x + 1; y < n; y++) {
            const sy = sub[y];
            const ty = tin[y];
            let a, b, c;
            if (tx <= ty && ty < ex) {
                // x is an ancestor of y
                a = sy;
                c = tpx;
                b = sx ^ sy;
            } else if (ty <= tx && tx < tout[y]) {
                // y is an ancestor of x
                a = sx;
                c = total ^ sy;
                b = sx ^ sy;
            } else {
                // disjoint subtrees
                a = sx;
                b = sy;
                c = tpx ^ sy;
            }
            let lo = Math.min(a, b);
            let hi = Math.max(a, b);
            if (c < lo) lo = c;
            else if (c > hi) hi = c;
            best = Math.min(best, hi - lo);
        }
    }
    return best;
};
