use std::collections::VecDeque;

impl Solution {
    pub fn minimum_obstacles(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let inf = i32::MAX;
        let mut dist = vec![vec![inf; n]; m];
        dist[0][0] = 0;
        let mut dq: VecDeque<(usize, usize)> = VecDeque::new();
        dq.push_back((0, 0));
        let di = [0i32, 0, 1, -1];
        let dj = [1i32, -1, 0, 0];
        while let Some((i, j)) = dq.pop_front() {
            // A popped cell is already final: the deque's distances are
            // non-decreasing, which is what replaces a priority queue.
            let d = dist[i][j];
            for k in 0..4 {
                let ni = i as i32 + di[k];
                let nj = j as i32 + dj[k];
                if ni >= 0 && ni < m as i32 && nj >= 0 && nj < n as i32 {
                    let (ni, nj) = (ni as usize, nj as usize);
                    // Edge cost = grid[neighbour]: 1 to clear an obstacle,
                    // 0 for a free step, so dist is obstacles removed.
                    let nd = d + grid[ni][nj];
                    // Relax only on strict improvement — prunes stale
                    // entries and bounds how often a cell re-enters.
                    if nd < dist[ni][nj] {
                        dist[ni][nj] = nd;
                        // 0-1 BFS: free steps go to the front, obstacle
                        // steps to the back, keeping the deque sorted.
                        if grid[ni][nj] == 0 {
                            dq.push_front((ni, nj));
                        } else {
                            dq.push_back((ni, nj));
                        }
                    }
                }
            }
        }
        dist[m - 1][n - 1]
    }
}
