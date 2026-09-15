use std::collections::VecDeque;

impl Solution {
    pub fn min_cost(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        let di: [i32; 4] = [0, 0, 1, -1];
        let dj: [i32; 4] = [1, -1, 0, 0];
        let mut dist = vec![vec![i32::MAX; n as usize]; m as usize];
        dist[0][0] = 0;
        // Shortest path over cells: each move costs 0 when the cell's sign
        // points at that neighbor and 1 otherwise (the price of rewriting it).
        // All weights are 0/1, so Dijkstra collapses into 0-1 BFS.
        let mut dq: VecDeque<(i32, i32)> = VecDeque::new();
        dq.push_back((0, 0));
        while let Some((i, j)) = dq.pop_front() {
            // The front of the deque always carries the smallest distance.
            let d = dist[i as usize][j as usize];
            for s in 1..=4i32 {
                let ni = i + di[(s - 1) as usize];
                let nj = j + dj[(s - 1) as usize];
                // Bounds check drops signs pointing off the grid.
                if ni >= 0 && ni < m && nj >= 0 && nj < n {
                    let cost = if grid[i as usize][j as usize] == s { 0 } else { 1 };
                    let nd = d + cost;
                    if nd < dist[ni as usize][nj as usize] {
                        dist[ni as usize][nj as usize] = nd;
                        // 0-weight improvements go to the front, 1-weight to
                        // the back, keeping the deque ordered by distance; the
                        // dist table blocks any worse re-expansion.
                        if cost == 0 {
                            dq.push_front((ni, nj));
                        } else {
                            dq.push_back((ni, nj));
                        }
                    }
                }
            }
        }
        dist[(m - 1) as usize][(n - 1) as usize]
    }
}
