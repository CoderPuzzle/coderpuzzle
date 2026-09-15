function canPartitionGrid(grid: number[][]): boolean {
    // A straight cut yields two rectangular slabs. Removing any single
    // cell from a slab spanning at least two rows and two columns keeps
    // it connected, so only slabs that are a single row or column
    // restrict the discount to their two end cells (a 1x1 slab would
    // empty out and can never match the other side's positive sum).
    // Sweep each axis twice with rolling prefix sums and a value set:
    // the forward pass tries discounting the leading slab, the backward
    // pass the trailing one. Sums reach 10^5 * 10^5 = 10^10, so they
    // are carried in doubles (exact far past 2^32, below 2^53).
    const m = grid.length;
    const n = grid[0].length;
    let total = 0;
    for (const row of grid) {
        for (const v of row) {
            total += v;
        }
    }
    const canDiscount = (d: number, a: number, b: number, vertical: boolean, seen: Set<number>): boolean => {
        if (vertical) {
            if (a === b) {
                return m > 1 && (grid[0][a] === d || grid[m - 1][a] === d);
            }
            if (m === 1) {
                return grid[0][a] === d || grid[0][b] === d;
            }
            return seen.has(d);
        }
        if (a === b) {
            return n > 1 && (grid[a][0] === d || grid[a][n - 1] === d);
        }
        if (n === 1) {
            return grid[a][0] === d || grid[b][0] === d;
        }
        return seen.has(d);
    };
    let seen = new Set<number>();
    let top = 0;
    for (let i = 0; i < m - 1; i++) {
        for (const v of grid[i]) {
            seen.add(v);
            top += v;
        }
        const bottom = total - top;
        if (top === bottom || (top > bottom && canDiscount(top - bottom, 0, i, false, seen))) {
            return true;
        }
    }
    seen = new Set<number>();
    let bottom = 0;
    for (let i = m - 1; i > 0; i--) {
        for (const v of grid[i]) {
            seen.add(v);
            bottom += v;
        }
        const top = total - bottom;
        if (top === bottom || (bottom > top && canDiscount(bottom - top, i, m - 1, false, seen))) {
            return true;
        }
    }
    seen = new Set<number>();
    let left = 0;
    for (let j = 0; j < n - 1; j++) {
        for (let r = 0; r < m; r++) {
            seen.add(grid[r][j]);
            left += grid[r][j];
        }
        const right = total - left;
        if (left === right || (left > right && canDiscount(left - right, 0, j, true, seen))) {
            return true;
        }
    }
    seen = new Set<number>();
    let right = 0;
    for (let j = n - 1; j > 0; j--) {
        for (let r = 0; r < m; r++) {
            seen.add(grid[r][j]);
            right += grid[r][j];
        }
        const left = total - right;
        if (left === right || (right > left && canDiscount(right - left, j, n - 1, true, seen))) {
            return true;
        }
    }
    return false;
}
