impl Solution {
    // Bounds: n <= 1000 and nums[i] <= 10^4, so every prefix sum is at most
    // 10^7 and every subarray value s*(s+1)/2 at most ~5*10^13 — everything
    // lives comfortably in an i64.
    pub fn min_partition_score(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let value = |s: i64| s * (s + 1) / 2;

        // dp over "exactly j subarrays covering the first i elements".
        // Layer j only needs i in [j, n-k+j]: at least j elements for j
        // blocks, and at least one element per remaining k-j blocks.
        if k == 1 {
            return value(prefix[n]);
        }
        let mut prev = vec![0i64; n + 1];
        let mut cur = vec![0i64; n + 1];
        for i in 1..=n - k + 1 {
            prev[i] = value(prefix[i]);
        }

        // The cost prev[t] + value(P[i]-P[t]) satisfies the quadrangle
        // inequality because value is convex, so the best split point is
        // non-decreasing in i: search [opt_lo, opt_hi] only, and recurse
        // with the found point splitting the candidate range.
        fn solve(lo: i32, hi: i32, opt_lo: i32, opt_hi: i32, prefix: &[i64], prev: &[i64], cur: &mut [i64]) {
            if lo > hi {
                return;
            }
            let mid = (lo + hi) / 2;
            let mut best = i64::MAX;
            let mut best_t = opt_lo;
            let hi_t = opt_hi.min(mid - 1);
            let p_mid = prefix[mid as usize];
            for t in opt_lo..=hi_t {
                let s = p_mid - prefix[t as usize];
                let v = prev[t as usize] + s * (s + 1) / 2;
                if v < best {
                    best = v;
                    best_t = t;
                }
            }
            cur[mid as usize] = best;
            solve(lo, mid - 1, opt_lo, best_t, prefix, prev, cur);
            solve(mid + 1, hi, best_t, opt_hi, prefix, prev, cur);
        }

        for j in 2..=k {
            solve(
                j as i32,
                (n - k + j) as i32,
                (j - 1) as i32,
                (n - k + j - 1) as i32,
                &prefix,
                &prev,
                &mut cur,
            );
            std::mem::swap(&mut prev, &mut cur);
        }
        prev[n]
    }
}
