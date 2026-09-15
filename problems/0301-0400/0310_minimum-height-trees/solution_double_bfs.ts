function findMinHeightTrees(n: number, edges: number[][]): number[] {
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }
    // One BFS from src: fills dist and parent, returns the farthest node
    // from src.
    const farthestFrom = (src: number): { node: number; dist: number[]; parent: number[] } => {
        const dist: number[] = new Array(n).fill(-1);
        const parent: number[] = new Array(n).fill(-1);
        dist[src] = 0;
        const queue: number[] = [src];
        for (let head = 0; head < queue.length; head++) {
            const u = queue[head];
            for (const v of adjacency[u]) {
                if (dist[v] < 0) {
                    dist[v] = dist[u] + 1;
                    parent[v] = u;
                    queue.push(v);
                }
            }
        }
        let best = 0;
        for (let i = 1; i < n; i++) {
            if (dist[i] > dist[best]) {
                best = i;
            }
        }
        return { node: best, dist, parent };
    };
    // Two-shot diameter: the farthest node from any start is one end of a
    // longest path, and the farthest node from there is the other end.
    const u = farthestFrom(0).node;
    const { node: v, dist, parent } = farthestFrom(u);
    // Climb v back to u along discovery parents: the diameter path.
    const path: number[] = [];
    for (let x = v; x !== -1; x = parent[x]) {
        path.push(x);
    }
    const d = dist[v];
    // The minimal-height roots are the path's middle: one node when the
    // diameter has an even number of edges, two adjacent middles when odd.
    if (d % 2 === 0) {
        return [path[d / 2]];
    }
    const a = path[(d - 1) / 2],
        b = path[(d + 1) / 2];
    return a < b ? [a, b] : [b, a];
}
