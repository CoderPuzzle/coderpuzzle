/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function (row, col, cells) {
    const n = row * col;
    const top = n; // virtual sentinel: one node per shore
    const bottom = n + 1;
    const parent = new Array(n + 2);
    const size = new Array(n + 2).fill(1);
    for (let i = 0; i < n + 2; i++) {
        parent[i] = i;
    }
    const active = new Array(row);
    for (let r = 0; r < row; r++) {
        active[r] = new Array(col).fill(false);
    }
    const find = (x) => {
        // Path halving keeps the trees flat without a second pass.
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a, b) => {
        let rootA = find(a);
        let rootB = find(b);
        if (rootA === rootB) return;
        // Union by size: hang the smaller tree under the larger.
        if (size[rootA] < size[rootB]) {
            [rootA, rootB] = [rootB, rootA];
        }
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
    };
    // Walk the days backwards: one cell of land reappears per step, so
    // connectivity only grows. After absorbing cells[i] the grid state is
    // exactly "day i" (cells[:i] still flooded), so the first moment the
    // shores share a root, day i is the last crossable day.
    for (let i = n - 1; i >= 0; i--) {
        const r = cells[i][0] - 1;
        const c = cells[i][1] - 1;
        active[r][c] = true;
        const land = r * col + c;
        if (r === 0) union(land, top);
        if (r === row - 1) union(land, bottom);
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < row && nc >= 0 && nc < col && active[nr][nc]) {
                union(land, nr * col + nc);
            }
        }
        if (find(top) === find(bottom)) return i; // the shores just met
    }
    return 0; // unreachable: with row, col >= 2 even day 1 always crosses
};
