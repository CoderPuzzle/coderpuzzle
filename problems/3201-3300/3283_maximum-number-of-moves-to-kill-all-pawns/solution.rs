impl Solution {
    // BFS: minimum knight moves from (sx, sy) to every square.
    fn knight_distances(sx: usize, sy: usize) -> Vec<Vec<i32>> {
        const MOVES: [(i32, i32); 8] = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)];
        let mut dist = vec![vec![-1i32; 50]; 50];
        dist[sx][sy] = 0;
        let mut queue: std::collections::VecDeque<(usize, usize)> = std::collections::VecDeque::new();
        queue.push_back((sx, sy));
        while let Some((x, y)) = queue.pop_front() {
            let d = dist[x][y];
            for (dx, dy) in MOVES {
                let nx = x as i32 + dx;
                let ny = y as i32 + dy;
                if nx >= 0 && nx < 50 && ny >= 0 && ny < 50 {
                    let (nu, nv) = (nx as usize, ny as usize);
                    if dist[nu][nv] < 0 {
                        dist[nu][nv] = d + 1;
                        queue.push_back((nu, nv));
                    }
                }
            }
        }
        dist
    }

    pub fn max_moves(kx: i32, ky: i32, positions: Vec<Vec<i32>>) -> i32 {
        let m = positions.len();
        let (kx, ky) = (kx as usize, ky as usize);
        let grids: Vec<Vec<Vec<i32>>> = positions
            .iter()
            .map(|p| Self::knight_distances(p[0] as usize, p[1] as usize))
            .collect();
        let d_start: Vec<i32> = (0..m).map(|i| grids[i][kx][ky]).collect();
        let mut dist = vec![vec![0i32; m]; m];
        for i in 0..m {
            for j in 0..m {
                dist[i][j] = grids[j][positions[i][0] as usize][positions[i][1] as usize];
            }
        }

        let full: usize = (1usize << m) - 1;
        // dp[mask][last]: best total remaining moves with `mask` captured and
        // the knight on pawn `last`. Alice maximizes on even popcount.
        let mut dp = vec![vec![0i32; m]; full + 1];
        let mut mask: i64 = full as i64 - 1;
        while mask >= 1 {
            let masku = mask as usize;
            let bits = masku.count_ones();
            let maximize = bits % 2 == 0;
            for last in 0..m {
                let mut best = if maximize { -1 } else { i32::MAX };
                for j in 0..m {
                    if masku & (1 << j) != 0 {
                        continue;
                    }
                    let cand = dist[last][j] + dp[masku | (1 << j)][j];
                    if maximize {
                        if cand > best {
                            best = cand;
                        }
                    } else if cand < best {
                        best = cand;
                    }
                }
                dp[masku][last] = best;
            }
            mask -= 1;
        }

        let mut best = -1;
        for j in 0..m {
            let cand = d_start[j] + dp[1usize << j][j];
            if cand > best {
                best = cand;
            }
        }
        best
    }
}
