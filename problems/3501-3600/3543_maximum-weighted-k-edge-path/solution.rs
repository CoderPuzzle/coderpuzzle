impl Solution {
    pub fn max_weight(n: i32, edges: Vec<Vec<i32>>, k: i32, t: i32) -> i32 {
        // Layered bitset DP over path sums: bit s of node v's word array
        // is set iff some path of exactly j edges ends at v with total
        // exactly s (s < t). Weights are >= 1, so a total < t never passes
        // through a prefix >= t, and masking mid-path never drops a path.
        let n = n as usize;
        let t = t as usize;
        let words = (t + 63) / 64;
        let mut full = vec![u64::MAX; words];
        if t % 64 != 0 {
            full[words - 1] = (1u64 << (t % 64)) - 1;
        }
        let mut dp = vec![0u64; n * words];
        let mut ndp = vec![0u64; n * words];
        for v in 0..n {
            dp[v * words] = 1; // empty path (sum 0) at every node
        }
        for _ in 0..k {
            for x in ndp.iter_mut() {
                *x = 0;
            }
            for e in &edges {
                let (base, to, w) = (e[0] as usize * words, e[1] as usize * words, e[2] as u32);
                for i in (0..words).rev() {
                    let mut val = dp[base + i] << w;
                    if i > 0 {
                        val |= dp[base + i - 1] >> (64 - w);
                    }
                    ndp[to + i] |= val & full[i];
                }
            }
            std::mem::swap(&mut dp, &mut ndp);
        }
        let mut best = -1i32;
        for v in 0..n {
            for i in (0..words).rev() {
                let m = dp[v * words + i];
                if m != 0 {
                    best = best.max(((64 * i + 63) as u32 - m.leading_zeros()) as i32);
                    break;
                }
            }
        }
        best
    }
}
