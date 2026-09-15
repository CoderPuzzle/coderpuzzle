impl Solution {
    pub fn len_of_v_diagonal(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let m = grid[0].len();
        // Diagonal directions in clockwise order NW, NE, SE, SW: a clockwise
        // 90-degree turn maps index d to (d + 1) % 4. Past the head '1' the
        // values alternate 2, 0, 2, 0, ..., so the other expected value of
        // e in {0, 2} is 2 - e; table index j encodes e = 2 * j.
        let dr: [i64; 4] = [-1, -1, 1, 1];
        let dc: [i64; 4] = [-1, 1, 1, -1];
        let in_b = |r: i64, c: i64| 0 <= r && r < n as i64 && 0 <= c && c < m as i64;
        let cell = |r: i64, c: i64| grid[r as usize][c as usize];
        // Straight tables: S[j][d] holds the longest run starting at each
        // cell going straight in direction d when the cell must equal 2*j.
        let shape = || vec![vec![vec![0i32; m]; n]; 4];
        let mut s = vec![shape(), shape()];
        let mut mm = vec![shape(), shape()];
        for d in 0..4usize {
            // Sweep rows against the direction so the next row is computed.
            for i in 0..n {
                let r = (if dr[d] < 0 { i } else { n - 1 - i }) as i64;
                for c in 0..m as i64 {
                    for j in 0..2usize {
                        if cell(r, c) != 2 * j as i32 {
                            continue;
                        }
                        let (nr, nc) = (r + dr[d], c + dc[d]);
                        let nxt = if in_b(nr, nc) {
                            s[1 - j][d][nr as usize][nc as usize]
                        } else {
                            0
                        };
                        s[j][d][r as usize][c as usize] = 1 + nxt;
                    }
                }
            }
        }
        // One-turn tables: continue straight in direction d, or make the
        // single clockwise turn and hand over to the straight tables of
        // direction (d + 1) % 4.
        for d in 0..4usize {
            let cw = (d + 1) % 4;
            for i in 0..n {
                let r = (if dr[d] < 0 { i } else { n - 1 - i }) as i64;
                for c in 0..m as i64 {
                    for j in 0..2usize {
                        if cell(r, c) != 2 * j as i32 {
                            continue;
                        }
                        let (nr, nc) = (r + dr[d], c + dc[d]);
                        let (tr, tc) = (r + dr[cw], c + dc[cw]);
                        let mut best = if in_b(nr, nc) {
                            mm[1 - j][d][nr as usize][nc as usize]
                        } else {
                            0
                        };
                        if in_b(tr, tc) {
                            best = best.max(s[1 - j][cw][tr as usize][tc as usize]);
                        }
                        mm[j][d][r as usize][c as usize] = 1 + best;
                    }
                }
            }
        }
        // A head '1' plus the best one-turn run over its four first steps.
        let mut ans = 0;
        for r in 0..n as i64 {
            for c in 0..m as i64 {
                if cell(r, c) != 1 {
                    continue;
                }
                let mut best = 0;
                for d in 0..4usize {
                    let (nr, nc) = (r + dr[d], c + dc[d]);
                    if in_b(nr, nc) {
                        best = best.max(mm[1][d][nr as usize][nc as usize]);
                    }
                }
                ans = ans.max(1 + best);
            }
        }
        ans
    }
}
