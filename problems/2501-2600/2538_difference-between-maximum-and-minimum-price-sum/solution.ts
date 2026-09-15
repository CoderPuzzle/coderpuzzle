function maxOutput(n: number, edges: number[][], price: number[]): number {
    if (n === 1) {
        return 0;
    }

    const adj = Array.from({ length: n }, () => [] as number[]);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Root at 0 once: BFS fixes parents and a top-down visit order, so
    // every later pass walks flat arrays and nothing recurses.
    const parent = new Array(n).fill(-1);
    const order = [0];
    for (let i = 0; i < order.length; i++) {
        const u = order[i];
        for (const v of adj[u]) {
            if (parent[v] === -1 && v !== 0) {
                parent[v] = u;
                order.push(v);
            }
        }
    }

    // d[v]: best price sum of an "arm", a vertical path starting at v
    // and descending into v's subtree. t1/t2/t1src remember the best two
    // child arms per node so the downward pass can hand each child its
    // "best arm excluding your own branch" value.
    const d = new Array(n).fill(0);
    const t1 = new Array(n).fill(0);
    const t2 = new Array(n).fill(0);
    const t1src = new Array(n).fill(-1);
    for (let i = n - 1; i >= 0; i--) {
        const v = order[i];
        d[v] = price[v] + t1[v];
        const p = parent[v];
        if (p >= 0) {
            if (d[v] > t1[p]) {
                t2[p] = t1[p];
                t1[p] = d[v];
                t1src[p] = v;
            } else if (d[v] > t2[p]) {
                t2[p] = d[v];
            }
        }
    }

    // Rerooting. The minimum path at any root is always the lone root,
    // which cancels against its own price inside every arm sum, so the
    // asked difference is exactly the largest arm leaving each node:
    // either straight down into a child subtree (t1) or climbing out
    // through the parent (up). Path sums stay <= n * max(price) = 10^10,
    // comfortably below Number's exact bound 2^53, so plain arithmetic
    // stays exact everywhere.
    const up = new Array(n).fill(0);
    let ans = t1[0];
    for (let i = 1; i < n; i++) {
        const v = order[i];
        const p = parent[v];
        const others = t1src[p] === v ? t2[p] : t1[p];
        up[v] = price[p] + Math.max(others, up[p]);
        ans = Math.max(ans, t1[v], up[v]);
    }
    return ans;
}
