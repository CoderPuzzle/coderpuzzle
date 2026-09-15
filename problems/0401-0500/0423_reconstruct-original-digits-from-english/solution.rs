impl Solution {
    // Order never matters: the input is a shuffled multiset of letters,
    // so one counting pass fixes every letter count there is to know.
    pub fn original_digits(s: String) -> String {
        let mut counts = [0i32; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        // z, w, u, x and g each occur in exactly one digit word, so they
        // peel off 0, 2, 4, 6 and 8 with no bookkeeping at all.
        let mut digits = [0i32; 10];
        digits[0] = counts[(b'z' - b'a') as usize];
        digits[2] = counts[(b'w' - b'a') as usize];
        digits[4] = counts[(b'u' - b'a') as usize];
        digits[6] = counts[(b'x' - b'a') as usize];
        digits[8] = counts[(b'g' - b'a') as usize];
        // h, f and s are each shared with exactly one already-known digit
        // — 8, 4 and 6 respectively — so subtracting those yields 3, 5, 7.
        digits[3] = counts[(b'h' - b'a') as usize] - digits[8];
        digits[5] = counts[(b'f' - b'a') as usize] - digits[4];
        digits[7] = counts[(b's' - b'a') as usize] - digits[6];
        // o is shared with 0, 2 and 4; i with 5, 6 and 8. n is never
        // consulted: "nine" holds two of them against one apiece in "one"
        // and "seven", while its single i settles the count cleanly.
        digits[1] = counts[(b'o' - b'a') as usize] - digits[0] - digits[2] - digits[4];
        digits[9] = counts[(b'i' - b'a') as usize] - digits[5] - digits[6] - digits[8];
        // Ascending digits, each repeated as often as it was spelled.
        let mut result = String::new();
        for (d, &count) in digits.iter().enumerate() {
            let digit_char = char::from(b'0' + d as u8);
            for _ in 0..count {
                result.push(digit_char);
            }
        }
        result
    }
}
