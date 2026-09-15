impl Solution {
    pub fn divisibility_array(word: String, m: i32) -> Vec<i32> {
        // Rolling remainder over digit prefixes: if r was word[0..i-1]
        // mod m, then appending digit d gives (10*r + d) mod m, so each
        // flag costs one multiply-add-mod instead of re-parsing the
        // prefix; i64 absorbs the ~10^10 intermediate (r < m <= 10^9,
        // so 10*r + d just exceeds the 32-bit range).
        let m = m as i64;
        let mut rem: i64 = 0;
        word.bytes()
            .map(|b| {
                rem = (rem * 10 + (b - b'0') as i64) % m;
                if rem == 0 {
                    1
                } else {
                    0
                }
            })
            .collect()
    }
}
