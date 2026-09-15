/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
    const n = grid.length;
    // Multi-source BFS from every hazard at once: wavefront exploration
    // makes dist[r][c] the minimum grid steps to the nearest hazard —
    // exactly the cell's clearance value.
    const dist = Array.from({ length: n }, () => new Array(n).fill(-1));
    let q = [];
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                dist[r][c] = 0;
                q.push([r, c]);
            }
        }
    }
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    for (let head = 0; head < q.length; head++) {
        const [r, c] = q[head];
        for (const [dr, dc] of dirs) {
            const nr = r + dr,
                nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push([nr, nc]);
            }
        }
    }

    // Kruskal-style flood: admit cells in descending clearance, uniting each
    // with its already-admitted 4-neighbors, and watch the corners. Their
    // union traces a real all-admitted path, so it can only happen at a
    // clearance the answer reaches — and the best route's bottleneck cell
    // closes it exactly, making the value being admitted the answer.
    const parent = Array.from({ length: n * n }, (_, i) => i);
    const size = new Array(n * n).fill(1);
    function find(x) {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
    const cells = [];
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            cells.push([dist[r][c], r, c]);
        }
    }
    cells.sort((a, b) => b[0] - a[0]);
    const admitted = Array.from({ length: n }, () => new Array(n).fill(false));
    for (const [v, r, c] of cells) {
        admitted[r][c] = true;
        for (const [dr, dc] of dirs) {
            const nr = r + dr,
                nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && admitted[nr][nc]) {
                let a = find(r * n + c),
                    b = find(nr * n + nc);
                if (a !== b) {
                    if (size[a] < size[b]) {
                        [a, b] = [b, a];
                    }
                    parent[b] = a;
                    size[a] += size[b];
                }
            }
        }
        if (find(0) === find(n * n - 1)) {
            return v;
        }
    }
    // The whole grid admits in the end, so the corners always unite; 0 is
    // just the fallback.
    return 0;
};
