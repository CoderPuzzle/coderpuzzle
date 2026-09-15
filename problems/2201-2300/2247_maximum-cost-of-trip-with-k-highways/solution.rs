impl Solution {
    pub fn maximum_cost(n: i32, highways: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        let k = k as usize;
        if k + 1 > n {
            return -1;
        }
        let mut adj: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for h in &highways {
            let a = h[0] as usize;
            let b = h[1] as usize;
            let toll = h[2];
            adj[a].push((b, toll));
            adj[b].push((a, toll));
        }
        const NEG: i32 = i32::MIN;
        let mut dp = vec![vec![NEG; n]; 1 << n];
        for v in 0..n {
            dp[1 << v][v] = 0;
        }
        let mut best: i32 = -1;
        for mask in 0..(1usize << n) {
            let pc = mask.count_ones() as usize;
            if pc > k + 1 {
                continue;
            }
            for v in 0..n {
                let cur = dp[mask][v];
                if cur == NEG {
                    continue;
                }
                if pc == k + 1 {
                    if cur > best {
                        best = cur;
                    }
                    continue;
                }
                for &(u, toll) in &adj[v] {
                    if mask & (1 << u) == 0 {
                        let nxt = cur + toll;
                        let nm = mask | (1 << u);
                        if nxt > dp[nm][u] {
                            dp[nm][u] = nxt;
                        }
                    }
                }
            }
        }
        best
    }
}
