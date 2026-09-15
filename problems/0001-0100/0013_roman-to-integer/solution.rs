use std::collections::HashMap;

impl Solution {
    pub fn roman_to_int(s: String) -> i32 {
        // One left-to-right pass: every symbol contributes its value, except
        // the left half of a subtractive pair, which is taken away instead.
        let values = HashMap::from([
            ('I', 1),
            ('V', 5),
            ('X', 10),
            ('L', 50),
            ('C', 100),
            ('D', 500),
            ('M', 1000),
        ]);
        let chars: Vec<char> = s.chars().collect();
        let mut total = 0;
        for i in 0..chars.len() {
            let value = values[&chars[i]];
            // A value smaller than its right neighbor marks one of the six
            // subtractive pairs (IV, IX, XL, XC, CD, CM): the pair is worth
            // right - left, so this symbol is subtracted rather than added.
            // The last symbol has no right neighbor and is always added.
            if i + 1 < chars.len() && value < values[&chars[i + 1]] {
                total -= value;
            } else {
                total += value;
            }
        }
        total
    }
}
