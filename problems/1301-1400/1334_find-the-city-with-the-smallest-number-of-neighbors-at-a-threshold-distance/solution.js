/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
    // With n <= 100, compute all-pairs distances at once: 0 diagonal,
    // symmetric direct weights, INF elsewhere.
    const INF = Infinity;
    const dist = Array.from({ length: n }, () => new Array(n).fill(INF));
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }
    for (const [a, b, w] of edges) {
        dist[a][b] = w;
        dist[b][a] = w;
    }
    // Floyd-Warshall: relax dist[i][j] through intermediate node k. The INF
    // guards skip pairs that cannot improve anything this pass.
    for (let k = 0; k < n; k++) {
        const dk = dist[k];
        for (let i = 0; i < n; i++) {
            const dik = dist[i][k];
            if (dik === INF) {
                continue;
            }
            const di = dist[i];
            for (let j = 0; j < n; j++) {
                if (dk[j] === INF) {
                    continue;
                }
                const candidate = dik + dk[j];
                if (candidate < di[j]) {
                    di[j] = candidate;
                }
            }
        }
    }
    // Ascending scan with a strictly-smaller count (or equal count at a
    // larger index) implements the tie-break: greatest city number wins.
    let bestCity = -1;
    let bestCount = INF;
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (j !== i && dist[i][j] <= distanceThreshold) {
                count++;
            }
        }
        if (count < bestCount || (count === bestCount && i > bestCity)) {
            bestCity = i;
            bestCount = count;
        }
    }
    return bestCity;
};
