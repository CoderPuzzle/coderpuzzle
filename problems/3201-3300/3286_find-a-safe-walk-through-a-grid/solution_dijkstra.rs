use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_safe_walk(grid: Vec<Vec<i32>>, health: i32) -> bool {
        // A path's cost is the number of unsafe cells it enters, and both
        // endpoints are entered — so grid[0][0] charges immediately. The
        // walk is safe iff some path costs at most health - 1.
        let budget = health - 1;
        let m = grid.len();
        let n = grid[0].len();
        const INF: i32 = 50 * 50 + 1;
        let mut dist = vec![vec![INF; n]; m];
        dist[0][0] = grid[0][0];
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        heap.push(Reverse((grid[0][0], 0, 0)));
        let dirs: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        while let Some(Reverse((d, r, c))) = heap.pop() {
            // The first time the goal is popped its cost is optimal.
            if r == m - 1 && c == n - 1 {
                return d <= budget;
            }
            // Stale-entry guard: skip outdated heap records.
            if d > dist[r][c] {
                continue;
            }
            for (dr, dc) in dirs {
                let nr = r as i32 + dr;
                let nc = c as i32 + dc;
                if nr < 0 || nr >= m as i32 || nc < 0 || nc >= n as i32 {
                    continue;
                }
                let (nr, nc) = (nr as usize, nc as usize);
                let nd = d + grid[nr][nc];
                // Relax only when the unsafe count strictly improves.
                if nd < dist[nr][nc] {
                    dist[nr][nc] = nd;
                    heap.push(Reverse((nd, nr, nc)));
                }
            }
        }
        false
    }
}
