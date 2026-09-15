impl Solution {
    pub fn check_good_integer(mut n: i32) -> bool {
        let mut digit_sum = 0i64;
        let mut square_sum = 0i64;
        while n > 0 {
            let digit = (n % 10) as i64;
            digit_sum += digit;
            square_sum += digit * digit;
            n /= 10;
        }
        square_sum - digit_sum >= 50
    }
}
