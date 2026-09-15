function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
    // A conversion rule is a directed edge in the 26-letter cost graph;
    // the cheapest a->b conversion is the shortest path a->b.
    const INF = Infinity;
    const dist: number[][] = [];
    for (let i = 0; i < 26; i++) {
        dist.push(new Array(26).fill(INF));
        dist[i][i] = 0;
    }
    for (let e = 0; e < original.length; e++) {
        const a = original[e].charCodeAt(0) - 97;
        const b = changed[e].charCodeAt(0) - 97;
        // Duplicate rules for the same pair just keep the minimum cost.
        if (cost[e] < dist[a][b]) dist[a][b] = cost[e];
    }
    // Floyd–Warshall: relax every pair through each intermediate letter.
    for (let m = 0; m < 26; m++) {
        const row = dist[m];
        for (let i = 0; i < 26; i++) {
            const di = dist[i];
            const dim = di[m];
            if (dim === INF) continue;
            for (let j = 0; j < 26; j++) {
                const nd = dim + row[j];
                if (nd < di[j]) di[j] = nd;
            }
        }
    }
    // Matching characters convert for free; one unreachable pair fails all.
    let total = 0;
    for (let p = 0; p < source.length; p++) {
        const s = source.charCodeAt(p) - 97;
        const t = target.charCodeAt(p) - 97;
        if (s === t) continue;
        const d = dist[s][t];
        if (d === INF) return -1;
        total += d;
    }
    return total;
}
