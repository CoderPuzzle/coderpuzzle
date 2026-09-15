function maxMatrixSum(matrix: number[][]): number {
    // Each operation flips two border-adjacent cells, so the parity of the
    // negative count is invariant: an even count makes every value positive,
    // an odd count must leave the smallest-magnitude value negative. The
    // total stays below 250 * 250 * 1e5 = 6.25e9 < 2^53, so Number is exact.
    let total = 0;
    let negatives = 0;
    let smallest = 100000;
    for (const row of matrix) {
        for (const value of row) {
            total += Math.abs(value);
            if (value < 0) ++negatives;
            smallest = Math.min(smallest, Math.abs(value));
        }
    }
    if (negatives % 2) total -= 2 * smallest;
    return total;
}
