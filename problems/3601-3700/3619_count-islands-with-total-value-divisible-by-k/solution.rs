impl Solution {
    pub fn count_islands(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut seen = vec![vec![false; n]; m];
        // Iterative BFS: an island can span all 1e5 cells, so no recursion.
        // One shared queue buffer; each island's flood fill starts over.
        let mut queue: Vec<usize> = Vec::with_capacity(m * n);
        let dirs: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        let mut count = 0i32;
        for si in 0..m {
            for sj in 0..n {
                if grid[si][sj] == 0 || seen[si][sj] {
                    continue;
                }
                // An island total reaches 1e5 cells * 1e6 = 1e11, past the
                // i32 range, so the sum accumulates in an i64.
                let mut total = 0i64;
                let k = k as i64;
                queue.clear();
                queue.push(si * n + sj);
                seen[si][sj] = true;
                let mut head = 0usize;
                while head < queue.len() {
                    let cell = queue[head];
                    head += 1;
                    let (x, y) = (cell / n, cell % n);
                    total += grid[x][y] as i64;
                    for (dx, dy) in dirs {
                        let nx = x as i32 + dx;
                        let ny = y as i32 + dy;
                        if nx < 0 || nx >= m as i32 || ny < 0 || ny >= n as i32 {
                            continue;
                        }
                        let (nx, ny) = (nx as usize, ny as usize);
                        if grid[nx][ny] == 0 || seen[nx][ny] {
                            continue;
                        }
                        seen[nx][ny] = true;
                        queue.push(nx * n + ny);
                    }
                }
                if total % k == 0 {
                    count += 1;
                }
            }
        }
        count
    }
}
