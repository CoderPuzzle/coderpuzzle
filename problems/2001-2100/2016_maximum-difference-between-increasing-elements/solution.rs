impl Solution {
    pub fn maximum_difference(nums: Vec<i32>) -> i32 {
        let mut minimum = nums[0];
        let mut answer = -1;
        for &value in &nums[1..] {
            if value > minimum {
                answer = answer.max(value - minimum);
            }
            minimum = minimum.min(value);
        }
        answer
    }
}
