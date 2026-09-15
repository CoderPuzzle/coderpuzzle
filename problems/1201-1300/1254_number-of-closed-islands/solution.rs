impl Solution {
    pub fn closed_island(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut grid = grid;
        let dr = [1i32, -1, 0, 0];
        let dc = [0i32, 0, 1, -1];
        // Each surviving land cell seeds exactly one fill; a fill that never
        // stepped off-grid means the island was surrounded entirely by water.
        let mut count = 0;
        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] == 0 {
                    if Self::flood(&mut grid, r as i32, c as i32, rows as i32, cols as i32, &dr, &dc) {
                        count += 1;
                    }
                }
            }
        }
        count
    }

    fn flood(grid: &mut Vec<Vec<i32>>, r: i32, c: i32, rows: i32, cols: i32, dr: &[i32; 4], dc: &[i32; 4]) -> bool {
        // Erase land to water as we walk: the fill doubles as the visited
        // marker, and an explicit stack keeps snake-shaped islands from
        // overflowing the recursion stack.
        grid[r as usize][c as usize] = 1;
        let mut stack: Vec<(i32, i32)> = vec![(r, c)];
        let mut closed = true;
        while let Some((x, y)) = stack.pop() {
            for d in 0..4 {
                let nx = x + dr[d];
                let ny = y + dc[d];
                if nx >= 0 && nx < rows && ny >= 0 && ny < cols {
                    if grid[nx as usize][ny as usize] == 0 {
                        grid[nx as usize][ny as usize] = 1;
                        stack.push((nx, ny));
                    }
                } else {
                    // A step off the grid means the component touches
                    // the border, so the whole island is not closed.
                    closed = false;
                }
            }
        }
        closed
    }
}
