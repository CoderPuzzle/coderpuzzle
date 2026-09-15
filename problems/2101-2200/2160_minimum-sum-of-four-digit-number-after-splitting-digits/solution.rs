// The sum of two numbers built from the four digits is minimized by giving
// the two smallest digits the tens places, so sort and pair smallest+largest
// into the two two-digit numbers.
impl Solution {
    pub fn minimum_sum(num: i32) -> i32 {
        let mut digits = [num / 1000, num / 100 % 10, num / 10 % 10, num % 10];
        digits.sort();
        10 * (digits[0] + digits[1]) + digits[2] + digits[3]
    }
}
