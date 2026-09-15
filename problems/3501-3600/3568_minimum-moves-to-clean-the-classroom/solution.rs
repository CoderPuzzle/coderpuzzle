impl Solution {
    pub fn min_moves(classroom: Vec<String>, energy: i32) -> i32 {
        // BFS over (cell, collected-litter mask, energy left), one layer per
        // move. best[r * n + c][mask] keeps the largest energy that state was
        // reached with; a new arrival is only worth keeping when it carries
        // strictly more energy, because anything a weaker arrival can finish,
        // a stronger one at the same or smaller depth finishes no later. An
        // 'R' cell restores the tank on arrival, and the search returns the
        // moment a move lands on the last uncollected litter.
        let m = classroom.len();
        let n = classroom[0].len();
        let mut bits = vec![vec![-1i32; n]; m];
        let (mut sr, mut sc, mut litter) = (0usize, 0usize, 0u32);
        for r in 0..m {
            for c in 0..n {
                match classroom[r].as_bytes()[c] {
                    b'S' => {
                        sr = r;
                        sc = c;
                    }
                    b'L' => {
                        bits[r][c] = litter as i32;
                        litter += 1;
                    }
                    _ => {}
                }
            }
        }
        let full: i32 = (1i32 << litter) - 1;
        if full == 0 {
            return 0;
        }
        let stride = (full + 1) as usize;
        let mut best = vec![-1i32; m * n * stride];
        best[(sr * n + sc) * stride] = energy;
        let mut layer: Vec<(usize, usize, i32, i32)> = vec![(sr, sc, 0, energy)];
        let mut moves = 0;
        while !layer.is_empty() {
            moves += 1;
            let mut nxt: Vec<(usize, usize, i32, i32)> = Vec::new();
            for (r, c, mask, e) in layer {
                for (nr, nc) in [(r.wrapping_sub(1), c), (r + 1, c), (r, c.wrapping_sub(1)), (r, c + 1)] {
                    if nr >= m || nc >= n || classroom[nr].as_bytes()[nc] == b'X' {
                        continue;
                    }
                    let ch = classroom[nr].as_bytes()[nc];
                    let ne = if ch == b'R' { energy } else { e - 1 };
                    if ch != b'R' && ne < 0 {
                        continue; // an empty tank only allows staying on an 'R'
                    }
                    let nmask = if ch == b'L' {
                        mask | (1i32 << bits[nr][nc])
                    } else {
                        mask
                    };
                    if nmask == full {
                        return moves;
                    }
                    let idx = (nr * n + nc) * stride + nmask as usize;
                    if ne > best[idx] {
                        best[idx] = ne;
                        nxt.push((nr, nc, nmask, ne));
                    }
                }
            }
            layer = nxt;
        }
        -1
    }
}
