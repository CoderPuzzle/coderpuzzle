impl Solution {
    pub fn convert_to_title(column_number: i32) -> String {
        // Bijective base-26: letters are digits 1..26 with no zero, so every
        // step subtracts one before dividing; the off-by-one is the whole problem.
        let mut n = column_number;
        let mut letters: Vec<u8> = Vec::new();
        while n > 0 {
            // Map 1..26 onto 0..25, borrowing one from the next letter up.
            n -= 1;
            letters.push(b'A' + (n % 26) as u8);
            n /= 26;
        }
        // Remainders arrive least-significant letter first.
        letters.reverse();
        String::from_utf8(letters).unwrap()
    }
}
