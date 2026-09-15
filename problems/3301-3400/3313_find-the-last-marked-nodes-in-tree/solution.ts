function lastMarkedNodes(edges: number[][]): number[] {
    // Marking spreads one BFS layer per second, so the last marked node
    // for a start i is a farthest node from i, and a farthest node from
    // any node is always an endpoint of a diameter. Two sweeps find the
    // diameter endpoints u and v; the distance arrays from both then
    // answer every i at once — the farther endpoint is a last-marked
    // node, and on a tie either endpoint qualifies.
    const n = edges.length + 1;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const bfs = (src: number): { dist: Int32Array; far: number } => {
        const dist = new Int32Array(n).fill(-1);
        dist[src] = 0;
        const queue = new Int32Array(n);
        let head = 0;
        let tail = 0;
        let far = src;
        queue[tail++] = src;
        while (head < tail) {
            const node = queue[head++];
            for (const nxt of adj[node]) {
                if (dist[nxt] === -1) {
                    dist[nxt] = dist[node] + 1;
                    if (dist[nxt] > dist[far]) far = nxt;
                    queue[tail++] = nxt;
                }
            }
        }
        return { dist, far };
    };

    const u = bfs(0).far;
    const { dist: distU, far: v } = bfs(u);
    const distV = bfs(v).dist;
    const ans = new Array<number>(n);
    for (let i = 0; i < n; i++) {
        ans[i] = distU[i] > distV[i] ? u : v;
    }
    return ans;
}
