/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var isPossibleToCutPath = function (grid) {
    // Only a 1->0 flip can ever help, so the game is decided by vertex
    // cuts of the monotone 1-cell DAG: at most one flip succeeds exactly
    // when fewer than two vertex-disjoint corner-to-corner paths exist
    // (Menger). Unit vertex capacities come from the standard in/out
    // split; cells off any root-to-corner route are skipped outright.
    // Augmenting BFS stops early once flow 2 proves the answer false, so
    // at most two searches ever run. Every id and cap stays <= ~10^5,
    // far below Number precision limits.
    const m = grid.length;
    const n = grid[0].length;
    const count = m * n;
    const inf = count + 2;
    const arcsTo = [];
    const arcsCap = [];
    const graph = new Array(2 * count);
    for (let v = 0; v < graph.length; ++v) graph[v] = [];
    const connect = (u, v, cap) => {
        graph[u].push(arcsTo.length);
        arcsTo.push(v);
        arcsCap.push(cap);
        graph[v].push(arcsTo.length);
        arcsTo.push(u);
        arcsCap.push(0);
    };
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === 0) continue;
            const cell = i * n + j;
            const corner = (i === 0 && j === 0) || (i === m - 1 && j === n - 1);
            connect(2 * cell, 2 * cell + 1, corner ? inf : 1);
            if (j + 1 < n && grid[i][j + 1] === 1) connect(2 * cell + 1, 2 * (cell + 1), inf);
            if (i + 1 < m && grid[i + 1][j] === 1) connect(2 * cell + 1, 2 * (cell + n), inf);
        }
    }
    const source = 0;
    const sink = 2 * (count - 1) + 1;
    let total = 0;
    while (total < 2) {
        const parent = new Array(2 * count).fill(-1);
        const via = new Array(2 * count).fill(-1);
        const queue = [source];
        parent[source] = source;
        let head = 0;
        while (head < queue.length && parent[sink] === -1) {
            const u = queue[head++];
            for (const e of graph[u]) {
                if (parent[sink] !== -1) break;
                const v = arcsTo[e];
                if (arcsCap[e] > 0 && parent[v] === -1) {
                    parent[v] = u;
                    via[v] = e;
                    queue.push(v);
                }
            }
        }
        if (parent[sink] === -1) break;
        let v = sink;
        while (v !== source) {
            const e = via[v];
            --arcsCap[e];
            ++arcsCap[e ^ 1];
            v = parent[v];
        }
        ++total;
    }
    return total < 2;
};
