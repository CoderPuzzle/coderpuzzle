impl Solution {
    pub fn difference_of_sum(nums: Vec<i32>) -> i32 {
        // One pass accumulates both sums at once; every element is at
        // least its own digit sum (equality only for single digits), and
        // the bounds (2000 elements of at most 2000) keep both totals
        // far inside i32, so a single abs closes the case.
        let mut element_sum = 0;
        let mut digit_sum = 0;
        for mut value in nums {
            element_sum += value;
            while value > 0 {
                digit_sum += value % 10;
                value /= 10;
            }
        }
        (element_sum - digit_sum).abs()
    }
}
