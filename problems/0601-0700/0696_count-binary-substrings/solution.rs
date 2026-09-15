impl Solution {
    pub fn count_binary_substrings(s: String) -> i32 {
        // A valid substring is one block of 0's against an equal block of 1's,
        // straddling a single change of character. Around each boundary the
        // centered pairs number exactly min(prev, cur), the run lengths on the
        // two sides — every shorter pair fits inside the two runs, no longer
        // pair stays grouped — so a sweep that tracks the previous and current
        // run lengths, adding min(prev, cur) at each change, counts them all.
        let s = s.as_bytes();
        let mut total = 0i32;
        let mut prev = 0i32;
        let mut cur = 1i32;
        for i in 1..s.len() {
            if s[i] == s[i - 1] {
                cur += 1;
            } else {
                total += prev.min(cur);
                prev = cur;
                cur = 1;
            }
        }
        total + prev.min(cur)
    }
}
