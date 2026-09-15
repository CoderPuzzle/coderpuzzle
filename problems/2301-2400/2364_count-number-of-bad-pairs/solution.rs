use std::collections::HashMap;

impl Solution {
    // j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
    // nums[i] - i: a pair is good exactly when the shifted values match.
    // Count good pairs per shifted value, subtract from all pairs; pair
    // counts reach ~5e9, so run the arithmetic in 64 bits.
    pub fn count_bad_pairs(nums: Vec<i32>) -> i64 {
        let mut counts: HashMap<i32, i64> = HashMap::new();
        let mut good: i64 = 0;
        for (i, value) in nums.iter().enumerate() {
            let shifted = value - i as i32;
            good += *counts.entry(shifted).or_insert(0);
            *counts.get_mut(&shifted).unwrap() += 1;
        }
        let n = nums.len() as i64;
        n * (n - 1) / 2 - good
    }
}
