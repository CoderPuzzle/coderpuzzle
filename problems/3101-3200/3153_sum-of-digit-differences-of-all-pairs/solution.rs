impl Solution {
    pub fn sum_digit_differences(nums: Vec<i32>) -> i64 {
        let mut total: i64 = 0;
        let mut place: i32 = 1;
        while nums[0] / place > 0 {
            let mut counts = [0i64; 10];
            for &num in &nums {
                counts[(num / place % 10) as usize] += 1;
            }
            let mut pairs: i64 = 0;
            for count in counts {
                pairs += count * (nums.len() as i64 - count);
            }
            total += pairs / 2;
            place *= 10;
        }
        total
    }
}
