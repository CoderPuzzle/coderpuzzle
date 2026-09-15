impl Solution {
    pub fn count_valid_subarrays(nums: Vec<i32>, x: i32) -> i32 {
        let mut answer = 0;
        for left in 0..nums.len() {
            let mut sum = 0_i64;
            for &value in &nums[left..] {
                sum += value as i64;
                let mut first = sum;
                while first >= 10 {
                    first /= 10;
                }
                if first == x as i64 && sum % 10 == x as i64 {
                    answer += 1;
                }
            }
        }
        answer
    }
}
