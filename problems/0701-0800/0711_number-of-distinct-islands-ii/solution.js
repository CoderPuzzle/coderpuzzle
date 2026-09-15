/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands2 = function (grid) {
    // Flood-fill each island with an explicit stack, then name the shape by
    // the smallest normalized cell serialization among its eight rotations
    // and reflections, so islands equal under the statement's rule — and only
    // those — produce one identical signature.
    const m = grid.length;
    const n = grid[0].length;
    const seen = Array.from({ length: m }, () => new Array(n).fill(false));
    const shapes = new Set();
    const sign = [1, -1];
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] !== 1 || seen[i][j]) {
                continue;
            }
            seen[i][j] = true;
            const stack = [[i, j]];
            const cells = [];
            while (stack.length > 0) {
                const [r, c] = stack.pop();
                cells.push([r, c]);
                for (const [dr, dc] of [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                ]) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1 && !seen[nr][nc]) {
                        seen[nr][nc] = true;
                        stack.push([nr, nc]);
                    }
                }
            }
            let best = "";
            for (let t = 0; t < 8; ++t) {
                const a = sign[t & 1];
                const b = sign[(t >> 1) & 1];
                const swap = (t & 4) !== 0;
                const moved = cells.map(([r, c]) => [a * (swap ? c : r), b * (swap ? r : c)]);
                let r0 = moved[0][0];
                let c0 = moved[0][1];
                for (const cell of moved) {
                    r0 = Math.min(r0, cell[0]);
                    c0 = Math.min(c0, cell[1]);
                }
                for (const cell of moved) {
                    cell[0] -= r0;
                    cell[1] -= c0;
                }
                moved.sort((x, y) => (x[0] !== y[0] ? x[0] - y[0] : x[1] - y[1]));
                const key = moved.map((cell) => cell.join(",")).join(";");
                if (best === "" || key < best) {
                    best = key;
                }
            }
            shapes.add(best);
        }
    }
    return shapes.size;
};
