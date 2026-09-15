function numberOfPaths(n: number, corridors: number[][]): number {
    const degree = new Array<number>(n + 1).fill(0);
    for (const [u, v] of corridors) {
        degree[u]++;
        degree[v]++;
    }

    const forward: Array<Set<number>> = Array.from({ length: n + 1 }, () => new Set<number>());
    for (const edge of corridors) {
        let [u, v] = edge;
        if (degree[u] > degree[v] || (degree[u] === degree[v] && u > v)) {
            [u, v] = [v, u];
        }
        forward[u].add(v);
    }

    let triangles = 0;
    for (let u = 1; u <= n; u++) {
        for (const v of forward[u]) {
            for (const w of forward[u]) {
                if (forward[v].has(w)) triangles++;
            }
        }
    }
    return triangles;
}
