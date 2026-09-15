use std::collections::HashSet;

impl Solution {
    // Flood-fill each island with an explicit queue. The shape is the sorted
    // set of cells relative to the first cell the row-major scan meets, so
    // translated copies produce one identical signature.
    pub fn num_distinct_islands(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut seen = vec![vec![false; n]; m];
        let mut shapes: HashSet<Vec<(i32, i32)>> = HashSet::new();
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] != 1 || seen[i][j] {
                    continue;
                }
                seen[i][j] = true;
                let mut queue = vec![(i, j)];
                let mut cells: Vec<(i32, i32)> = Vec::new();
                let mut head = 0;
                while head < queue.len() {
                    let (r, c) = queue[head];
                    head += 1;
                    cells.push((r as i32 - i as i32, c as i32 - j as i32));
                    for (dr, dc) in [(-1isize, 0isize), (1, 0), (0, -1), (0, 1)] {
                        let nr = r as isize + dr;
                        let nc = c as isize + dc;
                        if nr < 0 || nr >= m as isize || nc < 0 || nc >= n as isize {
                            continue;
                        }
                        let (nr, nc) = (nr as usize, nc as usize);
                        if grid[nr][nc] == 1 && !seen[nr][nc] {
                            seen[nr][nc] = true;
                            queue.push((nr, nc));
                        }
                    }
                }
                cells.sort();
                shapes.insert(cells);
            }
        }
        shapes.len() as i32
    }
}
