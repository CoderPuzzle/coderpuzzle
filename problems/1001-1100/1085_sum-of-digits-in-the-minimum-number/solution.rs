impl Solution {
    pub fn sum_of_digits(nums: Vec<i32>) -> i32 {
        // The answer depends only on the smallest element; sum its digits
        // by peeling off the least significant digit one at a time.
        let mut m = *nums.iter().min().unwrap();
        let mut digit_sum = 0;
        while m > 0 {
            digit_sum += m % 10;
            m /= 10;
        }
        if digit_sum % 2 != 0 {
            0
        } else {
            1
        }
    }
}
