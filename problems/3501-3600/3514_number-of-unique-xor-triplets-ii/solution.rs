use std::collections::HashSet;

impl Solution {
    pub fn unique_xor_triplets(nums: Vec<i32>) -> i32 {
        // The ordering i <= j <= k only picks which indices feed the XOR, and
        // XOR ignores order, so every triplet value is (pair XOR) ^ (third
        // element). Collect all pairwise XORs once, then spread them by every
        // element; values stay below 2^11, so both sets hold <= 2048 entries.
        let mut pairs: HashSet<i32> = HashSet::new();
        for a in &nums {
            for b in &nums {
                pairs.insert(a ^ b);
            }
        }
        let mut triplets: HashSet<i32> = HashSet::new();
        for p in &pairs {
            for v in &nums {
                triplets.insert(p ^ v);
            }
        }
        triplets.len() as i32
    }
}
