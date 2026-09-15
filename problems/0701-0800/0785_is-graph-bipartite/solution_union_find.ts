function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    const parent: number[] = Array.from({ length: n }, (_, i) => i);

    const find = function (node: number): number {
        let root = node;
        while (parent[root] !== root) {
            root = parent[root];
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (parent[node] !== root) {
            const next = parent[node];
            parent[node] = root;
            node = next;
        }
        return root;
    };

    const union = function (a: number, b: number): void {
        parent[find(a)] = find(b);
    };

    // Bipartite means the nodes split into two groups with every edge
    // crossing between them, so all of a node's neighbors must be able
    // to share the one opposite group.
    for (let u = 0; u < n; u++) {
        for (const v of graph[u].slice(1)) {
            // Union u's enemies together: they all belong to one set.
            union(graph[u][0], v);
        }
    }
    // A node sharing a set with one of its own enemies sits inside an
    // odd cycle: not bipartite.
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            if (find(u) === find(v)) {
                return false;
            }
        }
    }
    return true;
}
