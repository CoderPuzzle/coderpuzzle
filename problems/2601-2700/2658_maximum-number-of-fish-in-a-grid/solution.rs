impl Solution {
    pub fn find_max_fish(grid: Vec<Vec<i32>>) -> i32 {
        // Every unvisited water cell seeds one flood fill that totals the
        // fish of its connected component; the best component total wins.
        let rows = grid.len();
        let columns = grid[0].len();
        let mut visited = vec![vec![false; columns]; rows];
        let mut best = 0i32;
        for start_r in 0..rows {
            for start_c in 0..columns {
                if grid[start_r][start_c] == 0 || visited[start_r][start_c] {
                    continue;
                }
                visited[start_r][start_c] = true;
                let mut stack = vec![(start_r, start_c)];
                let mut total = 0i32;
                while let Some((r, c)) = stack.pop() {
                    total += grid[r][c];
                    for (nr, nc) in [(r.wrapping_sub(1), c), (r + 1, c), (r, c.wrapping_sub(1)), (r, c + 1)] {
                        if nr < rows && nc < columns && grid[nr][nc] > 0 && !visited[nr][nc] {
                            visited[nr][nc] = true;
                            stack.push((nr, nc));
                        }
                    }
                }
                best = best.max(total);
            }
        }
        best
    }
}
