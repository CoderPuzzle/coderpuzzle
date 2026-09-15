function maxSubgraphScore(n: number, edges: number[][], good: number[]): number[] {
    const NEG = -1e18;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Iterative DFS (explicit stack): safe on deep trees; records parent,
    // children, and an order where every parent precedes its children.
    const parent = new Array(n).fill(-1);
    const children: number[][] = Array.from({ length: n }, () => []);
    const order: number[] = [];
    const stack = [0];
    parent[0] = -2;
    while (stack.length > 0) {
        const u = stack.pop()!;
        order.push(u);
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            parent[v] = u;
            children[u].push(v);
            stack.push(v);
        }
    }

    // +1 for good, -1 for bad: a connected subgraph's score is its weight sum,
    // so the task is the max-weight connected subgraph through each node.
    const weight = good.map((g) => (g ? 1 : -1));

    // down[u]: best score of a connected subgraph confined to u's subtree:
    // weight[u] plus each child's down only when positive, pruning harmful
    // branches. Reverse order computes children before parents.
    const down = new Array(n).fill(0);
    for (let i = order.length - 1; i >= 0; i--) {
        const u = order[i];
        let s = weight[u];
        for (const c of children[u]) {
            if (down[c] > 0) s += down[c];
        }
        down[u] = s;
    }

    // up[u]: best connected piece reaching u only through its parent side
    // (u's own subtree excluded); the NEG sentinel gives the root none.
    const up = new Array(n).fill(0);
    up[0] = NEG;
    const result = new Array(n).fill(0);
    // Reroot in one preorder pass: each child inherits the parent plus u's
    // other worthwhile branches plus whatever the rest of the tree gave u;
    // dropping the child's own positive part keeps the two sides disjoint.
    for (const u of order) {
        let totalPos = 0;
        for (const c of children[u]) totalPos += Math.max(0, down[c]);
        for (const c of children[u]) {
            up[c] = weight[u] + (totalPos - Math.max(0, down[c])) + Math.max(0, up[u]);
        }
        // Answer for u: its weight, its positive child branches, and the
        // optional parent-side piece.
        result[u] = weight[u] + totalPos + Math.max(0, up[u]);
    }
    return result;
}
