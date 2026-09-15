impl Solution {
    pub fn last_substring(s: String) -> String {
        let b = s.as_bytes();
        let n = b.len();
        // the answer is always a suffix: i = best start so far, j = challenger,
        // k = length of the prefix the two candidates agree on
        let (mut i, mut j, mut k) = (0usize, 1usize, 0usize);
        while j + k < n {
            if b[i + k] == b[j + k] {
                // characters agree: the shared prefix grows by one
                k += 1;
            } else if b[i + k] < b[j + k] {
                // s[i:] loses here, and so does every suffix starting in
                // (i, i+k] — each hits the same losing comparison shifted
                i = std::cmp::max(i + k + 1, j);
                j = i + 1;
                k = 0;
            } else {
                // challenger loses: suffixes j..j+k are dominated, skip them
                j = j + k + 1;
                k = 0;
            }
        }
        s[i..].to_string()
    }
}
