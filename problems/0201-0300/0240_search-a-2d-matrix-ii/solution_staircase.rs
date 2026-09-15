impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        if matrix.is_empty() || matrix[0].is_empty() {
            return false;
        }
        // Start at the top-right corner: largest in its row and smallest in
        // its column, so one comparison eliminates a whole row or column.
        let mut row = 0usize;
        let mut col = matrix[0].len() as isize - 1;
        while row < matrix.len() && col >= 0 {
            let value = matrix[row][col as usize];
            if value == target {
                return true;
            }
            // Everything below in this column is even larger, so discard
            // the whole column by moving left.
            if value > target {
                col -= 1;
            } else {
                // Everything to the left in this row is even smaller, so
                // discard the whole row by moving down.
                row += 1;
            }
        }
        // Fell off the left or bottom edge: nothing plausible remains, so
        // the target is absent — after at most m + n - 1 staircase steps.
        false
    }
}
