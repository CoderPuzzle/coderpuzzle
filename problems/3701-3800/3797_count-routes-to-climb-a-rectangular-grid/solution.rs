impl Solution {
    pub fn number_of_routes(grid: Vec<String>, d: i32) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let n = grid.len();
        let m = grid[0].len();
        let bytes: Vec<&[u8]> = grid.iter().map(|s| s.as_bytes()).collect();
        let d = d as usize;
        // up[c]: ways standing on (r, c) after an arrival from below (or the
        // start); same_: ways standing there after a same-row slide. A slide
        // may not follow another slide, so slides feed only from up.
        let mut up: Vec<i64> = (0..m).map(|c| if bytes[n - 1][c] == b'.' { 1 } else { 0 }).collect();

        // Prefix sums over the row's up-values; window aggregation for one
        // move kind. Slides use |dc| <= d; up moves use w_up below.
        let slides_of = |up_values: &[i64], row: usize| -> Vec<i64> {
            let mut pref = vec![0i64; m + 1];
            for v in 0..m {
                if bytes[row][v] == b'.' {
                    pref[v + 1] = (pref[v] + up_values[v]) % MOD;
                } else {
                    pref[v + 1] = pref[v];
                }
            }
            let mut out = vec![0i64; m];
            for c in 0..m {
                if bytes[row][c] != b'.' {
                    continue;
                }
                let lo = c.saturating_sub(d);
                let hi = (c + d).min(m - 1);
                out[c] = ((pref[hi + 1] - pref[lo] - up_values[c]) % MOD + MOD) % MOD;
            }
            out
        };

        // An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
        // floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
        let w_up = ((d * d - 1) as f64).sqrt().floor() as usize;
        let mut same_ = slides_of(&up, n - 1);
        for r in (0..n - 1).rev() {
            // Every way of standing anywhere in row r+1 may step up into
            // row r's window around column c.
            let mut pref = vec![0i64; m + 1];
            for v in 0..m {
                if bytes[r + 1][v] == b'.' {
                    pref[v + 1] = (pref[v] + up[v] + same_[v]) % MOD;
                } else {
                    pref[v + 1] = pref[v];
                }
            }
            let mut new_up = vec![0i64; m];
            for c in 0..m {
                if bytes[r][c] != b'.' {
                    continue;
                }
                let lo = c.saturating_sub(w_up);
                let hi = (c + w_up).min(m - 1);
                new_up[c] = ((pref[hi + 1] - pref[lo]) % MOD + MOD) % MOD;
            }
            same_ = slides_of(&new_up, r);
            up = new_up;
        }
        let mut ans = 0i64;
        for c in 0..m {
            if bytes[0][c] == b'.' {
                ans = (ans + up[c] + same_[c]) % MOD;
            }
        }
        ans
    }
}
