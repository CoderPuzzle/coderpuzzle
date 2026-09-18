class NumMatrix {
    constructor(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        // Integral image: prefix[r][c] sums rows 0..r-1 and columns
        // 0..c-1. The guard row and column of zeros remove every
        // boundary special case from the index arithmetic.
        this.prefix = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Inclusion-exclusion over three already-computed
                // neighbors; the top-left term is subtracted because
                // both the row strip and column strip contain it.
                this.prefix[r + 1][c + 1] =
                    matrix[r][c] + this.prefix[r][c + 1] + this.prefix[r + 1][c] - this.prefix[r][c];
            }
        }
    }

    sumRegion(top, left, bottom, right) {
        // The same inclusion-exclusion in reverse: the strips above and
        // left of the query cancel, leaving the rectangle in O(1).
        const prefix = this.prefix;
        return prefix[bottom + 1][right + 1] - prefix[top][right + 1] - prefix[bottom + 1][left] + prefix[top][left];
    }
}
