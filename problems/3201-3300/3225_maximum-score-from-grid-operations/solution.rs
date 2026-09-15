impl Solution {
    pub fn maximum_score(grid: Vec<Vec<i32>>) -> i64 {
        let n = grid.len();
        // pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a
        // column is the difference of two such monotone prefixes. Answers
        // reach n*n*10^9 ≈ 10^13, so all sums are i64.
        let mut pre = vec![vec![0i64; n + 1]; n];
        for j in 0..n {
            for r in 0..n {
                pre[j][r + 1] = pre[j][r] + grid[r][j] as i64;
            }
        }

        const NEG: i64 = -(1i64 << 60);
        // A play is fully described by one height h[j] in [0, n] per column
        // (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
        // (r >= h[j]) and some horizontal neighbor is black (r < taller
        // neighbor height), so column j is worth the segment of column sums
        // [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying
        // the last two heights; choosing the next height settles the middle
        // column's flanks, crediting it exactly once. dp[c][a]: best score
        // after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
        let mut dp = vec![vec![NEG; n + 1]; n + 1];
        for c in 0..=n {
            dp[c][0] = 0;
        }

        for t in 1..n {
            let pcol = &pre[t - 1];
            let mut ndp = vec![vec![NEG; n + 1]; n + 1];
            for a in 0..=n {
                let row = &dp[a];
                // Credit for choosing h[t] = c is
                //   row[b] + pcol[max(a, b, c)] - pcol[a]
                // over previous heights b. Splitting b against K = max(a, c)
                // makes this an O(1) pair of lookup maxima: b <= K adds the
                // constant pcol[K] to a prefix maximum, while b > K keeps its
                // own pcol[b] in a suffix maximum.
                let mut pm = vec![NEG; n + 1];
                let mut sp = vec![NEG; n + 2];
                let mut m = NEG;
                for b in 0..=n {
                    m = m.max(row[b]);
                    pm[b] = m;
                }
                for b in (0..=n).rev() {
                    sp[b] = sp[b + 1].max(row[b] + pcol[b]);
                }
                for c in 0..=n {
                    let k = a.max(c);
                    let best = (pm[k] + pcol[k]).max(sp[k + 1]);
                    ndp[c][a] = ndp[c][a].max(best - pcol[a]);
                }
            }
            dp = ndp;
        }

        // Final virtual choice: the last column has no right neighbor, so it
        // is credited against max(h[n-2], 0).
        let plast = &pre[n - 1];
        let mut ans: i64 = -1;
        for a in 0..=n {
            let row = &dp[a];
            let mut pm = vec![NEG; n + 1];
            let mut sp = vec![NEG; n + 2];
            let mut m = NEG;
            for b in 0..=n {
                m = m.max(row[b]);
                pm[b] = m;
            }
            for b in (0..=n).rev() {
                sp[b] = sp[b + 1].max(row[b] + plast[b]);
            }
            let best = (pm[a] + plast[a]).max(sp[a + 1]);
            ans = ans.max(best - plast[a]);
        }
        ans
    }
}
