function longestCycle(edges: number[]): number {
    const n = edges.length;
    // Count in-edges first; a node nobody points at is a queue seed.
    // edges[i] === -1 points nowhere and counts for nothing.
    const indeg = new Array<number>(n).fill(0);
    for (const v of edges) {
        if (v !== -1) indeg[v] += 1;
    }
    // Kahn-style peel: repeatedly remove in-degree-0 nodes, dropping the
    // in-edge their out-edge contributed to a successor. What survives
    // the queue is exactly the set of cycle nodes.
    const queue: number[] = [];
    for (let u = 0; u < n; u++) {
        if (indeg[u] === 0) queue.push(u);
    }
    let head = 0;
    while (head < queue.length) {
        const u = queue[head];
        head += 1;
        const w = edges[u];
        if (w !== -1) {
            indeg[w] -= 1;
            if (indeg[w] === 0) queue.push(w);
        }
    }
    // Each survivor lies on a ring: walk it once, zeroing indeg as nodes
    // are counted so the walk stops exactly where it started.
    let best = -1;
    for (let start = 0; start < n; start++) {
        if (indeg[start] === 0) continue;
        let len = 0;
        let node = start;
        while (indeg[node] > 0) {
            indeg[node] = 0;
            len += 1;
            node = edges[node];
        }
        if (len > best) best = len;
    }
    return best;
}
