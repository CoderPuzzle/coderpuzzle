// Construction indexes where every value lives; each query looks the value
// up once and adds its four in-bounds neighbors straight off the grid.
// Distinct values make the index exact, and edge cells simply find fewer
// in-bounds neighbors — no corner or border special cases.
class NeighborSum {
    constructor(grid) {
        // One walk builds the whole index: values are distinct and run
        // 0..n*n-1, so each value's cell can be stored at its own slot.
        this.grid = grid;
        this.n = grid.length;
        this.rowOf = new Array(this.n * this.n).fill(0);
        this.colOf = new Array(this.n * this.n).fill(0);
        for (let r = 0; r < this.n; r++) {
            for (let c = 0; c < this.n; c++) {
                this.rowOf[grid[r][c]] = r;
                this.colOf[grid[r][c]] = c;
            }
        }
    }

    adjacentSum(value) {
        return this.sumAround(value, [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ]);
    }

    diagonalSum(value) {
        return this.sumAround(value, [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ]);
    }

    sumAround(value, offsets) {
        const r = this.rowOf[value];
        const c = this.colOf[value];
        let total = 0;
        for (const [dr, dc] of offsets) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < this.n && nc >= 0 && nc < this.n) {
                total += this.grid[nr][nc];
            }
        }
        return total;
    }
}
