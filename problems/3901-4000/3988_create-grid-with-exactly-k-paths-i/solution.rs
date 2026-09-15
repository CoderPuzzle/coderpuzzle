impl Solution {
    pub fn create_grid(m: i32, n: i32, k: i32) -> Vec<String> {
        let (m, n, k) = (m as usize, n as usize, k as usize);
        if m == 1 || n == 1 {
            if k != 1 {
                return Vec::new();
            }
            return vec![".".repeat(n); m];
        }

        // (height, width, is the 3x3 k=4 pattern) per k, tried in order.
        let plain3: [(usize, usize, bool); 2] = [(2, 3, false), (3, 2, false)];
        let quad: [(usize, usize, bool); 3] = [(2, 4, false), (4, 2, false), (3, 3, true)];
        let table: [&[(usize, usize, bool)]; 4] = [&[(1, 1, false)], &[(2, 2, false)], &plain3, &quad];
        for &(height, width, corners_blocked) in table[k - 1] {
            if height > m || width > n {
                continue;
            }
            let mut grid = vec![vec![b'#'; n]; m];
            for i in 0..height {
                for j in 0..width {
                    grid[i][j] = b'.';
                }
            }
            if corners_blocked {
                grid[0][width - 1] = b'#';
                grid[height - 1][0] = b'#';
            }
            for j in width - 1..n {
                grid[height - 1][j] = b'.';
            }
            for i in height - 1..m {
                grid[i][n - 1] = b'.';
            }
            return grid.into_iter().map(|row| String::from_utf8(row).unwrap()).collect();
        }
        Vec::new()
    }
}
