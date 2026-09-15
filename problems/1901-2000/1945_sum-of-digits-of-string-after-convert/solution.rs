impl Solution {
    pub fn get_lucky(s: String, k: i32) -> i32 {
        // Convert letters to their 1..26 positions as a digit string, then
        // apply the digit-sum transform k times. The concatenated value
        // stays a string: 100 letters -> up to 200 digits, far beyond any
        // fixed-width integer.
        let mut digits: String = s.bytes().map(|b| (b - b'a' + 1).to_string()).collect();
        for _ in 0..k {
            let sum: u32 = digits.bytes().map(|b| (b - b'0') as u32).sum();
            digits = sum.to_string();
        }
        digits.parse().unwrap()
    }
}
