impl Solution {
    pub fn set_zeroes(mut matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Ownership hands over the whole allocation, so the marker sweep
        // rewrites it in place — no second matrix is ever built.
        let m = matrix.len();
        let n = matrix[0].len();
        // The first row and column double as the marker zone, so their own
        // fate must be saved in two flags before any marker is written.
        let first_row_zero = matrix[0].iter().any(|&value| value == 0);
        let first_col_zero = (0..m).any(|i| matrix[i][0] == 0);
        // First pass: each interior zero stamps its row and column into the
        // marker zone (the leading cell of its row and of its column).
        for i in 1..m {
            for j in 1..n {
                if matrix[i][j] == 0 {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        // Second pass: replay the markers as wipes of interior cells only.
        // Neither sweep writes into the marker zone, so the markers stay
        // readable until both have consumed them.
        for i in 1..m {
            if matrix[i][0] == 0 {
                for j in 1..n {
                    matrix[i][j] = 0;
                }
            }
        }
        for j in 1..n {
            if matrix[0][j] == 0 {
                for i in 1..m {
                    matrix[i][j] = 0;
                }
            }
        }
        // The saved flags apply last, zeroing the marker zone itself — a
        // marker must never be mistaken for an original zero of row 0/col 0.
        if first_row_zero {
            for cell in matrix[0].iter_mut() {
                *cell = 0;
            }
        }
        if first_col_zero {
            for row in matrix.iter_mut() {
                row[0] = 0;
            }
        }
        matrix
    }
}
