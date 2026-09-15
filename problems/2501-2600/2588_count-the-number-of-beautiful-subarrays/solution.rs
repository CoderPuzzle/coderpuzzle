use std::collections::HashMap;

impl Solution {
    pub fn beautiful_subarrays(nums: Vec<i32>) -> i64 {
        // Each operation clears one set bit in each of two elements, so the
        // XOR of a subarray is invariant; it reduces to all zeros exactly
        // when its XOR is already 0.
        let mut count: HashMap<i32, i64> = HashMap::new();
        // Seed with the empty prefix so subarrays starting at index 0 are
        // witnessed when their prefix XOR returns to 0.
        count.insert(0, 1);
        let mut x: i32 = 0;
        let mut ans: i64 = 0;
        for v in nums {
            x ^= v;
            // Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
            // exactly when the prefixes match: each earlier equal prefix is
            // one beautiful subarray ending here.
            let c = *count.get(&x).unwrap_or(&0);
            ans += c;
            count.insert(x, c + 1);
        }
        ans
    }
}
