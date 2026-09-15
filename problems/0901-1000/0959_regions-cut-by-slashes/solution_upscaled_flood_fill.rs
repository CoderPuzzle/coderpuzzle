// Blow every square up into a 3x3 block and paint its wall as blocked
// pixels along the block's diagonal: '/' fills the anti-diagonal, '\' the
// main diagonal, a blank fills nothing. Corner contacts survive the
// upscale because the diagonals of two blocks meeting at a corner leave
// the pixels beside them open, so the regions are just the connected
// components of open pixels — an explicit-stack flood fill counts them.
impl Solution {
    pub fn regions_by_slashes(grid: Vec<String>) -> i32 {
        let n = grid.len();
        let size = 3 * n;
        let mut blocked = vec![false; size * size];
        for i in 0..n {
            for j in 0..n {
                match grid[i].as_bytes()[j] {
                    b'/' => {
                        blocked[(3 * i) * size + 3 * j + 2] = true;
                        blocked[(3 * i + 1) * size + 3 * j + 1] = true;
                        blocked[(3 * i + 2) * size + 3 * j] = true;
                    }
                    b'\\' => {
                        blocked[(3 * i) * size + 3 * j] = true;
                        blocked[(3 * i + 1) * size + 3 * j + 1] = true;
                        blocked[(3 * i + 2) * size + 3 * j + 2] = true;
                    }
                    _ => {}
                }
            }
        }
        // One flood fill per unvisited open pixel; each fill claims exactly
        // one region, so the number of fills is the answer.
        let mut seen = vec![false; size * size];
        let mut stack: Vec<usize> = Vec::new();
        let mut regions = 0;
        for r in 0..size {
            for c in 0..size {
                if blocked[r * size + c] || seen[r * size + c] {
                    continue;
                }
                regions += 1;
                seen[r * size + c] = true;
                stack.clear();
                stack.push(r * size + c);
                while let Some(cell) = stack.pop() {
                    let (cr, cc) = (cell / size, cell % size);
                    let mut neighbors: Vec<(usize, usize)> = Vec::new();
                    if cr > 0 {
                        neighbors.push((cr - 1, cc));
                    }
                    if cr + 1 < size {
                        neighbors.push((cr + 1, cc));
                    }
                    if cc > 0 {
                        neighbors.push((cr, cc - 1));
                    }
                    if cc + 1 < size {
                        neighbors.push((cr, cc + 1));
                    }
                    for (nr, nc) in neighbors {
                        if !blocked[nr * size + nc] && !seen[nr * size + nc] {
                            seen[nr * size + nc] = true;
                            stack.push(nr * size + nc);
                        }
                    }
                }
            }
        }
        regions as i32
    }
}
