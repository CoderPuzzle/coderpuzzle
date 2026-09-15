impl Solution {
    pub fn is_array_special(nums: Vec<i32>) -> bool {
        for w in nums.windows(2) {
            if w[0] % 2 == w[1] % 2 {
                return false;
            }
        }
        true
    }
}
