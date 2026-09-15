impl Solution {
    pub fn similar_rgb(color: String) -> String {
        // A shorthand color repeats one hex digit per channel, so the
        // candidates for one channel are 0x00, 0x11, ..., 0xff — sixteen
        // values spaced 17 apart. The similarity is a sum of independent
        // per-channel squares, so the most similar shorthand takes,
        // channel by channel, the repeated value nearest the input's:
        // digit (value + 8) / 17 in integers. The spacing 17 is odd, so
        // a channel value is never exactly between two candidates — the
        // nearest, and with it the whole answer, is unique.
        let bytes = color.as_bytes();
        let digits = b"0123456789abcdef";
        let mut out = String::with_capacity(7);
        out.push('#');
        for i in [1usize, 3, 5] {
            let pair = std::str::from_utf8(&bytes[i..i + 2]).unwrap();
            let value = u8::from_str_radix(pair, 16).unwrap();
            let digit = digits[((value as u32 + 8) / 17) as usize] as char;
            out.push(digit);
            out.push(digit);
        }
        out
    }
}
