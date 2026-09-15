impl Solution {
    pub fn kth_smallest(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = matrix.len();
        let count_le = |x: i64| -> i64 {
            // Staircase walk from bottom-left: elements <= x.
            let mut count: i64 = 0;
            let mut row = n as isize - 1;
            let mut col: usize = 0;
            while row >= 0 && col < n {
                if matrix[row as usize][col] as i64 <= x {
                    count += row as i64 + 1;
                    col += 1;
                } else {
                    row -= 1;
                }
            }
            count
        };
        let mut lo = matrix[0][0] as i64;
        let mut hi = matrix[n - 1][n - 1] as i64;
        while lo < hi {
            let mid = lo + (hi - lo) / 2; // floor of (lo + hi) / 2
            if count_le(mid) >= k as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
