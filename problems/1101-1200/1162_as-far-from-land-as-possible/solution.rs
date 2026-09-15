use std::collections::VecDeque;

impl Solution {
    pub fn max_distance(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // the grid copy doubles as visited marks (input ownership moves here)
        let mut g = grid;
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        // multi-source BFS: every land cell starts at distance 0, so the
        // first wavefront arrival is exactly each cell's nearest-land distance
        for i in 0..n {
            for j in 0..n {
                if g[i][j] == 1 {
                    queue.push_back((i, j));
                }
            }
        }
        // all water (empty seed) or all land: no distance exists
        if queue.is_empty() || queue.len() == n * n {
            return -1;
        }
        let mut dist = 0;
        // 4-directional steps match Manhattan distance on this grid
        let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
        while !queue.is_empty() {
            // expand one full level per round; dist counts levels processed
            dist += 1;
            for _ in 0..queue.len() {
                let (i, j) = queue.pop_front().unwrap();
                for (di, dj) in dirs {
                    let ni = i as i32 + di;
                    let nj = j as i32 + dj;
                    if ni >= 0 && ni < n as i32 && nj >= 0 && nj < n as i32 {
                        let (ni, nj) = (ni as usize, nj as usize);
                        if g[ni][nj] == 0 {
                            // flip to 1 on enqueue: each cell is queued once
                            g[ni][nj] = 1;
                            queue.push_back((ni, nj));
                        }
                    }
                }
            }
        }
        // the last round absorbed nothing new, so the deepest level is dist-1
        dist - 1
    }
}
