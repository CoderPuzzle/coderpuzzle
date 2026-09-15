// A sum of distinct powers of three is a ternary numeral written with only
// 0s and 1s: each chosen power drops a single 1 into its own position, and
// positional uniqueness makes the correspondence exact both ways. So n is
// representable iff no base-3 digit of n is 2 -- strip digits with % 3 and
// / 3, failing on a 2. Since n <= 10^7 < 3^15, at most fifteen rounds run,
// all on values no larger than n itself, so nothing accumulates.
impl Solution {
    pub fn check_powers_of_three(n: i32) -> bool {
        let mut n = n;
        while n > 0 {
            if n % 3 == 2 {
                return false;
            }
            n /= 3;
        }
        true
    }
}
