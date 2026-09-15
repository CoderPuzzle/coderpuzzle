impl Solution {
    pub fn generate_key(num1: i32, num2: i32, num3: i32) -> i32 {
        // Digit i of the key is the minimum of the three numbers' ith digits,
        // counted from the left of their zero-padded four-digit forms; the
        // integer result drops any leading zeros by construction.
        let mut key = 0;
        let mut place = 1000;
        while place > 0 {
            let digit = (num1 / place % 10).min(num2 / place % 10).min(num3 / place % 10);
            key = key * 10 + digit;
            place /= 10;
        }
        key
    }
}
