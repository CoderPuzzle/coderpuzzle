impl Solution {
    pub fn is_one_edit_distance(s: String, t: String) -> bool {
        // Swap so s is the shorter (or equal) string: a delete on one side
        // is an insert on the other, so one orientation covers both.
        let (s, t) = if s.len() > t.len() { (&t, &s) } else { (&s, &t) };
        // Byte indices are character indices here: the alphabet is ASCII
        // letters and digits, one byte per character.
        // No single edit changes the length by more than one.
        if t.len() - s.len() > 1 {
            return false;
        }
        for (i, (a, b)) in s.bytes().zip(t.bytes()).enumerate() {
            if a != b {
                if s.len() == t.len() {
                    // Replace: both tails after the first divergence must agree.
                    return s[i + 1..] == t[i + 1..];
                }
                // Insert t[i] into s: s from here must match t from the next slot.
                return s[i..] == t[i + 1..];
            }
        }
        // s is a prefix of t: identical strings are zero edits apart, so exactly
        // one edit remains only if t has one character more.
        t.len() - s.len() == 1
    }
}
