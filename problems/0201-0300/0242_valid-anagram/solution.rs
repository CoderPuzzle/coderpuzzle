impl Solution {
    pub fn is_anagram(s: String, t: String) -> bool {
        // An anagram is a rearrangement: both strings must hold exactly the
        // same letters with the same counts. The constraints promise lowercase
        // English letters, so 26 counters, one per letter, capture the multiset.
        if s.len() != t.len() {
            // Different lengths can never share the same multiset of letters.
            return false;
        }
        let mut counts = [0; 26];
        for (s_char, t_char) in s.chars().zip(t.chars()) {
            counts[(s_char as u8 - b'a') as usize] += 1;
            counts[(t_char as u8 - b'a') as usize] -= 1;
        }
        // A nonzero slot is a letter the two strings disagreed on.
        counts.iter().all(|&count| count == 0)
    }
}
