function matrixMedian(grid: number[][]): number {
    const m = grid.length,
        n = grid[0].length;
    // Odd element count, so the median is the floor(m*n/2)+1-th smallest
    // value — an actual matrix entry, returned exactly.
    const need = Math.floor((m * n) / 2) + 1;
    // Binary-search the value itself between the smallest row head and
    // the largest row tail.
    let lo = Infinity,
        hi = -Infinity;
    for (const row of grid) {
        lo = Math.min(lo, row[0]);
        hi = Math.max(hi, row[n - 1]);
    }

    function countLe(x: number): number {
        // Each row is sorted, so a binary search counts its <=x entries in
        // O(log n); row counts add up across the matrix.
        let total = 0;
        for (const row of grid) {
            let a = 0,
                b = row.length;
            while (a < b) {
                const mid = (a + b) >> 1;
                if (row[mid] <= x) a = mid + 1;
                else b = mid;
            }
            total += a;
        }
        return total;
    }

    // Find the smallest x with countLe(x) >= need. It must occur in the
    // matrix, else the counts at x and x-1 would be equal.
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countLe(mid) >= need) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
