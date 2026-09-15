impl Solution {
    // Sweep row by row. run[j] is the longest non-increasing run of cells
    // <= k ending at column j in the current row, so a column span of
    // width w ending at j is row-valid exactly when run[j] >= w. Per
    // column, a monotonic stack of the run lengths seen so far keeps the
    // running sum of minima over every stack segment; that sum counts the
    // submatrices whose bottom-right corner is the current cell. The count
    // reaches C(m+1,2)*C(n+1,2) ~ 2.5*10^11, past 32 bits, so the sums
    // live in i64.
    pub fn count_submatrices(grid: Vec<Vec<i32>>, k: i32) -> i64 {
        let m = grid.len();
        let n = grid[0].len();
        let mut stack_val = vec![0i32; m * n];
        let mut stack_wid = vec![0i32; m * n];
        let mut tops = vec![0usize; n];
        let mut sums = vec![0i64; n];
        let mut total = 0i64;
        for row in grid.iter() {
            let (mut prev_val, mut prev_run) = (0i32, 0i32);
            for j in 0..n {
                let v = row[j];
                let r = if v > k {
                    0
                } else if prev_run > 0 && prev_val >= v {
                    prev_run + 1
                } else {
                    1
                };
                let base = j * m;
                let mut t = tops[j];
                let mut s = sums[j];
                let mut w = 1i64;
                while t > 0 && stack_val[base + t - 1] >= r {
                    t -= 1;
                    s -= stack_val[base + t] as i64 * stack_wid[base + t] as i64;
                    w += stack_wid[base + t] as i64;
                }
                stack_val[base + t] = r;
                stack_wid[base + t] = w as i32;
                tops[j] = t + 1;
                s += r as i64 * w;
                sums[j] = s;
                total += s;
                prev_val = v;
                prev_run = r;
            }
        }
        total
    }
}
