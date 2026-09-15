impl Solution {
    pub fn min_days(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut grid = grid;

        let island_count = |grid: &Vec<Vec<i32>>| -> i32 {
            let mut seen = vec![vec![false; cols]; rows];
            let mut count = 0;
            let dirs: [(i32, i32); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
            for r in 0..rows {
                for c in 0..cols {
                    if grid[r][c] == 1 && !seen[r][c] {
                        count += 1;
                        let mut stack = vec![(r, c)];
                        seen[r][c] = true;
                        while let Some((cr, cc)) = stack.pop() {
                            for &(dr, dc) in dirs.iter() {
                                let nr = cr as i32 + dr;
                                let nc = cc as i32 + dc;
                                if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                                    let (nr, nc) = (nr as usize, nc as usize);
                                    if grid[nr][nc] == 1 && !seen[nr][nc] {
                                        seen[nr][nc] = true;
                                        stack.push((nr, nc));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            count
        };

        if island_count(&grid) != 1 {
            return 0;
        }

        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] == 1 {
                    grid[r][c] = 0;
                    let disconnected = island_count(&grid) != 1;
                    grid[r][c] = 1;
                    if disconnected {
                        return 1;
                    }
                }
            }
        }

        2
    }
}
