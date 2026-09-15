impl Solution {
    pub fn maximum_safeness_factor(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // Multi-source BFS from every thief at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest thief —
        // exactly the cell's safeness value.
        let mut dist = vec![vec![-1i32; n]; n];
        let mut q: Vec<(usize, usize)> = Vec::new();
        for r in 0..n {
            for c in 0..n {
                if grid[r][c] == 1 {
                    dist[r][c] = 0;
                    q.push((r, c));
                }
            }
        }
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        let mut head = 0usize;
        while head < q.len() {
            let (r, c) = q[head];
            head += 1;
            for &(dr, dc) in &dirs {
                let nr = r as i64 + dr;
                let nc = c as i64 + dc;
                if nr >= 0 && nr < n as i64 && nc >= 0 && nc < n as i64 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if dist[nr][nc] == -1 {
                        dist[nr][nc] = dist[r][c] + 1;
                        q.push((nr, nc));
                    }
                }
            }
        }

        let reachable = |threshold: i32| -> bool {
            // A path has factor >= threshold iff the corners stay connected
            // after deleting cells with dist < threshold; endpoints below it
            // fail immediately.
            if dist[0][0] < threshold || dist[n - 1][n - 1] < threshold {
                return false;
            }
            let mut seen = vec![vec![false; n]; n];
            seen[0][0] = true;
            let mut dq: Vec<(usize, usize)> = vec![(0, 0)];
            let mut h = 0usize;
            while h < dq.len() {
                let (r, c) = dq[h];
                h += 1;
                if r == n - 1 && c == n - 1 {
                    return true;
                }
                for &(dr, dc) in &dirs {
                    let nr = r as i64 + dr;
                    let nc = c as i64 + dc;
                    if nr >= 0 && nr < n as i64 && nc >= 0 && nc < n as i64 {
                        let (nr, nc) = (nr as usize, nc as usize);
                        if !seen[nr][nc] && dist[nr][nc] >= threshold {
                            seen[nr][nc] = true;
                            dq.push((nr, nc));
                        }
                    }
                }
            }
            false
        };

        // Reachability is monotone in the threshold, so binary search the
        // largest feasible v over [0, 2n]. A thief on a corner pins its
        // dist to 0, capping the answer at 0.
        let mut lo: i32 = 0;
        let mut hi: i32 = 2 * n as i32;
        let mut ans: i32 = 0;
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if reachable(mid) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        ans
    }
}
