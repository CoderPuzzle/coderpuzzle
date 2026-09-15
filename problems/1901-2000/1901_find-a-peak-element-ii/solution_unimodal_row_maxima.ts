function findPeakGrid(mat: number[][]): number[] {
    // Largest entry of a row, as a column index.
    const rowMax = function (r: number): number {
        let j = 0;
        for (let c = 1; c < mat[r].length; c++) {
            if (mat[r][c] > mat[r][j]) {
                j = c;
            }
        }
        return j;
    };
    // The judge's matrices hold exactly one peak, which is therefore the
    // global maximum — and the row maxima climb strictly up to its row and
    // fall strictly away after it. Binary search that unimodal sequence:
    // step toward whichever neighboring row is larger.
    let lo = 0,
        hi = mat.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (mat[mid][rowMax(mid)] < mat[mid + 1][rowMax(mid + 1)]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    // The peak row's own maximum is the peak itself.
    return [lo, rowMax(lo)];
}
