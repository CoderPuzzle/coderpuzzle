impl Solution {
    pub fn spiral_order(matrix: Vec<Vec<i32>>) -> Vec<i32> {
        // Boundary-shrinking walk: emit the ring of the matrix that is left —
        // top row, right column, bottom row, left column — then shrink every
        // boundary inward by one and repeat until every element is emitted.
        let rows = matrix.len();
        let columns = matrix[0].len();
        let (mut top, mut bottom) = (0usize, rows - 1);
        let (mut left, mut right) = (0usize, columns - 1);
        let mut order: Vec<i32> = Vec::with_capacity(rows * columns);
        while order.len() < rows * columns {
            for column in left..=right {
                order.push(matrix[top][column]);
            }
            for row in top + 1..=bottom {
                order.push(matrix[row][right]);
            }
            if top != bottom {
                // Leftwards along the bottom row, stopping before the corner
                // the right-column run already emitted.
                for column in (left..right).rev() {
                    order.push(matrix[bottom][column]);
                }
            }
            if left != right {
                // Upwards along the left column, stopping before the corner
                // the top-row run already emitted.
                for row in (top + 1..bottom).rev() {
                    order.push(matrix[row][left]);
                }
            }
            top += 1;
            bottom = bottom.saturating_sub(1);
            left += 1;
            right = right.saturating_sub(1);
        }
        order
    }
}
