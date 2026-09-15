function findDiagonalOrder(mat: number[][]): number[] {
    // Every anti-diagonal is the set of cells with i + j == d; walk the
    // diagonals in increasing d and let d's parity pick the direction.
    const m = mat.length;
    const n = mat[0].length;
    const order: number[] = [];
    for (let d = 0; d < m + n - 1; ++d) {
        // Rows on diagonal d: the column d - i stays in range exactly for
        // i between max(0, d - n + 1) and min(d, m - 1).
        const low = Math.max(0, d - n + 1);
        const high = Math.min(d, m - 1);
        if (d % 2 === 0) {
            // Even diagonal: read it upward, bottom row first.
            for (let i = high; i >= low; --i) {
                order.push(mat[i][d - i]);
            }
        } else {
            // Odd diagonal: read it downward, top row first.
            for (let i = low; i <= high; ++i) {
                order.push(mat[i][d - i]);
            }
        }
    }
    return order;
}
