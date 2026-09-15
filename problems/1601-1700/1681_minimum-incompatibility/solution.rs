impl Solution {
    pub fn minimum_incompatibility(nums: Vec<i32>, k: i32) -> i32 {
        // Every group has exactly n/k elements and no repeated value, so a
        // group is a set of n/k indices whose values are pairwise distinct —
        // and with values in 1..n, distinctness is itself a 16-bit check.
        // Precompute every valid group once, with cost max - min, bucketed
        // under each index it contains, then run a DP over bitmasks of
        // undistributed elements: each state removes the group covering its
        // lowest remaining index, which collapses the k! orderings of one
        // partition, and a full mask no group ever reaches is the -1 case.
        let n = nums.len();
        let size = n / k as usize;
        let total = 1usize << n;
        let mut buckets: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for g in 0..total {
            if g.count_ones() as usize != size {
                continue;
            }
            let mut seen = 0u32;
            let mut lo = n as i32 + 1;
            let mut hi = 0;
            let mut valid = true;
            for i in 0..n {
                if g >> i & 1 == 0 {
                    continue;
                }
                let vbit = 1u32 << (nums[i] - 1);
                if seen & vbit != 0 {
                    valid = false;
                    break;
                }
                seen |= vbit;
                lo = lo.min(nums[i]);
                hi = hi.max(nums[i]);
            }
            if !valid {
                continue;
            }
            let cost = hi - lo;
            for i in 0..n {
                if g >> i & 1 != 0 {
                    buckets[i].push((g, cost));
                }
            }
        }
        const INF: i32 = 1_000_000;
        let mut dp = vec![INF; total];
        dp[0] = 0;
        for mask in 1..total {
            if mask.count_ones() as usize % size != 0 {
                continue;
            }
            let mut best = INF;
            for &(g, cost) in &buckets[mask.trailing_zeros() as usize] {
                if g & mask == g {
                    best = best.min(dp[mask ^ g] + cost);
                }
            }
            dp[mask] = best;
        }
        if dp[total - 1] >= INF {
            -1
        } else {
            dp[total - 1]
        }
    }
}
