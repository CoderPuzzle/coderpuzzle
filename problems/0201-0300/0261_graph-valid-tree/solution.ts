function validTree(n: number, edges: number[][]): boolean {
    // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
    // more cannot stay acyclic — any other count fails immediately.
    if (edges.length !== n - 1) {
        return false;
    }
    // Union-Find over the nodes, each starting as its own component.
    const parent: number[] = Array.from({ length: n }, (_, i) => i);
    // Path halving: point each visited node at its grandparent on the
    // way up, short-circuiting future traversals.
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    for (const [a, b] of edges) {
        const ra = find(a);
        const rb = find(b);
        // Same root: the edge joins two nodes already in one
        // component — it closes a cycle.
        if (ra === rb) {
            return false;
        }
        // Distinct roots: merge the two components.
        parent[ra] = rb;
    }
    // All n - 1 edges merged distinct components: connected and
    // acyclic, hence a valid tree.
    return true;
}
