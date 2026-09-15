impl Solution {
    // Strip the separators, then group by remaining length: while more
    // than 4 digits remain, cut a block of 3; the final 4, 3, or 2 digits
    // are forced — 4 splits into two blocks of 2, the rest stay whole.
    pub fn reformat_number(number: String) -> String {
        let digits: String = number.chars().filter(|c| c.is_ascii_digit()).collect();
        let mut blocks: Vec<String> = Vec::new();
        let mut i = 0;
        while digits.len() - i > 4 {
            blocks.push(digits[i..i + 3].to_string());
            i += 3;
        }
        let tail = &digits[i..];
        if tail.len() == 4 {
            blocks.push(tail[..2].to_string());
            blocks.push(tail[2..].to_string());
        } else {
            blocks.push(tail.to_string());
        }
        blocks.join("-")
    }
}
