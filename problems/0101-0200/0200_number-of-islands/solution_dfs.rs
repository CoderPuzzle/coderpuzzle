impl Solution {
    pub fn num_islands(grid: Vec<Vec<String>>) -> i32 {
        let rows = grid.len();
        if rows == 0 {
            return 0;
        }
        let cols = grid[0].len();
        let mut visited = vec![vec![false; cols]; rows];
        let mut count = 0;
        let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] == "1" && !visited[r][c] {
                    count += 1;
                    let mut stack: Vec<(usize, usize)> = Vec::new();
                    stack.push((r, c));
                    visited[r][c] = true;
                    while let Some((x, y)) = stack.pop() {
                        for (dx, dy) in dirs {
                            let nx = x as i32 + dx;
                            let ny = y as i32 + dy;
                            if nx >= 0 && ny >= 0 && (nx as usize) < rows && (ny as usize) < cols {
                                let (nx, ny) = (nx as usize, ny as usize);
                                if grid[nx][ny] == "1" && !visited[nx][ny] {
                                    visited[nx][ny] = true;
                                    stack.push((nx, ny));
                                }
                            }
                        }
                    }
                }
            }
        }
        count
    }
}
