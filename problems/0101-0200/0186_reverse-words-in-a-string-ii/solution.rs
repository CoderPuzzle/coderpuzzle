impl Solution {
    // String offers no in-place index writes, so the flips run on a char
    // vector — the honest equivalent of the in-place algorithm.
    pub fn reverse_words(s: String) -> String {
        let mut chars: Vec<char> = s.chars().collect();
        // Flip the whole text once: the words land in reverse order, each with
        // its letters backwards. Re-flipping every word restores the letters.
        chars.reverse();
        let n = chars.len();
        let mut start = 0;
        for stop in 0..=n {
            // A word ends at each separating space (and at the end of the line).
            if stop == n || chars[stop] == ' ' {
                chars[start..stop].reverse();
                start = stop + 1;
            }
        }
        chars.into_iter().collect()
    }
}
