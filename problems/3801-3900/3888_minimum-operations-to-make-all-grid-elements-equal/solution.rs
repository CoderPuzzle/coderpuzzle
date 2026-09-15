impl Solution {
    pub fn min_operations(grid: Vec<Vec<i32>>, k: i32) -> i64 {
        let m = grid.len();
        let n = grid[0].len();
        let k = k as usize;
        // Every operation count is an affine function A*T + B of the target
        // T, with A always 0 or 1. Two 2D prefix sums answer the "coverage
        // from already-placed blocks" query for each cell in O(1).
        let mut pa = vec![vec![0i64; n + 1]; m + 1];
        let mut pb = vec![vec![0i64; n + 1]; m + 1];
        let mut has_fixed = false;
        let mut fixed_t = 0i64; // T fixed by a boundary cell
        let mut has_low = false;
        let mut low_t = 0i64; // lower bound on T from X >= 0 (A == 1 cells)
        let mut sum_a = 0i64;
        let mut sum_b = 0i64;
        for i in 0..m {
            for j in 0..n {
                let r1 = i.saturating_sub(k - 1);
                let c1 = j.saturating_sub(k - 1);
                // The two rectangles are empty on the first row / column;
                // `i - 1` would underflow there, so guard them explicitly.
                let cov_a = if i > 0 { Self::rect(&pa, r1, i - 1, c1, j) } else { 0 }
                    + if j > 0 { Self::rect(&pa, i, i, c1, j - 1) } else { 0 };
                let cov_b = if i > 0 { Self::rect(&pb, r1, i - 1, c1, j) } else { 0 }
                    + if j > 0 { Self::rect(&pb, i, i, c1, j - 1) } else { 0 };
                let (a, b);
                if i + k <= m && j + k <= n {
                    a = 1 - cov_a;
                    b = -(grid[i][j] as i64) - cov_b;
                    if a == 1 {
                        if !has_low || -b > low_t {
                            low_t = -b;
                            has_low = true;
                        }
                    } else if a == 0 {
                        if b < 0 {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    sum_a += a;
                    sum_b += b;
                } else {
                    // Boundary cell: grid[i][j] + cov must equal T.
                    if cov_a == 1 {
                        if (grid[i][j] as i64) + cov_b != 0 {
                            return -1;
                        }
                    } else if cov_a == 0 {
                        let t = (grid[i][j] as i64) + cov_b;
                        if !has_fixed {
                            has_fixed = true;
                            fixed_t = t;
                        } else if fixed_t != t {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    a = 0;
                    b = 0;
                }
                pa[i + 1][j + 1] = pa[i][j + 1] + pa[i + 1][j] - pa[i][j] + a;
                pb[i + 1][j + 1] = pb[i][j + 1] + pb[i + 1][j] - pb[i][j] + b;
            }
        }
        if has_fixed {
            if has_low && fixed_t < low_t {
                return -1;
            }
            return sum_a * fixed_t + sum_b;
        }
        let t = if has_low { low_t } else { 0 };
        sum_a * t + sum_b
    }

    fn rect(p: &[Vec<i64>], r1: usize, r2: usize, c1: usize, c2: usize) -> i64 {
        if r1 > r2 || c1 > c2 {
            return 0;
        }
        p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1]
    }
}
