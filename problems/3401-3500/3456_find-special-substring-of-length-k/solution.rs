impl Solution {
    // A one-character window must span a whole maximal run: starting
    // inside the run leaves the same character before it, ending inside
    // leaves the same character after it. So the answer is "some maximal
    // run has length exactly k".
    pub fn has_special_substring(s: String, k: i32) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let k = k as usize;
        let mut i = 0;
        while i < n {
            let mut j = i;
            while j < n && s[j] == s[i] {
                j += 1;
            }
            if j - i == k {
                return true;
            }
            i = j;
        }
        false
    }
}
