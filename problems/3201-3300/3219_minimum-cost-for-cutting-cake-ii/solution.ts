function minimumCost(m: number, n: number, horizontalCut: number[], verticalCut: number[]): number {
    // Each line is priced once per perpendicular strip alive when it is
    // cut, and swapping two adjacent cuts of different families changes
    // the total by (cheaper - more expensive), so an optimal schedule
    // always takes the globally most expensive remaining line. Merge both
    // arrays largest-first, charging each horizontal cut times the current
    // vertical strip count and vice versa. Totals stay near 2 * 10^13,
    // exact in doubles.
    horizontalCut.sort((a, b) => a - b);
    verticalCut.sort((a, b) => a - b);
    let total = 0;
    let rowPieces = 1;
    let colPieces = 1;
    let i = m - 2;
    let j = n - 2;
    while (i >= 0 || j >= 0) {
        if (j < 0 || (i >= 0 && horizontalCut[i] >= verticalCut[j])) {
            total += horizontalCut[i] * colPieces;
            i--;
            rowPieces++;
        } else {
            total += verticalCut[j] * rowPieces;
            j--;
            colPieces++;
        }
    }
    return total;
}
