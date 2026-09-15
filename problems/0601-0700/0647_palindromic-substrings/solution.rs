impl Solution {
    pub fn count_substrings(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let mut count = 0;
        for center in 0..n {
            // Each palindrome has one center: a character (odd) or a gap (even),
            // so trying both shapes discovers every occurrence exactly once.
            count += expand(s, center, center);
            count += expand(s, center, center + 1);
        }
        count
    }
}

fn expand(s: &[u8], mut left: usize, mut right: usize) -> i32 {
    let n = s.len();
    let mut count = 0;
    loop {
        if left == usize::MAX || right >= n || s[left] != s[right] {
            break;
        }
        // Every successful step is one more palindrome; stop at the first
        // mismatch — wrapping can never restore symmetry.
        count += 1;
        left = left.wrapping_sub(1);
        right += 1;
    }
    count
}
