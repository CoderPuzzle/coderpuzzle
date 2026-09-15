function maximumScoreAfterOperations(edges: number[][], values: number[]): number {
    // A tree stays healthy exactly when every root-to-leaf path keeps at
    // least one un-taken node. dp[x] is the best score inside x's subtree
    // while every x-to-leaf path must still keep a node: keep x (its value
    // stays, so every descendant is free to take: the child subtree sums)
    // or take x and let each child subtree solve the same problem (dp of
    // the children). A leaf must keep itself, so its dp is 0. The answer
    // is dp[0]. n reaches 2 * 10^4 on path-shaped trees, so the two walks
    // run on explicit arrays, never on the call stack. Totals stay below
    // 2 * 10^4 * 10^9 = 2 * 10^13, exact in Number (< 2^53).
    const n = values.length;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }
    const parent = new Array(n).fill(-1);
    const hasChild = new Array(n).fill(false);
    const order = [0];
    parent[0] = 0;
    for (let head = 0; head < order.length; ++head) {
        const x = order[head];
        for (const y of adj[x]) {
            if (parent[y] === -1) {
                parent[y] = x;
                hasChild[x] = true;
                order.push(y);
            }
        }
    }
    const subSum = new Array(n).fill(0);
    const dp = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; --i) {
        const x = order[i];
        const here = values[x] + subSum[x];
        if (hasChild[x]) {
            dp[x] = Math.max(values[x] + dp[x], here - values[x]);
        }
        subSum[x] = here;
        if (x !== 0) {
            subSum[parent[x]] += here;
            dp[parent[x]] += dp[x];
        }
    }
    return dp[0];
}
