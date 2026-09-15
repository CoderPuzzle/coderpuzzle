function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {
    // Kruskal over houses 1..n plus a virtual node 0 (well edges).
    const edges: [number, number, number][] = [];
    for (let i = 0; i < n; i++) {
        edges.push([wells[i], 0, i + 1]);
    }
    for (const [house1, house2, cost] of pipes) {
        edges.push([cost, house1, house2]);
    }
    edges.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    const parent: number[] = Array.from({ length: n + 1 }, (_, i) => i);
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    let total = 0;
    let used = 0;
    for (const [cost, a, b] of edges) {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
            total += cost;
            used += 1;
            if (used === n) {
                break;
            }
        }
    }
    return total;
}
