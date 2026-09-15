impl Solution {
    pub fn min_abs_diff(grid: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        // Sorting a window's k*k values places the closest pair of distinct
        // values next to each other, so the smallest adjacent gap in the
        // sorted order is the minimum |a - b|; duplicate values contribute
        // a zero gap, and a k == 1 window has no pair, hence the 0 default.
        let m = grid.len();
        let n = grid[0].len();
        let k = k as usize;
        let mut answer = vec![vec![0; n - k + 1]; m - k + 1];
        for i in 0..=m - k {
            for j in 0..=n - k {
                let mut window: Vec<i32> = Vec::with_capacity(k * k);
                for r in i..i + k {
                    for c in j..j + k {
                        window.push(grid[r][c]);
                    }
                }
                window.sort_unstable();
                let mut best = 0;
                if k > 1 {
                    best = window[1] - window[0];
                    for t in 2..k * k {
                        best = best.min(window[t] - window[t - 1]);
                    }
                }
                answer[i][j] = best;
            }
        }
        answer
    }
}
