impl Solution {
    // Operations only peel elements off the ends, so what remains is a
    // contiguous block: 1 element when n is odd, 2 adjacent when n is
    // even. Every removed element scores exactly once, so maximize the
    // score by leaving the cheapest possible block behind.
    pub fn max_score(nums: Vec<i32>) -> i64 {
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        if nums.len() % 2 == 1 {
            let keep = *nums.iter().min().unwrap() as i64;
            total - keep
        } else {
            let keep = nums.windows(2).map(|w| w[0] + w[1]).min().unwrap() as i64;
            total - keep
        }
    }
}
