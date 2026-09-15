use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn swim_in_water(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // A path's cost is the max elevation along it, and max is
        // monotone, so Dijkstra's greedy argument holds with max
        // relaxation. dist holds the earliest time each cell is
        // reachable — the start waits for grid[0][0] itself.
        let mut dist = vec![vec![i32::MAX; n]; n];
        dist[0][0] = grid[0][0];
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((grid[0][0], 0usize, 0usize)));
        let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
        while let Some(Reverse((t, r, c))) = heap.pop() {
            // First pop of the target is optimal: cells settle in order
            // of their true earliest time.
            if r == n - 1 && c == n - 1 {
                return t;
            }
            // Skip stale entries superseded by a better settled time.
            if t > dist[r][c] {
                continue;
            }
            for (dr, dc) in dirs {
                let nr = r as i32 + dr;
                let nc = c as i32 + dc;
                if nr >= 0 && (nr as usize) < n && nc >= 0 && (nc as usize) < n {
                    let (nr, nc) = (nr as usize, nc as usize);
                    // Extending a path can only keep or raise its time.
                    let nt = t.max(grid[nr][nc]);
                    if nt < dist[nr][nc] {
                        dist[nr][nc] = nt;
                        heap.push(Reverse((nt, nr, nc)));
                    }
                }
            }
        }
        dist[n - 1][n - 1]
    }
}
