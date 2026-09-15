impl Solution {
    // Walk t once, advancing a pointer into s on every match; greedy is
    // safe — matching each character at its earliest legal position in t
    // never hurts a later one.
    pub fn is_subsequence(s: String, t: String) -> bool {
        let target = s.as_bytes();
        let mut i = 0;
        for ch in t.bytes() {
            if i < target.len() && ch == target[i] {
                i += 1;
            }
        }
        // All of s was matched in order iff the pointer reached its end.
        i == target.len()
    }
}
