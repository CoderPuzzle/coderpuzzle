function minCostConnectPoints(points: number[][]): number {
    const n = points.length;
    if (n <= 1) {
        return 0;
    }
    const inf = Infinity;
    // best[v]: cheapest Manhattan distance from any tree vertex to the
    // outside vertex v; best[0] = 0 makes the seed point free.
    const best: number[] = new Array(n).fill(inf);
    best[0] = 0;
    const used: boolean[] = new Array(n).fill(false);
    let total = 0;
    for (let step = 0; step < n; step++) {
        // Cheapest edge leaving the current tree — safe to add by Prim's
        // cut property.
        let u = -1;
        for (let v = 0; v < n; v++) {
            if (!used[v] && (u === -1 || best[v] < best[u])) {
                u = v;
            }
        }
        total += best[u];
        used[u] = true;
        // Relax every outside vertex against the newly attached u.
        for (let v = 0; v < n; v++) {
            if (!used[v]) {
                const d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
                if (d < best[v]) {
                    best[v] = d;
                }
            }
        }
    }
    return total;
}
