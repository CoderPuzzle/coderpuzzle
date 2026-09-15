impl Solution {
    pub fn remove_digit(number: String, digit: String) -> String {
        let bytes = number.as_bytes();
        let d = digit.as_bytes()[0];
        let mut best: Option<String> = None;
        for i in 0..bytes.len() {
            if bytes[i] == d {
                let mut candidate = String::with_capacity(bytes.len() - 1);
                candidate.push_str(&number[..i]);
                candidate.push_str(&number[i + 1..]);
                if best.as_ref().map_or(true, |b| candidate > *b) {
                    best = Some(candidate);
                }
            }
        }
        best.unwrap()
    }
}
