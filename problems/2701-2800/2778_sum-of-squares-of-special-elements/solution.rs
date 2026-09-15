impl Solution {
    pub fn sum_of_squares(nums: Vec<i32>) -> i32 {
        // An element is special exactly when its position divides the length:
        // walk positions 1..n, test n % i == 0, and square the survivors in.
        // Position i lives at subscript i - 1 under 0-based indexing.
        let n = nums.len() as i32;
        let mut total = 0;
        for i in 1..=n {
            if n % i == 0 {
                total += nums[(i - 1) as usize] * nums[(i - 1) as usize];
            }
        }
        total
    }
}
