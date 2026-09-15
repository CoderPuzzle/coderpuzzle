use std::collections::VecDeque;

impl Solution {
    pub fn shortest_path_binary_matrix(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len() as i32;
        // Blocked corners admit no path; a 1x1 open grid needs no moves.
        if grid[0][0] != 0 || grid[(n - 1) as usize][(n - 1) as usize] != 0 {
            return -1;
        }
        if n == 1 {
            return 1;
        }
        // Unit-cost moves make BFS optimal: first arrival is a shortest path.
        // dist doubles as the visited marker; length counts cells, so start = 1.
        let n = n as usize;
        let mut dist = vec![vec![0i32; n]; n];
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        dist[0][0] = 1;
        queue.push_back((0, 0));
        while let Some((x, y)) = queue.pop_front() {
            // Eight-directional neighborhood (diagonals included).
            for dx in -1i32..=1 {
                for dy in -1i32..=1 {
                    if dx == 0 && dy == 0 {
                        continue;
                    }
                    let nx = x as i32 + dx;
                    let ny = y as i32 + dy;
                    if nx >= 0 && nx < n as i32 && ny >= 0 && ny < n as i32 {
                        let (nx, ny) = (nx as usize, ny as usize);
                        if grid[nx][ny] == 0 && dist[nx][ny] == 0 {
                            // Early exit the moment the goal becomes reachable.
                            if nx == n - 1 && ny == n - 1 {
                                return dist[x][y] + 1;
                            }
                            dist[nx][ny] = dist[x][y] + 1;
                            queue.push_back((nx, ny));
                        }
                    }
                }
            }
        }
        // Queue drained without reaching the goal: no clear path.
        -1
    }
}
