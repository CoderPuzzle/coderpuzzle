impl Solution {
    // Every cell value is at most 1023 (10 bits), so any path XOR is in
    // 0..1023. reach[i][j][x] records whether a path ending at (i, j) can
    // achieve XOR x.
    pub fn min_cost(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut reach = vec![vec![vec![false; 1024]; n]; m];
        reach[0][0][grid[0][0] as usize] = true;
        for i in 0..m {
            for j in 0..n {
                if i == 0 && j == 0 {
                    continue;
                }
                let v = grid[i][j] as usize;
                for x in 0..1024 {
                    if (i > 0 && reach[i - 1][j][x]) || (j > 0 && reach[i][j - 1][x]) {
                        reach[i][j][x ^ v] = true;
                    }
                }
            }
        }
        // The smallest reachable XOR at the bottom-right cell is the answer.
        for x in 0..1024 {
            if reach[m - 1][n - 1][x] {
                return x as i32;
            }
        }
        -1
    }
}
