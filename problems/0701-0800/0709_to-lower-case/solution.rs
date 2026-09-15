impl Solution {
    pub fn to_lower_case(s: String) -> String {
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one pass decides each byte: inside
        // the range, add 32; outside it, copy untouched. The range
        // check is what keeps the +32 from reaching digits,
        // punctuation, or already-lowercase letters.
        let mut bytes = s.into_bytes();
        for b in bytes.iter_mut() {
            if *b >= b'A' && *b <= b'Z' {
                *b += 32;
            }
        }
        String::from_utf8(bytes).expect("printable ASCII in, printable ASCII out")
    }
}
