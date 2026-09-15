impl Solution {
    // Four prefix tables; per-window line sums are O(1).
    pub fn largest_magic_square(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut rs = vec![vec![0i64; n + 1]; m + 1];
        let mut cs = vec![vec![0i64; n + 1]; m + 1];
        let mut d1 = vec![vec![0i64; n + 2]; m + 1];
        let mut a2 = vec![vec![0i64; n + 2]; m + 1];
        for i in 1..=m {
            for j in 1..=n {
                let v = grid[i - 1][j - 1] as i64;
                rs[i][j] = rs[i][j - 1] + v;
                cs[i][j] = cs[i - 1][j] + v;
                d1[i][j] = v + d1[i - 1][j - 1];
            }
        }
        for i in 1..=m {
            for j in (1..=n).rev() {
                a2[i][j] = grid[i - 1][j - 1] as i64 + a2[i - 1][j + 1];
            }
        }
        let rsum = |i: usize, j: usize, k: usize| rs[i + 1][j + k] - rs[i + 1][j];
        let csum = |i: usize, j: usize, k: usize| cs[i + k][j + 1] - cs[i][j + 1];
        for k in (1..=m.min(n)).rev() {
            for i in 0..=(m - k) {
                for j in 0..=(n - k) {
                    let s = rsum(i, j, k);
                    let mut ok = true;
                    for t in 1..k {
                        ok &= rsum(i + t, j, k) == s;
                    }
                    for t in 0..k {
                        ok &= csum(i, j + t, k) == s;
                    }
                    ok &= d1[i + k][j + k] - d1[i][j] == s;
                    ok &= a2[i + k][j + 1] - a2[i][j + 1 + k] == s;
                    if ok {
                        return k as i32;
                    }
                }
            }
        }
        unreachable!() // k = 1 is always magic
    }
}
