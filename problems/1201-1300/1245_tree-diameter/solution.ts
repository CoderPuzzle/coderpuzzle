function treeDiameter(edges: number[][]): number {
    // No edges: a single-node tree, diameter 0.
    if (edges.length === 0) return 0;
    const n = edges.length + 1;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const bfs = (src: number): [number, number] => {
        // -1 doubles as the visited marker; a tree has one path between
        // any two nodes, so BFS distances are true path lengths.
        const dist: number[] = new Array(n).fill(-1);
        dist[src] = 0;
        const queue: number[] = [src];
        let far = src;
        for (let head = 0; head < queue.length; head++) {
            const u = queue[head];
            for (const v of adj[u]) {
                if (dist[v] < 0) {
                    dist[v] = dist[u] + 1;
                    queue.push(v);
                    // Track the farthest node on the fly.
                    if (dist[v] > dist[far]) far = v;
                }
            }
        }
        return [far, dist[far]];
    };

    // Double BFS: the farthest node B from any start is an endpoint of a
    // longest path, so B's eccentricity (second pass) is the diameter.
    const [far] = bfs(0);
    const [, diameter] = bfs(far);
    return diameter;
}
