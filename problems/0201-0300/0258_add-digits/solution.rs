impl Solution {
    pub fn add_digits(mut num: i32) -> i32 {
        // The statement's own process, carried out literally: while the value
        // has more than one digit, replace it by the sum of its digits.
        while num >= 10 {
            // One round: peel digits off the low end into a running sum.
            let mut total = 0;
            let mut value = num;
            while value > 0 {
                total += value % 10;
                value /= 10;
            }
            num = total;
        }
        num
    }
}
