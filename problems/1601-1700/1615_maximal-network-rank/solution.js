/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function (n, roads) {
    const degree = new Array(n).fill(0);
    const connected = new Set();
    for (const [a, b] of roads) {
        degree[a]++;
        degree[b]++;
        connected.add(`${Math.min(a, b)},${Math.max(a, b)}`);
    }

    let best = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let rank = degree[i] + degree[j];
            if (connected.has(`${i},${j}`)) {
                rank--;
            }
            if (rank > best) {
                best = rank;
            }
        }
    }
    return best;
};
