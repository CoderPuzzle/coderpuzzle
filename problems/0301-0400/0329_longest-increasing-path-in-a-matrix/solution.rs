impl Solution {
    pub fn longest_increasing_path(matrix: Vec<Vec<i32>>) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(m * n);
        for i in 0..m {
            for j in 0..n {
                cells.push((matrix[i][j], i, j));
            }
        }
        // Strictly increasing paths make the cells a DAG (edges point to
        // larger neighbors), so ascending value order is a topological order.
        cells.sort_unstable();
        // dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
        let mut dp = vec![1i32; m * n];
        let mut best = 1;
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        for &(v, i, j) in &cells {
            // Smaller neighbors appear earlier in the sort, so their dp is
            // final; strict < so equal-valued neighbors never link.
            for (di, dj) in dirs {
                let ni = i as i64 + di;
                let nj = j as i64 + dj;
                if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if matrix[ni][nj] < v && dp[ni * n + nj] + 1 > dp[i * n + j] {
                        dp[i * n + j] = dp[ni * n + nj] + 1;
                    }
                }
            }
            if dp[i * n + j] > best {
                best = dp[i * n + j];
            }
        }
        best
    }
}
