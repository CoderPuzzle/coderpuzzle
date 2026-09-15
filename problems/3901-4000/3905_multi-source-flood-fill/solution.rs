impl Solution {
    pub fn color_grid(n: i32, m: i32, sources: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        let m = m as usize;
        let mut grid = vec![vec![0i32; m]; n];
        let mut dist = vec![vec![-1i32; m]; n];
        let mut queue: std::collections::VecDeque<(usize, usize)> = std::collections::VecDeque::new();
        for s in &sources {
            let (r, c, color) = (s[0] as usize, s[1] as usize, s[2]);
            grid[r][c] = color;
            dist[r][c] = 0;
            queue.push_back((r, c));
        }
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((i, j)) = queue.pop_front() {
            let d = dist[i][j];
            for (di, dj) in dirs {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && ni < n as i32 && nj >= 0 && nj < m as i32 {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if dist[ni][nj] == -1 {
                        dist[ni][nj] = d + 1;
                        grid[ni][nj] = grid[i][j];
                        queue.push_back((ni, nj));
                    } else if dist[ni][nj] == d + 1 {
                        // reached at the same time step by another color
                        if grid[i][j] > grid[ni][nj] {
                            grid[ni][nj] = grid[i][j];
                        }
                    }
                }
            }
        }
        grid
    }
}
