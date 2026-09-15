use std::collections::VecDeque;

impl Solution {
    pub fn find_safe_walk(grid: Vec<Vec<i32>>, health: i32) -> bool {
        // A path's cost is the number of unsafe cells it enters, and both
        // endpoints are entered — so grid[0][0] charges immediately. The
        // walk is safe iff some path costs at most health - 1.
        let budget = health - 1;
        let m = grid.len() as i32;
        let n = grid[0].len() as i32;
        const INF: i32 = 50 * 50 + 1;
        let mut dist = vec![vec![INF; n as usize]; m as usize];
        dist[0][0] = grid[0][0];
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((0, 0));
        while let Some((r, c)) = queue.pop_front() {
            let d = dist[r as usize][c as usize];
            if d > budget {
                continue;
            }
            if r == m - 1 && c == n - 1 {
                return true;
            }
            for (nr, nc) in [(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)] {
                if nr < 0 || nr >= m || nc < 0 || nc >= n {
                    continue;
                }
                let nd = d + grid[nr as usize][nc as usize];
                if nd < dist[nr as usize][nc as usize] && nd <= budget {
                    dist[nr as usize][nc as usize] = nd;
                    // Free move joins the current layer; a paid move goes to
                    // the back so layers stay ordered.
                    if grid[nr as usize][nc as usize] == 1 {
                        queue.push_back((nr, nc));
                    } else {
                        queue.push_front((nr, nc));
                    }
                }
            }
        }
        false
    }
}
