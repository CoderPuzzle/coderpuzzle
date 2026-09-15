function spiralOrder(matrix: number[][]): number[] {
    // Boundary-shrinking walk: emit the ring of the matrix that is left —
    // top row, right column, bottom row, left column — then shrink every
    // boundary inward by one and repeat until every element is emitted.
    const rows = matrix.length;
    const columns = matrix[0].length;
    let top = 0;
    let bottom = rows - 1;
    let left = 0;
    let right = columns - 1;
    const order: number[] = [];
    while (order.length < rows * columns) {
        for (let column = left; column <= right; ++column) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; ++row) {
            order.push(matrix[row][right]);
        }
        if (top !== bottom) {
            // Leftwards along the bottom row, stopping before the corner
            // the right-column run already emitted.
            for (let column = right - 1; column >= left; --column) {
                order.push(matrix[bottom][column]);
            }
        }
        if (left !== right) {
            // Upwards along the left column, stopping before the corner
            // the top-row run already emitted.
            for (let row = bottom - 1; row > top; --row) {
                order.push(matrix[row][left]);
            }
        }
        ++top;
        --bottom;
        ++left;
        --right;
    }
    return order;
}
