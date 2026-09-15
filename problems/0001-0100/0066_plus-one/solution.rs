impl Solution {
    // Adding one only disturbs the suffix of trailing 9s: scan from the least
    // significant digit, rolling 9s over to 0 and passing the carry left, until
    // a digit small enough to absorb it stops the cascade.
    pub fn plus_one(mut digits: Vec<i32>) -> Vec<i32> {
        for digit in digits.iter_mut().rev() {
            if *digit < 9 {
                *digit += 1;
                return digits;
            }
            *digit = 0;
        }
        // The loop ran off the front, so every digit was a 9 and the number
        // grew by one place: 999 becomes 1000, a fresh n+1 digits led by 1.
        let mut grown = vec![0; digits.len() + 1];
        grown[0] = 1;
        grown
    }
}
