impl Solution {
    pub fn maximum_strong_pair_xor(nums: Vec<i32>) -> i32 {
        // Try every unordered pair (the same integer twice is allowed, so
        // j >= i covers the (x, x) pairs too); keep the best XOR among the
        // pairs that satisfy the strong-pair condition.
        let mut best = 0;
        for i in 0..nums.len() {
            for j in i..nums.len() {
                let (x, y) = (nums[i], nums[j]);
                if (x - y).abs() <= x.min(y) {
                    best = best.max(x ^ y);
                }
            }
        }
        best
    }
}
