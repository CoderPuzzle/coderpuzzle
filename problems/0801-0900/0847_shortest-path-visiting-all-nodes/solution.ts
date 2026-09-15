function shortestPathLength(graph: number[][]): number {
    const n = graph.length;
    const full = (1 << n) - 1;
    // Walks may revisit nodes, so the state is (node, visited
    // bitmask) — at most n * 2^n states; the -1 sentinel doubles
    // as the visited marker.
    const dist: number[][] = [];
    for (let i = 0; i < n; i++) {
        dist.push(new Array(1 << n).fill(-1));
    }
    const queue: Array<[number, number]> = [];
    // Multi-source: seed every (i, 1 << i) at distance 0 and let
    // BFS discover the best starting node itself.
    for (let i = 0; i < n; i++) {
        dist[i][1 << i] = 0;
        queue.push([i, 1 << i]);
    }
    let head = 0;
    while (head < queue.length) {
        const [node, mask] = queue[head++];
        // First full mask popped is the shortest walk visiting
        // every node.
        if (mask === full) {
            return dist[node][mask];
        }
        for (const nxt of graph[node]) {
            // Stepping to a neighbor ORs in its bit; BFS explores
            // in nondecreasing distance, so the first reach of a
            // state carries the optimal count.
            const nmask = mask | (1 << nxt);
            if (dist[nxt][nmask] === -1) {
                dist[nxt][nmask] = dist[node][mask] + 1;
                queue.push([nxt, nmask]);
            }
        }
    }
    // Unreachable for the connected graphs the constraints promise.
    return 0;
}
