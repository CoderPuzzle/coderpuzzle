impl Solution {
    pub fn freq_alphabets(s: String) -> String {
        // A '#' disambiguates backwards, so scan from the right: at each
        // position either a '#' sits two places ahead (three-char token) or
        // the digit stands alone as a single letter.
        let bytes = s.as_bytes();
        let mut out: Vec<u8> = Vec::with_capacity(bytes.len());
        let mut i = bytes.len() as i64 - 1;
        while i >= 0 {
            let idx = i as usize;
            let value: u8 = if bytes[idx] == b'#' {
                let tens = bytes[idx - 2] - b'0';
                let ones = bytes[idx - 1] - b'0';
                i -= 3;
                tens * 10 + ones
            } else {
                let digit = bytes[idx] - b'0';
                i -= 1;
                digit
            };
            out.push(b'a' + value - 1);
        }
        out.reverse();
        String::from_utf8(out).unwrap()
    }
}
