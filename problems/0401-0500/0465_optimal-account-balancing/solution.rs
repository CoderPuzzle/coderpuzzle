use std::collections::HashMap;

impl Solution {
    pub fn min_transfers(transactions: Vec<Vec<i32>>) -> i32 {
        let mut balance: HashMap<i32, i64> = HashMap::new();
        for t in &transactions {
            *balance.entry(t[0]).or_insert(0) -= t[2] as i64;
            *balance.entry(t[1]).or_insert(0) += t[2] as i64;
        }
        // Only nonzero net balances matter: any zero-sum group of s people
        // settles in s-1 transfers, so maximizing the group count g of a
        // partition minimizes the total n - g.
        let debts: Vec<i64> = balance.values().filter(|&&v| v != 0).cloned().collect();
        let n = debts.len();
        if n == 0 {
            return 0;
        }

        let total = 1usize << n;
        // Subset sums built incrementally via the lowest set bit; valid
        // marks zero-sum subsets, the candidate groups.
        let mut sums = vec![0i64; total];
        let mut valid = vec![false; total];
        for mask in 1..total {
            let lsb = mask & mask.wrapping_neg();
            let bit = lsb.trailing_zeros() as usize;
            sums[mask] = sums[mask ^ lsb] + debts[bit];
            valid[mask] = sums[mask] == 0;
        }

        // dp[mask] = most disjoint valid groups partitioning mask; NEG means
        // "not exactly partitionable", so only full covers add.
        const NEG: i32 = -1_000_000_000;
        let mut dp = vec![NEG; total];
        dp[0] = 0;
        for mask in 1..total {
            let mut sub = mask;
            while sub != 0 {
                if valid[sub] && dp[mask ^ sub] != NEG {
                    dp[mask] = dp[mask].max(dp[mask ^ sub] + 1);
                }
                sub = (sub - 1) & mask;
            }
        }
        // Fewest transactions = n balances minus the best group count.
        (n as i32) - dp[total - 1]
    }
}
