function minimumFuelCost(roads: number[][], seats: number): number {
    const n = roads.length + 1;
    if (n === 1) return 0;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of roads) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const parent = new Array<number>(n).fill(-1);
    const seen = new Array<boolean>(n).fill(false);
    seen[0] = true;
    const order: number[] = [];
    const queue: number[] = [0];
    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                queue.push(v);
            }
        }
    }

    const size = new Array<number>(n).fill(1);
    let fuel = 0;
    for (let i = order.length - 1; i >= 0; i--) {
        // children before parents
        const u = order[i];
        if (u === 0) continue;
        size[parent[u]] += size[u];
        fuel += Math.floor((size[u] + seats - 1) / seats);
    }
    return fuel;
}
