impl Solution {
    pub fn number_of_substrings(s: String) -> i32 {
        // last occurrence of a/b/c so far; -1 = letter not seen yet
        let mut last = [-1i32, -1, -1];
        let mut count: i64 = 0;
        for (i, &b) in s.as_bytes().iter().enumerate() {
            let idx = (b - b'a') as i32;
            if idx >= 0 && idx <= 2 {
                last[idx as usize] = i as i32;
            }
            // substring s[l..i] is valid iff l <= min(last): every such left
            // endpoint yields one valid substring ending at i (0 until all seen)
            let mut m = last[0];
            if last[1] < m {
                m = last[1];
            }
            if last[2] < m {
                m = last[2];
            }
            count += m as i64 + 1;
        }
        count as i32
    }
}
