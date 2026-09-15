use std::collections::HashSet;

impl Solution {
    // Flood-fill each island with an explicit stack, then name the shape by
    // the lexicographically smallest normalized cell list among its eight
    // rotations and reflections: two islands share a name exactly when one
    // maps onto the other under the statement's rule.
    pub fn num_distinct_islands2(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        let mut seen = vec![vec![false; n]; m];
        let mut shapes: HashSet<Vec<(i32, i32)>> = HashSet::new();
        let sign = [1i32, -1i32];
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] != 1 || seen[i][j] {
                    continue;
                }
                seen[i][j] = true;
                let mut stack = vec![(i, j)];
                let mut cells: Vec<(usize, usize)> = Vec::new();
                while let Some((r, c)) = stack.pop() {
                    cells.push((r, c));
                    for (dr, dc) in [(-1isize, 0isize), (1, 0), (0, -1), (0, 1)] {
                        let nr = r as isize + dr;
                        let nc = c as isize + dc;
                        if nr < 0 || nr >= m as isize || nc < 0 || nc >= n as isize {
                            continue;
                        }
                        let (nr, nc) = (nr as usize, nc as usize);
                        if grid[nr][nc] == 1 && !seen[nr][nc] {
                            seen[nr][nc] = true;
                            stack.push((nr, nc));
                        }
                    }
                }
                let mut best: Vec<(i32, i32)> = Vec::new();
                for t in 0..8 {
                    let (a, b, swap) = (sign[t & 1], sign[(t >> 1) & 1], t & 4 != 0);
                    let mut moved: Vec<(i32, i32)> = cells
                        .iter()
                        .map(|&(r, c)| {
                            let nr = a * if swap { c as i32 } else { r as i32 };
                            let nc = b * if swap { r as i32 } else { c as i32 };
                            (nr, nc)
                        })
                        .collect();
                    let r0 = moved.iter().map(|&(r, _)| r).min().unwrap();
                    let c0 = moved.iter().map(|&(_, c)| c).min().unwrap();
                    for cell in &mut moved {
                        cell.0 -= r0;
                        cell.1 -= c0;
                    }
                    moved.sort();
                    if best.is_empty() || moved < best {
                        best = moved;
                    }
                }
                shapes.insert(best);
            }
        }
        shapes.len() as i32
    }
}
