impl Solution {
    pub fn num_of_pairs(nums: Vec<String>, target: String) -> i32 {
        let mut pairs = 0;
        for first in 0..nums.len() {
            for second in 0..nums.len() {
                if first != second && format!("{}{}", nums[first], nums[second]) == target {
                    pairs += 1;
                }
            }
        }
        pairs
    }
}
