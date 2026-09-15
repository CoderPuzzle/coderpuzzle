use std::collections::VecDeque;

impl Solution {
    pub fn latest_day_to_cross(row: i32, col: i32, cells: Vec<Vec<i32>>) -> i32 {
        let row = row as usize;
        let col = col as usize;

        fn can_cross(row: usize, col: usize, cells: &[Vec<i32>], flooded: usize) -> bool {
            // Rebuild the grid for this query day: mark the flooded cells
            // as water, then test a top-to-bottom walk by BFS.
            let mut grid = vec![vec![0i32; col]; row];
            for i in 0..flooded {
                grid[(cells[i][0] - 1) as usize][(cells[i][1] - 1) as usize] = 1;
            }
            let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
            let mut seen = vec![vec![false; col]; row];
            // Multi-source BFS: every unflooded top-row cell is a start.
            for c in 0..col {
                if grid[0][c] == 0 {
                    queue.push_back((0, c));
                    seen[0][c] = true;
                }
            }
            while let Some((r, c)) = queue.pop_front() {
                if r == row - 1 {
                    return true; // bottom reached: crossing still possible
                }
                for (dr, dc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                    let nr = r as isize + dr;
                    let nc = c as isize + dc;
                    if nr >= 0
                        && nr < row as isize
                        && nc >= 0
                        && nc < col as isize
                        && !seen[nr as usize][nc as usize]
                        && grid[nr as usize][nc as usize] == 0
                    {
                        seen[nr as usize][nc as usize] = true;
                        queue.push_back((nr as usize, nc as usize));
                    }
                }
            }
            false
        }

        // Land only floods, never dries, so crossable days form a prefix of
        // days: binary-search its right endpoint. Day 1 is always crossable.
        let (mut lo, mut hi) = (1, (row * col) as i32);
        while lo < hi {
            let mid = (lo + hi + 1) / 2; // upper mid: converge on last feasible
            if can_cross(row, col, &cells, mid as usize) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}
