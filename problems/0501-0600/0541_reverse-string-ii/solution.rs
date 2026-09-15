impl Solution {
    pub fn reverse_str(s: String, k: i32) -> String {
        // Read the string as consecutive 2k-sized blocks: every block
        // contributes its first k characters reversed, its last k untouched.
        // Walking i in steps of 2k and reversing the window [i, min(i+k, n))
        // needs no special case for the tail — fewer than k characters left
        // makes the window short, so reversing it reverses all of them,
        // while k..2k-1 left makes the window exactly the first k of them.
        let step = 2 * k as usize;
        let mut chars: Vec<char> = s.chars().collect();
        for i in (0..chars.len()).step_by(step) {
            let end = (i + k as usize).min(chars.len());
            chars[i..end].reverse();
        }
        chars.into_iter().collect()
    }
}
