use std::collections::HashMap;

impl Solution {
    pub fn convert_number(s: String) -> String {
        // Left-to-right greedy scan: at most one digit word can start at any
        // position (no word is a prefix of another), so taking the first hit
        // is unambiguous. Lengths 3, 4, 5 cover all ten words.
        let words: HashMap<&str, char> = [
            ("zero", '0'),
            ("one", '1'),
            ("two", '2'),
            ("five", '5'),
            ("three", '3'),
            ("four", '4'),
            ("nine", '9'),
            ("six", '6'),
            ("seven", '7'),
            ("eight", '8'),
        ]
        .into_iter()
        .collect();
        let letters = s.as_bytes();
        let n = letters.len();
        let mut digits: Vec<u8> = Vec::with_capacity(n / 3);
        let mut i = 0;
        while i < n {
            let mut matched = false;
            for length in 3..=5u8 {
                let end = i + length as usize;
                if end > n {
                    continue;
                }
                // from_utf8 cannot fail: the slice came from a UTF-8 string
                if let Some(digit) = words.get(std::str::from_utf8(&letters[i..end]).unwrap()) {
                    digits.push(*digit as u8);
                    i = end;
                    matched = true;
                    break;
                }
            }
            if !matched {
                i += 1;
            }
        }
        String::from_utf8(digits).unwrap()
    }
}
