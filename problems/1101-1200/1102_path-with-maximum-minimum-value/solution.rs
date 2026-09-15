use std::collections::BinaryHeap;

impl Solution {
    pub fn maximum_minimum_path(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        // Max-heap on the cell value (tuple comparison starts with the value).
        // Best-first on the highest-valued frontier cell: taking the largest
        // candidate can never lower the running minimum, so the first arrival
        // at the goal carries the maximum bottleneck (Dijkstra with max).
        let mut heap = BinaryHeap::new();
        let mut visited = vec![vec![false; cols]; rows];
        visited[0][0] = true;
        heap.push((grid[0][0], 0usize, 0usize));
        let mut best = grid[0][0];
        let dirs: [(isize, isize); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((value, r, c)) = heap.pop() {
            // best is the bottleneck (running minimum) of the walk so far.
            best = best.min(value);
            if r == rows - 1 && c == cols - 1 {
                return best;
            }
            for (dr, dc) in dirs {
                let nr = r as isize + dr;
                let nc = c as isize + dc;
                if nr >= 0 && nr < rows as isize && nc >= 0 && nc < cols as isize {
                    let (nr, nc) = (nr as usize, nc as usize);
                    // Mark visited on push so each cell enters the heap at
                    // most once.
                    if !visited[nr][nc] {
                        visited[nr][nc] = true;
                        heap.push((grid[nr][nc], nr, nc));
                    }
                }
            }
        }
        best
    }
}
