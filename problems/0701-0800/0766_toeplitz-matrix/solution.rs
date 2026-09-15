// A diagonal from top-left to bottom-right is constant exactly when
// every cell equals its top-left neighbor — that neighbor is the
// previous cell of the same diagonal, so a break anywhere on a diagonal
// surfaces as one failed neighbor check. Cells in row 0 and column 0
// start their diagonals and have no top-left neighbor, so the sweep
// opens at row 1, column 1.
impl Solution {
    pub fn is_toeplitz_matrix(matrix: Vec<Vec<i32>>) -> bool {
        for r in 1..matrix.len() {
            for c in 1..matrix[r].len() {
                if matrix[r][c] != matrix[r - 1][c - 1] {
                    return false;
                }
            }
        }
        true
    }
}
