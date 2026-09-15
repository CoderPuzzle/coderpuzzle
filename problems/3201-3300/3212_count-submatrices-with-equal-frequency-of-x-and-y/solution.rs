impl Solution {
    pub fn number_of_submatrices(grid: Vec<Vec<String>>) -> i32 {
        // Every counted submatrix contains grid[0][0], so each candidate is
        // exactly the top-left rectangle ending at some cell. A running sum
        // over the current row plus the previous row's prefix sums gives each
        // rectangle's signed balance (X = +1, Y = -1); a parallel vector gives
        // its X-count. Count cells whose balance is zero but which hold at
        // least one X.
        let cols = grid[0].len();
        let mut prev_sum = vec![0i32; cols];
        let mut prev_x = vec![0i32; cols];
        let mut total = 0i32;
        for (r, row) in grid.iter().enumerate() {
            let mut cur_sum = vec![0i32; cols];
            let mut cur_x = vec![0i32; cols];
            let mut run_sum = 0i32;
            let mut run_x = 0i32;
            let above = r > 0;
            for c in 0..cols {
                let cell = row[c].as_bytes()[0];
                if cell == b'X' {
                    run_sum += 1;
                    run_x += 1;
                } else if cell == b'Y' {
                    run_sum -= 1;
                }
                let s = if above { run_sum + prev_sum[c] } else { run_sum };
                let x = if above { run_x + prev_x[c] } else { run_x };
                // rect(r, c) = row-run + rect(r - 1, c).
                cur_sum[c] = s;
                cur_x[c] = x;
                if s == 0 && x > 0 {
                    total += 1;
                }
            }
            prev_sum = cur_sum;
            prev_x = cur_x;
        }
        total
    }
}
