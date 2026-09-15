use std::collections::VecDeque;

impl Solution {
    pub fn num_enclaves(grid: Vec<Vec<i32>>) -> i32 {
        let mut grid = grid;
        let rows = grid.len();
        let cols = grid[0].len();

        // Iterative BFS (explicit queue, not recursion) starting from every
        // land cell already sitting on the boundary: that land can
        // trivially walk off the grid, and so can every land cell it can
        // reach.
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        for r in 0..rows {
            for c in 0..cols {
                let on_boundary = r == 0 || r == rows - 1 || c == 0 || c == cols - 1;
                if on_boundary && grid[r][c] == 1 {
                    queue.push_back((r, c));
                    grid[r][c] = 0;
                }
            }
        }

        let directions: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        while let Some((r, c)) = queue.pop_front() {
            for (dr, dc) in directions {
                let nr = r as i32 + dr;
                let nc = c as i32 + dc;
                if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if grid[nr][nc] == 1 {
                        grid[nr][nc] = 0;
                        queue.push_back((nr, nc));
                    }
                }
            }
        }

        // Whatever land the fill never reached could never walk off the
        // grid: that's exactly the enclosed count.
        grid.iter().flatten().sum()
    }
}
