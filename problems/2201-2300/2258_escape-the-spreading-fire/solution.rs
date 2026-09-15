use std::collections::VecDeque;

impl Solution {
    pub fn maximum_minutes(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        const INF: i64 = 1 << 40; // above every reachable time (including 1e9 waits)
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];

        // fire spread is independent of where you walk: one multi-source BFS
        // gives fire[i][j] = earliest minute fire occupies each cell
        let mut fire = vec![vec![INF; n]; m];
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        for i in 0..m {
            for j in 0..n {
                if grid[i][j] == 1 {
                    fire[i][j] = 0;
                    queue.push_back((i, j));
                }
            }
        }
        while let Some((i, j)) = queue.pop_front() {
            for &(di, dj) in &dirs {
                let ni = i as i64 + di;
                let nj = j as i64 + dj;
                if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                    let (nu, nv) = (ni as usize, nj as usize);
                    if grid[nu][nv] != 2 && fire[nu][nv] == INF {
                        fire[nu][nv] = fire[i][j] + 1;
                        queue.push_back((nu, nv));
                    }
                }
            }
        }

        fn can_reach(grid: &Vec<Vec<i32>>, fire: &Vec<Vec<i64>>, wait: i64) -> bool {
            let m = grid.len();
            let n = grid[0].len();
            // the start cell must still be fire-free the moment you set out
            if wait >= fire[0][0] {
                return false;
            }
            let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
            let mut seen = vec![vec![false; n]; m];
            seen[0][0] = true;
            let mut dq: VecDeque<(usize, usize, i64)> = VecDeque::new();
            dq.push_back((0, 0, wait));
            while let Some((i, j, t)) = dq.pop_front() {
                if i == m - 1 && j == n - 1 {
                    return true;
                }
                for &(di, dj) in &dirs {
                    let ni = i as i64 + di;
                    let nj = j as i64 + dj;
                    if ni >= 0 && (ni as usize) < m && nj >= 0 && (nj as usize) < n {
                        let (nu, nv) = (ni as usize, nj as usize);
                        if grid[nu][nv] != 2 && !seen[nu][nv] {
                            let nt = t + 1;
                            // the safehouse may tie the fire: reaching it the very
                            // minute fire does still counts as escaping
                            if nu == m - 1 && nv == n - 1 {
                                if nt <= fire[nu][nv] {
                                    seen[nu][nv] = true;
                                    dq.push_back((nu, nv, nt));
                                }
                            // you move, then fire spreads: an ordinary cell is
                            // safe only if fire arrives strictly later than you
                            } else if nt < fire[nu][nv] {
                                seen[nu][nv] = true;
                                dq.push_back((nu, nv, nt));
                            }
                        }
                    }
                }
            }
            false
        }

        // sentinels first: -1 if even waiting 0 fails; the 1e9 sentinel means
        // fire can never pin you down. Survivability is monotone in wait, so
        // binary search the largest survivable wait.
        if !can_reach(&grid, &fire, 0) {
            return -1;
        }
        if can_reach(&grid, &fire, 1_000_000_000) {
            return 1_000_000_000;
        }

        let mut lo: i64 = 0;
        let mut hi: i64 = 1_000_000_000;
        while lo < hi {
            // upper mid: when survivable, lo moves up to mid without stalling
            let mid = (lo + hi + 1) / 2;
            if can_reach(&grid, &fire, mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
