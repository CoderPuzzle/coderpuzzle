function generateMatrix(n: number): number[][] {
    // Boundary-shrinking walk: fill the ring of the matrix that is left —
    // top row, right column, bottom row, left column — with the next run of
    // consecutive values, then shrink every boundary inward by one and
    // repeat until every cell is written.
    const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;
    let value = 1;
    while (value <= n * n) {
        for (let column = left; column <= right; ++column) {
            matrix[top][column] = value++;
        }
        for (let row = top + 1; row <= bottom; ++row) {
            matrix[row][right] = value++;
        }
        if (top !== bottom) {
            // Leftwards along the bottom row, stopping before the corner
            // the right-column run already filled.
            for (let column = right - 1; column >= left; --column) {
                matrix[bottom][column] = value++;
            }
        }
        if (left !== right) {
            // Upwards along the left column, stopping before the corner
            // the top-row run already filled.
            for (let row = bottom - 1; row > top; --row) {
                matrix[row][left] = value++;
            }
        }
        ++top;
        --bottom;
        ++left;
        --right;
    }
    return matrix;
}
