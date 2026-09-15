function minScore(n: number, roads: number[][]): number {
    // A path may reuse roads, so any road inside the connected component
    // of city 1 can be crossed on a detour and included in the path's
    // score. The answer is therefore the smallest distance among the
    // roads of that component. Union every road, then scan for the
    // minimum road fully inside city 1's component.
    const parent: number[] = new Array(n + 1);
    for (let i = 0; i <= n; i++) parent[i] = i;
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) parent[ra] = rb;
    };

    for (const [a, b] of roads) union(a, b);
    const root = find(1);
    let best = 1000000000;
    for (const [a, b, d] of roads) {
        if (find(a) === root && d < best) best = d;
    }
    return best;
}
