// For each right end, grow the window left-to-right and shrink from the
// left while some character inside has frequency k or more; the last start
// dropped marks left-1 as the smallest start making s[left-1..right]
// valid, so exactly `left` substrings ending at right qualify (starts
// 0..left-1). The first valid end only moves right as the start advances —
// dropping a character never lowers an inside frequency — so the two
// pointers sweep once. The answer counts pairs, at most n(n+1)/2 for
// n = 3000, far inside 32 bits.
impl Solution {
    pub fn number_of_substrings(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let mut freq = [0usize; 26];
        let mut saturated = 0usize;
        let mut ans = 0i64;
        let mut left = 0usize;
        for &c in bytes {
            let i = (c - b'a') as usize;
            freq[i] += 1;
            if freq[i] == k as usize {
                saturated += 1;
            }
            while saturated > 0 {
                let j = (bytes[left] - b'a') as usize;
                if freq[j] == k as usize {
                    saturated -= 1;
                }
                freq[j] -= 1;
                left += 1;
            }
            ans += left as i64;
        }
        ans as i32
    }
}
