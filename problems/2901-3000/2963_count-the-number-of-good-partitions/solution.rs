use std::collections::HashMap;

impl Solution {
    pub fn number_of_good_partitions(nums: Vec<i32>) -> i32 {
        // A value may not straddle a cut, so every free cut sits at an index
        // that has already seen the last occurrence of every value to its
        // left; each such gap independently doubles the count, giving
        // 2^(number of gaps).
        const MOD: i64 = 1_000_000_007;
        let mut last: HashMap<i32, usize> = HashMap::new();
        for (i, &v) in nums.iter().enumerate() {
            last.insert(v, i);
        }
        let mut result: i64 = 1;
        let mut reach: usize = 0;
        for i in 0..nums.len() - 1 {
            reach = reach.max(last[&nums[i]]);
            if reach == i {
                result = result * 2 % MOD;
            }
        }
        result as i32
    }
}
