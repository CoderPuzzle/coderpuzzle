impl Solution {
    pub fn rotate(mut matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Ownership hands over the whole allocation, so both swap passes
        // rewrite it in place — no second matrix is ever built.
        let n = matrix.len();
        // The strict upper triangle holds each transpose pair exactly once;
        // walking the full square would swap every pair twice and undo itself.
        // The two cells live in distinct rows, which the borrow checker
        // cannot see, so the swap goes through a temporary instead of
        // borrowing both sides mutably at once.
        for i in 0..n {
            for j in (i + 1)..n {
                let temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Column j of the transpose reads row j of the input, so reversing
        // each row lays it out bottom-up — precisely the quarter turn.
        for row in matrix.iter_mut() {
            row.reverse();
        }
        matrix
    }
}
