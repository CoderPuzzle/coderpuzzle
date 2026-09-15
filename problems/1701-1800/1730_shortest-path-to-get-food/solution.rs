use std::collections::VecDeque;

impl Solution {
    pub fn get_food(grid: Vec<Vec<String>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut start = (0usize, 0usize);
        'outer: for i in 0..m {
            for j in 0..n {
                if grid[i][j] == "*" {
                    start = (i, j);
                    break 'outer;
                }
            }
        }
        let mut dist = vec![vec![-1i32; n]; m];
        dist[start.0][start.1] = 0;
        let mut q: VecDeque<(usize, usize)> = VecDeque::new();
        q.push_back(start);
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((i, j)) = q.pop_front() {
            if grid[i][j] == "#" {
                return dist[i][j];
            }
            for (di, dj) in dirs {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                    let (ni, nj) = (ni as usize, nj as usize);
                    if grid[ni][nj] != "X" && dist[ni][nj] == -1 {
                        dist[ni][nj] = dist[i][j] + 1;
                        q.push_back((ni, nj));
                    }
                }
            }
        }
        -1
    }
}
