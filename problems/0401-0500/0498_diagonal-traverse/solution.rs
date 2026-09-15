impl Solution {
    pub fn find_diagonal_order(mat: Vec<Vec<i32>>) -> Vec<i32> {
        // Every anti-diagonal is the set of cells with i + j == d; walk the
        // diagonals in increasing d and let d's parity pick the direction.
        let m = mat.len();
        let n = mat[0].len();
        let mut order = Vec::with_capacity(m * n);
        for d in 0..m + n - 1 {
            // Rows on diagonal d: the column d - i stays in range exactly for
            // i between max(0, d - n + 1) and min(d, m - 1).
            let low = d.saturating_sub(n - 1);
            let high = d.min(m - 1);
            if d % 2 == 0 {
                // Even diagonal: read it upward, bottom row first.
                for i in (low..=high).rev() {
                    order.push(mat[i][d - i]);
                }
            } else {
                // Odd diagonal: read it downward, top row first.
                for i in low..=high {
                    order.push(mat[i][d - i]);
                }
            }
        }
        order
    }
}
