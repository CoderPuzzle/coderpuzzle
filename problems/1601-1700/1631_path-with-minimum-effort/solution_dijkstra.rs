use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_effort_path(heights: Vec<Vec<i32>>) -> i32 {
        let rows = heights.len();
        let cols = heights[0].len();
        // Bottleneck shortest path: Dijkstra with max in place of addition —
        // a path's effort is the largest height difference along it, and the
        // smallest tentative effort popped is already final.
        let mut dist = vec![vec![i32::MAX; cols]; rows];
        dist[0][0] = 0;
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0, 0)));
        let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some(Reverse((d, r, c))) = heap.pop() {
            // The first time the goal is popped its effort is optimal.
            if r == rows - 1 && c == cols - 1 {
                return d;
            }
            // Stale-entry guard: skip outdated heap records.
            if d > dist[r][c] {
                continue;
            }
            for (dr, dc) in dirs {
                let nr = r as i32 + dr;
                let nc = c as i32 + dc;
                if nr >= 0 && (nr as usize) < rows && nc >= 0 && (nc as usize) < cols {
                    let (nr, nc) = (nr as usize, nc as usize);
                    let nd = d.max((heights[nr][nc] - heights[r][c]).abs());
                    // Relax only when the bottleneck effort strictly improves.
                    if nd < dist[nr][nc] {
                        dist[nr][nc] = nd;
                        heap.push(Reverse((nd, nr, nc)));
                    }
                }
            }
        }
        0
    }
}
