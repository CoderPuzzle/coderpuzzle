use std::collections::HashMap;

impl Solution {
    pub fn is_isomorphic(s: String, t: String) -> bool {
        // The contract is symmetric and names its own data structure: every
        // character of s keeps one consistent replacement (forward), and no
        // two characters share a replacement (reverse). Each clause is one
        // map, enforced together in a single order-preserving pass.
        if s.len() != t.len() {
            // Strings of different lengths can never be aligned position for position.
            return false;
        }
        let mut forward: HashMap<char, char> = HashMap::new();
        let mut reverse: HashMap<char, char> = HashMap::new();
        for (s_char, t_char) in s.chars().zip(t.chars()) {
            // One branch per contract clause: a source already bound to a
            // different replacement, or a target already claimed by another source.
            if let Some(&bound) = forward.get(&s_char) {
                if bound != t_char {
                    return false;
                }
            }
            if let Some(&owner) = reverse.get(&t_char) {
                if owner != s_char {
                    return false;
                }
            }
            forward.insert(s_char, t_char);
            reverse.insert(t_char, s_char);
        }
        true
    }
}
