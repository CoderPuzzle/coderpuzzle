impl Solution {
    pub fn num_submat(mat: Vec<Vec<i32>>) -> i32 {
        let m = mat.len();
        let n = if m > 0 { mat[0].len() } else { 0 };
        let mut total: i32 = 0;
        // height[c]: run of consecutive ones ending at the current row in
        // column c — extended by a one, reset to zero by a zero.
        let mut height = vec![0i32; n];
        for r in 0..m {
            for c in 0..n {
                if mat[r][c] == 1 {
                    height[c] += 1;
                } else {
                    height[c] = 0;
                }
            }
            // Anchor submatrices at their bottom row: a span [left, right]
            // admits exactly min(height) of them (every height up to the
            // minimum works), and each submatrix has a unique bottom row and
            // span, so nothing is double-counted.
            for left in 0..n {
                let mut min_h = height[left];
                // Widening the span can only lower the minimum, so one
                // running variable tracks it.
                for right in left..n {
                    if height[right] < min_h {
                        min_h = height[right];
                    }
                    total += min_h;
                }
            }
        }
        total
    }
}
