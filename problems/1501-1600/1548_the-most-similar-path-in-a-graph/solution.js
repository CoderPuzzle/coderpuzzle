/**
 * @param {number} n
 * @param {number[][]} roads
 * @param {string[]} names
 * @param {string[]} targetPath
 * @return {number[]}
 */
var mostSimilar = function (n, roads, names, targetPath) {
    const adjacency = Array.from({ length: n }, () => []);
    for (const [a, b] of roads) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    const pathLength = targetPath.length;
    const dp = Array.from({ length: pathLength }, () => new Array(n).fill(0));
    const parent = Array.from({ length: pathLength }, () => new Array(n).fill(-1));
    for (let city = 0; city < n; ++city) {
        dp[0][city] = names[city] === targetPath[0] ? 0 : 1;
    }

    for (let i = 1; i < pathLength; ++i) {
        for (let city = 0; city < n; ++city) {
            let bestParent = -1;
            let bestCost = -1;
            for (const neighbor of adjacency[city]) {
                const candidate = dp[i - 1][neighbor];
                if (bestParent === -1 || candidate < bestCost) {
                    bestCost = candidate;
                    bestParent = neighbor;
                }
            }
            const mismatchCost = names[city] === targetPath[i] ? 0 : 1;
            dp[i][city] = bestCost + mismatchCost;
            parent[i][city] = bestParent;
        }
    }

    let endCity = 0;
    for (let city = 1; city < n; ++city) {
        if (dp[pathLength - 1][city] < dp[pathLength - 1][endCity]) endCity = city;
    }

    const path = new Array(pathLength).fill(0);
    let city = endCity;
    for (let i = pathLength - 1; i >= 0; --i) {
        path[i] = city;
        city = parent[i][city];
    }
    return path;
};
