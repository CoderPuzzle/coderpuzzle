/**
 * @param {number[]} scores
 * @param {number[][]} edges
 * @return {number}
 */
var maximumScore = function (scores, edges) {
    const n = scores.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // keep only the 3 highest-scoring neighbours of each node
    // (Array.prototype.sort is stable, matching Python's sorted)
    const top3 = adj.map((neighbors) =>
        neighbors
            .slice()
            .sort((u, v) => scores[v] - scores[u])
            .slice(0, 3),
    );

    let best = -1;
    for (const [a, b] of edges) {
        const base = scores[a] + scores[b];
        for (const x of top3[a]) {
            if (x === b) continue;
            for (const y of top3[b]) {
                if (y === a || x === y) continue;
                const total = base + scores[x] + scores[y];
                if (total > best) best = total;
            }
        }
    }
    return best;
};
