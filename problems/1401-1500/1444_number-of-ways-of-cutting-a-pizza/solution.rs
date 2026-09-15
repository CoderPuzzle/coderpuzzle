impl Solution {
    pub fn ways(pizza: Vec<String>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let rows = pizza.len();
        let cols = pizza[0].len();
        // apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
        let mut apples = vec![vec![0i32; cols + 1]; rows + 1];
        for r in (0..rows).rev() {
            for c in (0..cols).rev() {
                let extra = if pizza[r].as_bytes()[c] == b'A' { 1 } else { 0 };
                apples[r][c] = apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1] + extra;
            }
        }
        let mut memo = vec![vec![vec![-1i64; k as usize + 1]; cols]; rows];

        fn count(
            apples: &Vec<Vec<i32>>,
            memo: &mut Vec<Vec<Vec<i64>>>,
            r: usize,
            c: usize,
            remaining: usize,
            rows: usize,
            cols: usize,
        ) -> i64 {
            if apples[r][c] == 0 {
                return 0;
            }
            if remaining == 0 {
                return 1;
            }
            if memo[r][c][remaining] >= 0 {
                return memo[r][c][remaining];
            }
            let mut total: i64 = 0;
            // Horizontal cuts: hand away rows r..i-1, keep (i, c).
            for i in (r + 1)..rows {
                if apples[r][c] - apples[i][c] > 0 {
                    total += count(apples, memo, i, c, remaining - 1, rows, cols);
                }
            }
            // Vertical cuts: hand away columns c..j-1, keep (r, j).
            for j in (c + 1)..cols {
                if apples[r][c] - apples[r][j] > 0 {
                    total += count(apples, memo, r, j, remaining - 1, rows, cols);
                }
            }
            memo[r][c][remaining] = total % MOD;
            memo[r][c][remaining]
        }

        count(&apples, &mut memo, 0, 0, k as usize - 1, rows, cols) as i32
    }
}
