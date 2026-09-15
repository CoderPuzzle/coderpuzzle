function shortestDistanceColor(colors: number[], queries: number[][]): number[] {
    const INF = Number.MAX_SAFE_INTEGER;
    const n = colors.length;
    // dist[i][c]: distance from i to nearest color c (1..3).
    const dist: number[][] = [];
    for (let i = 0; i < n; i++) {
        dist.push([0, INF, INF, INF]);
    }
    for (let c = 1; c <= 3; c++) {
        // Left-to-right sweep carrying the distance to the most recent
        // occurrence of c.
        let last = INF;
        for (let i = 0; i < n; i++) {
            if (colors[i] === c) {
                last = 0;
            } else if (last !== INF) {
                last++;
            }
            dist[i][c] = last;
        }
        // Mirror sweep keeps whichever side owns the closer one.
        last = INF;
        for (let i2 = n - 1; i2 >= 0; i2--) {
            if (colors[i2] === c) {
                last = 0;
            } else if (last !== INF) {
                last++;
            }
            if (last < dist[i2][c]) {
                dist[i2][c] = last;
            }
        }
    }
    return queries.map(([i, c]) => {
        const d = dist[i][c];
        return d === INF ? -1 : d;
    });
}
