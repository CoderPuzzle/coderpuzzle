use std::collections::VecDeque;

impl Solution {
    pub fn minimum_seconds(land: Vec<Vec<String>>) -> i32 {
        let m = land.len();
        let n = land[0].len();
        let inf = (m * n + 1) as i32; // larger than any reachable second
        let mut sr = 0usize;
        let mut sc = 0usize;
        let mut dr = 0usize;
        let mut dc = 0usize;
        // Water BFS: arrival time of every empty cell. Only '.' floods,
        // so 'S', 'D' and 'X' stay dry (the statement guarantees it for
        // 'D').
        let mut flood = vec![vec![inf; n]; m];
        let mut water: VecDeque<(usize, usize)> = VecDeque::new();
        for r in 0..m {
            for c in 0..n {
                match land[r][c].as_str() {
                    "*" => {
                        flood[r][c] = 0;
                        water.push_back((r, c));
                    }
                    "S" => {
                        sr = r;
                        sc = c;
                    }
                    "D" => {
                        dr = r;
                        dc = c;
                    }
                    _ => {}
                }
            }
        }
        // Signed coords keep the neighbour arithmetic simple off-grid.
        let (m_i, n_i) = (m as isize, n as isize);
        while let Some((r, c)) = water.pop_front() {
            let step = flood[r][c] + 1;
            for (drr, dcc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                let (nr, nc) = (r as isize + drr, c as isize + dcc);
                if nr < 0 || nr >= m_i || nc < 0 || nc >= n_i {
                    continue;
                }
                let (ur, uc) = (nr as usize, nc as usize);
                if land[ur][uc] != "." || flood[ur][uc] != inf {
                    continue;
                }
                flood[ur][uc] = step;
                water.push_back((ur, uc));
            }
        }
        // Person BFS: enter '.'/'D' strictly before the water does; the
        // same-second landing ban is the strict '<'.
        let mut seen = vec![vec![false; n]; m];
        seen[sr][sc] = true;
        let mut queue: VecDeque<(usize, usize, i32)> = VecDeque::new();
        queue.push_back((sr, sc, 0));
        while let Some((r, c, t)) = queue.pop_front() {
            if (r, c) == (dr, dc) {
                return t;
            }
            for (drr, dcc) in [(1isize, 0isize), (-1, 0), (0, 1), (0, -1)] {
                let (nr, nc) = (r as isize + drr, c as isize + dcc);
                if nr < 0 || nr >= m_i || nc < 0 || nc >= n_i {
                    continue;
                }
                let (ur, uc) = (nr as usize, nc as usize);
                if seen[ur][uc] {
                    continue;
                }
                let walk = land[ur][uc] == "." || land[ur][uc] == "D";
                if !walk || t + 1 >= flood[ur][uc] {
                    continue;
                }
                seen[ur][uc] = true;
                queue.push_back((ur, uc, t + 1));
            }
        }
        -1
    }
}
