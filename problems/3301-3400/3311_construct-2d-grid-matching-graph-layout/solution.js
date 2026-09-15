/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var constructGridLayout = function (n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
    const endpoint = adj.findIndex((list) => list.length === 1);
    if (endpoint >= 0) {
        const placed = new Array(n).fill(false);
        const row = [endpoint];
        placed[endpoint] = true;
        while (true) {
            let next = -1;
            for (const u of adj[row[row.length - 1]]) {
                if (!placed[u]) {
                    next = u;
                }
            }
            if (next < 0) {
                break;
            }
            row.push(next);
            placed[next] = true;
        }
        return [row];
    }

    // Both dimensions >= 2: corners are exactly the degree-2 nodes, and
    // edges = 2n - (rows + cols), so rows + cols is known from n and E.
    const corner = adj.findIndex((list) => list.length === 2);
    const dimsSum = 2 * n - edges.length;
    let rows = 0;
    let cols = 0;
    for (let t = 1; t < dimsSum; t++) {
        if (t * (dimsSum - t) === n) {
            rows = t;
            cols = dimsSum - t;
            break;
        }
    }
    for (const first of adj[corner]) {
        const grid = build(adj, corner, first, rows, cols);
        if (grid !== null) {
            return grid;
        }
    }
    return [];
};

function build(adj, corner, first, rows, cols) {
    const n = adj.length;
    const placed = new Array(n).fill(false);
    const row0 = [corner, first];
    placed[corner] = true;
    placed[first] = true;
    while (row0.length < cols) {
        const w = row0[row0.length - 1];
        const p = row0[row0.length - 2];
        let next = -1;
        for (const u of adj[w]) {
            if (placed[u] || u === p) {
                continue;
            }
            if (sharesNeighbor(adj, u, p, w)) {
                continue;
            }
            if (next >= 0) {
                return null;
            }
            next = u;
        }
        if (next < 0) {
            return null;
        }
        row0.push(next);
        placed[next] = true;
    }

    const grid = [row0];
    while (grid.length < rows) {
        const prev = grid[grid.length - 1];
        const row = [];
        let start = -1;
        for (const u of adj[prev[0]]) {
            if (!placed[u]) {
                if (start >= 0) {
                    return null;
                }
                start = u;
            }
        }
        if (start < 0) {
            return null;
        }
        row.push(start);
        placed[start] = true;
        for (let j = 1; j < cols; j++) {
            let hit = -1;
            for (const u of adj[row[j - 1]]) {
                if (placed[u] || !adj[prev[j]].includes(u)) {
                    continue;
                }
                if (hit >= 0) {
                    return null;
                }
                hit = u;
            }
            if (hit < 0) {
                return null;
            }
            row.push(hit);
            placed[hit] = true;
        }
        grid.push(row);
    }
    if (!placed.every((flag) => flag)) {
        return null;
    }
    return grid;
}

function sharesNeighbor(adj, u, p, w) {
    for (const z of adj[u]) {
        if (z === w) {
            continue;
        }
        for (const x of adj[p]) {
            if (z === x) {
                return true;
            }
        }
    }
    return false;
}
