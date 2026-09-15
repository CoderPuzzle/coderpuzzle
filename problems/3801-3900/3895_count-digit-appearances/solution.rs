impl Solution {
    pub fn count_digit_occurrences(nums: Vec<i32>, digit: i32) -> i32 {
        // Peel each value's decimal digits with repeated division by ten.
        // Every element is at least 1 (never 0), so the loop faithfully
        // covers its digits with no leading-zero special case.
        let mut total = 0;
        for mut x in nums {
            while x > 0 {
                if x % 10 == digit {
                    total += 1;
                }
                x /= 10;
            }
        }
        total
    }
}
