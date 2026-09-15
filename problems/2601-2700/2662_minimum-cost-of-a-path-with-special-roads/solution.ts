function minimumCost(start: number[], target: number[], specialRoads: number[][]): number {
    // By hint 1 an optimal route only ever stops at road endpoints (plus
    // start and target): any other intermediate point is dominated by
    // walking straight past it. Build that candidate set deduped, join
    // every pair with a Manhattan-priced walk, add each special road as
    // one directed edge priced at its own cost, and run Dijkstra.
    const key = (x: number, y: number): string => x + "," + y;
    const points: number[][] = [];
    const index = new Map<string, number>();
    const add = (x: number, y: number): void => {
        const k = key(x, y);
        if (!index.has(k)) {
            index.set(k, points.length);
            points.push([x, y]);
        }
    };
    add(start[0], start[1]);
    add(target[0], target[1]);
    for (const [x1, y1, x2, y2] of specialRoads) {
        add(x1, y1);
        add(x2, y2);
    }
    const find = (x: number, y: number): number => index.get(key(x, y))!;
    const n = points.length;
    const roads = specialRoads.map((r) => ({
        from: find(r[0], r[1]),
        to: find(r[2], r[3]),
        cost: r[4],
    }));
    const INF = Number.MAX_SAFE_INTEGER;
    const dist = new Array<number>(n).fill(INF);
    const used = new Array<boolean>(n).fill(false);
    dist[find(start[0], start[1])] = 0;
    for (let round = 0; round < n; round++) {
        // Nearest unvisited node scan keeps the code heap-free; with at
        // most ~402 candidates the quadratic cost is negligible.
        let u = -1;
        for (let v = 0; v < n; v++) {
            if (!used[v] && (u === -1 || dist[v] < dist[u])) u = v;
        }
        if (u === -1 || dist[u] === INF) break;
        used[u] = true;
        for (let v = 0; v < n; v++) {
            if (!used[v]) {
                const walk = dist[u] + Math.abs(points[v][0] - points[u][0]) + Math.abs(points[v][1] - points[u][1]);
                if (walk < dist[v]) dist[v] = walk;
            }
        }
        for (const road of roads) {
            if (road.from === u && dist[u] + road.cost < dist[road.to]) {
                dist[road.to] = dist[u] + road.cost;
            }
        }
    }
    return dist[find(target[0], target[1])];
}
