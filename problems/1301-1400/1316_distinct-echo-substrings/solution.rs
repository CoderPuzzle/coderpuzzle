impl Solution {
    pub fn distinct_echo_substrings(text: String) -> i32 {
        let b = text.as_bytes();
        let n = b.len();
        // An echo is exactly an even-length substring whose two halves are
        // identical, so each one is characterized by a half length and a
        // start index — enumerate every such (half, i) pair.
        let mut seen: std::collections::HashSet<&str> = std::collections::HashSet::new();
        for half in 1..=n / 2 {
            // Start positions with room for the full doubled substring.
            for i in 0..n - 2 * half + 1 {
                // Direct half comparison: no non-echo can pass, and every
                // echo appears for exactly its own (half, i).
                if &b[i..i + half] == &b[i + half..i + 2 * half] {
                    // The set silently discards repeats — equal substrings
                    // hash/compare identically — so its size is the answer.
                    seen.insert(&text[i..i + 2 * half]);
                }
            }
        }
        seen.len() as i32
    }
}
