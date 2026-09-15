use std::collections::HashMap;

impl Solution {
    pub fn count_the_num_of_k_free_subsets(nums: Vec<i32>, k: i32) -> i64 {
        let mut sorted = nums.clone();
        sorted.sort();
        // Two elements conflict only when they differ by exactly k, which
        // chains values into arithmetic sequences: x joins x - k's group
        // when that predecessor exists, else starts a new one. Any
        // conflicting pair lands in the same chain, so groups are
        // independent.
        let mut group_of: HashMap<i32, usize> = HashMap::new();
        let mut lengths: Vec<i64> = Vec::new();
        for &x in &sorted {
            if let Some(&gid) = group_of.get(&(x - k)) {
                group_of.insert(x, gid);
                lengths[gid] += 1;
            } else {
                group_of.insert(x, lengths.len());
                lengths.push(1);
            }
        }
        // Product over chains; 1 counts the empty subset of the whole array.
        let mut ans: i64 = 1;
        for &length in &lengths {
            // A k-free subset of a chain omits chain-adjacent members —
            // independent sets of a path. dp[i] = dp[i-1] + dp[i-2] is a
            // Fibonacci shift; after `length` steps b is the chain's count.
            let (mut a, mut b) = (1i64, 1i64);
            for _ in 0..length {
                let nb = a + b;
                a = b;
                b = nb;
            }
            ans *= b;
        }
        ans
    }
}
