impl Solution {
    pub fn title_to_number(column_title: String) -> i32 {
        // Bijective base-26, decode side: each letter is a digit worth 1..26,
        // so Horner's rule folds the title with no off-by-one repair.
        let mut number: i32 = 0;
        for letter in column_title.bytes() {
            // Shift the digits so far one place left, then add this one.
            number = number * 26 + i32::from(letter - b'A') + 1;
        }
        // The "FXSHRXW" ceiling is exactly 2^31 - 1, so the fold stays in range.
        number
    }
}
