/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumMinimumPath = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    // Kruskal-style admission: switch cells on biggest-first and stop the
    // moment the two corners join one admitted component -- the value of the
    // cell admitted last is the widest bottleneck any walk can hold.
    const cells = [];
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            cells.push([grid[r][c], r, c]);
        }
    }
    // Falling order of value: the biggest cells are admitted first.
    cells.sort((a, b) => b[0] - a[0]);
    const total = rows * cols;
    // parent[i] is -1 while cell i is unadmitted, else its union-find parent.
    const parent = new Array(total).fill(-1);
    // An unadmitted cell is its own isolated root; path halving inside find
    // keeps the forest nearly flat.
    const find = (i) => {
        if (parent[i] === -1) {
            return i;
        }
        while (parent[i] !== i) {
            parent[i] = parent[parent[i]];
            i = parent[i];
        }
        return i;
    };
    const union = (a, b) => {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
        }
    };

    for (const [value, r, c] of cells) {
        const idx = r * cols + c;
        // Admit the cell: it becomes its own root, then merges with every
        // already-admitted neighbour.
        parent[idx] = idx;
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && parent[nr * cols + nc] !== -1) {
                union(idx, nr * cols + nc);
            }
        }
        if (find(0) === find(total - 1)) {
            return value;
        }
    }
    // The full grid is connected, so the loop always returns inside.
    return 0;
};
