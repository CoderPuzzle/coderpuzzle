function countPairs(n: number, edges: number[][]): number {
    // reachability in an undirected graph is an equivalence, so the answer
    // is all pairs minus the pairs inside one connected component
    const parent = new Int32Array(n);
    const size = new Int32Array(n).fill(1);
    for (let i = 0; i < n; i++) parent[i] = i;

    function find(x: number): number {
        // first pass locates the root, second rewires every visited node
        // directly to it: path compression without recursion
        let root = x;
        while (parent[root] !== root) root = parent[root];
        while (parent[x] !== root) {
            const next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    }

    for (const [a, b] of edges) {
        let ra = find(a),
            rb = find(b);
        if (ra !== rb) {
            // union by size: the smaller tree hangs off the larger's root,
            // keeping trees shallow; size[root] stays the component's count
            if (size[ra] < size[rb]) {
                const tmp = ra;
                ra = rb;
                rb = tmp;
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        }
    }

    // each component is counted exactly once, at its root; its C(s, 2)
    // pairs are mutually reachable, every other pair is not
    let reachable = 0;
    for (let v = 0; v < n; v++) {
        if (find(v) === v) {
            reachable += (size[v] * (size[v] - 1)) / 2;
        }
    }
    return (n * (n - 1)) / 2 - reachable;
}
