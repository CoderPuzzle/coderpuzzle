impl Solution {
    pub fn is_there_a_path(grid: Vec<Vec<i32>>) -> bool {
        // Monotone moves give cell (i, j) exactly i + j + 1 visited
        // cells, so every balance (#1s - #0s) reachable there lies
        // inside [-(m+n-1), m+n-1] — a window of up to 399 values, one
        // bit per balance packed into u64 words. Each column carries
        // such a word-set for the current row; a cell unions its top and
        // left neighbour sets and shifts the whole set by its own value.
        // Balance 0 surviving at the bottom-right corner is the answer.
        let m = grid.len();
        let n = grid[0].len();
        let half = m + n - 1;
        let words = (2 * half + 64) / 64;
        let mut cols: Vec<Vec<u64>> = vec![vec![0u64; words]; n];
        let start = (half as i64) + if grid[0][0] == 1 { 1 } else { -1 };
        cols[0][(start >> 6) as usize] |= 1u64 << (start & 63);
        for i in 0..m {
            for j in 0..n {
                if i == 0 && j == 0 {
                    continue;
                }
                let mut merged = vec![0u64; words];
                if i > 0 {
                    for w in 0..words {
                        merged[w] |= cols[j][w];
                    }
                }
                if j > 0 {
                    for w in 0..words {
                        merged[w] |= cols[j - 1][w];
                    }
                }
                let mut out = vec![0u64; words];
                if grid[i][j] == 1 {
                    let mut carry = 0u64;
                    for w in 0..words {
                        out[w] = merged[w] << 1 | carry;
                        carry = merged[w] >> 63;
                    }
                } else {
                    let mut rem = 0u64;
                    for w in (0..words).rev() {
                        out[w] = merged[w] >> 1 | rem << 63;
                        rem = merged[w] & 1;
                    }
                }
                cols[j] = out;
            }
        }
        cols[n - 1][half >> 6] >> (half & 63) & 1 == 1
    }
}
