impl Solution {
    pub fn shortest_path(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        if k >= m + n - 2 {
            return m + n - 2;
        }
        let kk = k as usize;
        let mut seen = vec![vec![vec![false; kk + 1]; n as usize]; m as usize];
        let mut queue = std::collections::VecDeque::new();
        queue.push_back((0i32, 0i32, k));
        seen[0][0][kk] = true;
        let dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        let mut steps = 0;
        while !queue.is_empty() {
            for _ in 0..queue.len() {
                let (x, y, rem) = queue.pop_front().unwrap();
                if x == m - 1 && y == n - 1 {
                    return steps;
                }
                for (dx, dy) in dirs {
                    let nx = x + dx;
                    let ny = y + dy;
                    if nx >= 0 && nx < m && ny >= 0 && ny < n {
                        let nr = rem - grid[nx as usize][ny as usize];
                        if nr >= 0 && !seen[nx as usize][ny as usize][nr as usize] {
                            seen[nx as usize][ny as usize][nr as usize] = true;
                            queue.push_back((nx, ny, nr));
                        }
                    }
                }
            }
            steps += 1;
        }
        -1
    }
}
