impl Solution {
    pub fn contains_cycle(grid: Vec<Vec<String>>) -> bool {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut visited = vec![vec![false; cols]; rows];
        let dirs = [(1i32, 0i32), (-1, 0), (0, 1), (0, -1)];
        for r0 in 0..rows {
            for c0 in 0..cols {
                if visited[r0][c0] {
                    continue;
                }
                visited[r0][c0] = true;
                let mut stack: Vec<(usize, usize, i32, i32)> = Vec::new();
                stack.push((r0, c0, -1, -1));
                while let Some((x, y, px, py)) = stack.pop() {
                    for (dx, dy) in dirs {
                        let nx = x as i32 + dx;
                        let ny = y as i32 + dy;
                        if nx < 0 || ny < 0 || nx as usize >= rows || ny as usize >= cols {
                            continue;
                        }
                        let (nx, ny) = (nx as usize, ny as usize);
                        if grid[nx][ny] != grid[x][y] {
                            continue;
                        }
                        if nx as i32 == px && ny as i32 == py {
                            continue;
                        }
                        if visited[nx][ny] {
                            return true;
                        }
                        visited[nx][ny] = true;
                        stack.push((nx, ny, x as i32, y as i32));
                    }
                }
            }
        }
        false
    }
}
