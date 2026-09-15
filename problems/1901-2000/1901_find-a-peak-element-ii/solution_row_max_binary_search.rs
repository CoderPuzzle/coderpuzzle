impl Solution {
    pub fn find_peak_grid(mat: Vec<Vec<i32>>) -> Vec<i32> {
        let m = mat.len();
        let n = mat[0].len();
        let (mut lo, mut hi) = (0i64, m as i64 - 1);
        while lo <= hi {
            let mid = ((lo + hi) / 2) as usize;
            let row = &mat[mid];
            // Row maximum: already beats its left/right neighbors, so only the
            // vertical direction can disqualify it.
            let mut j = 0usize;
            for c in 1..n {
                if row[c] > row[j] {
                    j = c;
                }
            }
            // -1 perimeter outside the grid stands in for out-of-range neighbors.
            let up = if mid > 0 { mat[mid - 1][j] } else { -1 };
            let down = if mid < m - 1 { mat[mid + 1][j] } else { -1 };
            if row[j] > up && row[j] > down {
                return vec![mid as i32, j as i32];
            }
            // Recurse toward the larger vertical neighbor: that half's maximum is a
            // peak of the whole matrix, so the answer cannot be lost.
            if up > row[j] {
                hi = mid as i64 - 1;
            } else {
                lo = mid as i64 + 1;
            }
        }
        Vec::new()
    }
}
