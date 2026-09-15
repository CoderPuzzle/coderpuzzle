impl Solution {
    pub fn longest_palindrome(s: String) -> String {
        let b = s.as_bytes();
        let n = b.len() as isize;
        // Walk outward from a center while the two boundary characters
        // match; each expansion step is a single comparison.
        let expand = |mut left: isize, mut right: isize| -> (usize, usize) {
            while left >= 0 && right < n && b[left as usize] == b[right as usize] {
                left -= 1;
                right += 1;
            }
            // Overshot by one on each side: back up to the widest palindrome.
            ((left + 1) as usize, (right - 1) as usize)
        };
        // (0, 0) makes a single character the initial answer, so the
        // returned substring is never empty.
        let (mut best_start, mut best_end) = (0usize, 0usize);
        for i in 0..n {
            // Try both center kinds: (i, i) for odd lengths, (i, i + 1) for
            // even ones; at the last gap the even case fails immediately.
            let centers = [expand(i, i), expand(i, i + 1)];
            for &(l, r) in centers.iter() {
                // l <= r skips the degenerate empty even-center pair; the
                // strict > keeps an earlier palindrome on ties, so the
                // leftmost longest one wins ("babad" -> "bab", not "aba").
                if l <= r && r - l > best_end - best_start {
                    best_start = l;
                    best_end = r;
                }
            }
        }
        s[best_start..=best_end].to_string()
    }
}
