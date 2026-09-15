impl Solution {
    pub fn sum_remoteness(grid: Vec<Vec<i32>>) -> i64 {
        // One flood fill per unvisited non-blocked cell totals the size and
        // value of its component; a cell reaches exactly its own component,
        // so its remoteness is every other component's value, and summing
        // that over all cells collapses to size * (total - component_sum).
        let rows = grid.len();
        let columns = grid[0].len();
        let mut visited = vec![vec![false; columns]; rows];
        let mut total = 0i64;
        let mut components: Vec<(i64, i64)> = Vec::new();
        for start_r in 0..rows {
            for start_c in 0..columns {
                if grid[start_r][start_c] == -1 || visited[start_r][start_c] {
                    continue;
                }
                visited[start_r][start_c] = true;
                let mut stack = vec![(start_r, start_c)];
                let mut size = 0i64;
                let mut values = 0i64;
                while let Some((r, c)) = stack.pop() {
                    size += 1;
                    values += grid[r][c] as i64;
                    for (nr, nc) in [(r.wrapping_sub(1), c), (r + 1, c), (r, c.wrapping_sub(1)), (r, c + 1)] {
                        if nr < rows && nc < columns && grid[nr][nc] != -1 && !visited[nr][nc] {
                            visited[nr][nc] = true;
                            stack.push((nr, nc));
                        }
                    }
                }
                total += values;
                components.push((size, values));
            }
        }
        let mut answer = 0i64;
        for (size, values) in components {
            answer += size * (total - values);
        }
        answer
    }
}
