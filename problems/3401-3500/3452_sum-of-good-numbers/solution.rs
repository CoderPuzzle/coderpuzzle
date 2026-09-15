impl Solution {
    // One sweep: an element is good when it strictly beats the neighbors
    // that exist at distance k; a missing neighbor never blocks it.
    pub fn sum_of_good_numbers(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as usize;
        let mut total = 0;
        for i in 0..n {
            let left_ok = i < k || nums[i] > nums[i - k];
            let right_ok = i + k >= n || nums[i] > nums[i + k];
            if left_ok && right_ok {
                total += nums[i];
            }
        }
        total
    }
}
