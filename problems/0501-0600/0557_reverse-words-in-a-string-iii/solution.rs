impl Solution {
    // String offers no in-place index writes, so the scan runs on a char
    // vector — the honest equivalent of the in-place algorithm.
    pub fn reverse_words(s: String) -> String {
        let mut chars: Vec<char> = s.chars().collect();
        let n = chars.len();
        let mut start = 0;
        while start < n {
            let mut end = start;
            while end < n && chars[end] != ' ' {
                end += 1;
            }
            // chars[start..end] is one word: reverse it with two pointers.
            let mut lo = start;
            let mut hi = end - 1;
            while lo < hi {
                chars.swap(lo, hi);
                lo += 1;
                hi -= 1;
            }
            start = end + 1;
        }
        chars.into_iter().collect()
    }
}
