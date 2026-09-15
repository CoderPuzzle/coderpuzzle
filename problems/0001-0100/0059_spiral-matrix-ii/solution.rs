impl Solution {
    pub fn generate_matrix(n: i32) -> Vec<Vec<i32>> {
        // Boundary-shrinking walk: fill the ring of the matrix that is left —
        // top row, right column, bottom row, left column — with the next run of
        // consecutive values, then shrink every boundary inward by one and
        // repeat until every cell is written.
        let size = n as usize;
        let mut matrix = vec![vec![0; size]; size];
        let (mut top, mut bottom) = (0usize, size - 1);
        let (mut left, mut right) = (0usize, size - 1);
        let mut value: i32 = 1;
        while value <= n * n {
            for column in left..=right {
                matrix[top][column] = value;
                value += 1;
            }
            for row in top + 1..=bottom {
                matrix[row][right] = value;
                value += 1;
            }
            if top != bottom {
                // Leftwards along the bottom row, stopping before the corner
                // the right-column run already filled.
                for column in (left..right).rev() {
                    matrix[bottom][column] = value;
                    value += 1;
                }
            }
            if left != right {
                // Upwards along the left column, stopping before the corner
                // the top-row run already filled.
                for row in (top + 1..bottom).rev() {
                    matrix[row][left] = value;
                    value += 1;
                }
            }
            top += 1;
            bottom = bottom.saturating_sub(1);
            left += 1;
            right = right.saturating_sub(1);
        }
        matrix
    }
}
