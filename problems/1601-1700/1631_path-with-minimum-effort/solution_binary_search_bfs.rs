use std::collections::VecDeque;

impl Solution {
    pub fn minimum_effort_path(heights: Vec<Vec<i32>>) -> i32 {
        let rows = heights.len();
        let cols = heights[0].len();
        // hi = the largest adjacent height difference: no path can force a
        // bigger step. A 1x1 grid has no edges, so hi stays 0 and the loop
        // below never runs.
        let mut hi = 0;
        for r in 0..rows {
            for c in 0..cols {
                if r + 1 < rows {
                    hi = hi.max((heights[r + 1][c] - heights[r][c]).abs());
                }
                if c + 1 < cols {
                    hi = hi.max((heights[r][c + 1] - heights[r][c]).abs());
                }
            }
        }
        let mut lo = 0;
        // Feasibility is monotone in the cap: a path that fits under a cap
        // still fits under any larger one, so binary search applies.
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if reachable(&heights, rows, cols, mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}

fn reachable(heights: &[Vec<i32>], rows: usize, cols: usize, cap: i32) -> bool {
    let mut visited = vec![vec![false; cols]; rows];
    visited[0][0] = true;
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
    queue.push_back((0, 0));
    let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
    while let Some((r, c)) = queue.pop_front() {
        if r == rows - 1 && c == cols - 1 {
            return true;
        }
        for (dr, dc) in dirs {
            let nr = r as i32 + dr;
            let nc = c as i32 + dc;
            if nr >= 0 && nc >= 0 && (nr as usize) < rows && (nc as usize) < cols {
                let (nr, nc) = (nr as usize, nc as usize);
                // Only steps within the current cap may be crossed.
                if !visited[nr][nc] && (heights[nr][nc] - heights[r][c]).abs() <= cap {
                    visited[nr][nc] = true;
                    queue.push_back((nr, nc));
                }
            }
        }
    }
    false
}
