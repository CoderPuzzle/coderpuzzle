impl Solution {
    pub fn count_even(num: i32) -> i32 {
        // num <= 1000, so checking every value's digit sum directly is
        // the whole story.
        let mut count = 0;
        for value in 1..=num {
            let mut digit_sum = 0;
            let mut rest = value;
            while rest > 0 {
                digit_sum += rest % 10;
                rest /= 10;
            }
            if digit_sum % 2 == 0 {
                count += 1;
            }
        }
        count
    }
}
