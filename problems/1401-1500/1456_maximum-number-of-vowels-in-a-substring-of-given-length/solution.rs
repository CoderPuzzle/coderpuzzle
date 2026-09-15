impl Solution {
    pub fn max_vowels(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let k = k as usize;
        let is_vowel = |c: u8| matches!(c, b'a' | b'e' | b'i' | b'o' | b'u');
        // count vowels of the first window once; afterwards only the
        // entering letter (i) and the leaving letter (i-k) can change it
        let mut count = 0;
        for i in 0..k.min(s.len()) {
            if is_vowel(s[i]) {
                count += 1;
            }
        }
        let mut best = count;
        for i in k..s.len() {
            if is_vowel(s[i]) {
                count += 1;
            }
            if is_vowel(s[i - k]) {
                count -= 1;
            }
            if count > best {
                best = count;
            }
        }
        best
    }
}
