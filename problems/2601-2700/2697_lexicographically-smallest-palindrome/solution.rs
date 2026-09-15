impl Solution {
    // A mismatched mirror pair needs one rewrite whichever letter wins;
    // keeping the smaller is never worse for any earlier position.
    pub fn make_smallest_palindrome(s: String) -> String {
        let mut chars: Vec<char> = s.chars().collect();
        let n = chars.len();
        for i in 0..n / 2 {
            let j = n - 1 - i;
            if chars[i] != chars[j] {
                let keep = chars[i].min(chars[j]);
                chars[i] = keep;
                chars[j] = keep;
            }
        }
        chars.into_iter().collect()
    }
}
