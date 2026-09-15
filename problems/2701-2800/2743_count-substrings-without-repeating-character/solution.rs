impl Solution {
    pub fn number_of_special_substrings(s: String) -> i64 {
        // last[c] is the most recent index of c; left is the smallest
        // window start keeping s[left..=i] free of repeating characters.
        let bytes = s.as_bytes();
        let mut last = [-1isize; 26];
        let mut left = 0usize;
        let mut ans = 0i64;
        for (i, &b) in bytes.iter().enumerate() {
            let c = (b - b'a') as usize;
            // An occurrence left of the window yields last[c] + 1 <= left,
            // so stale entries leave the window untouched.
            left = left.max((last[c] + 1) as usize);
            // Every start in [left..i] ends a special substring at i.
            ans += (i - left + 1) as i64;
            last[c] = i as isize;
        }
        ans
    }
}
