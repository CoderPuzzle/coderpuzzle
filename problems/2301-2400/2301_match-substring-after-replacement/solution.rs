impl Solution {
    pub fn match_replacement(s: String, sub: String, mappings: Vec<Vec<String>>) -> bool {
        let bytes: Vec<u8> = s.into_bytes();
        // One spare word: words * 64 >= bytes.len() for every length.
        let words = bytes.len() / 64 + 1;
        // base[t] marks every position of s holding character t; matched[old]
        // extends it with the positions each declared target covers, so bit p
        // of matched[old] is exactly matched(old, bytes[p]).
        let mut base: Vec<Vec<u64>> = vec![vec![0; words]; 128];
        for (p, &byte) in bytes.iter().enumerate() {
            base[byte as usize][p / 64] |= 1u64 << (p % 64);
        }
        let mut matched = base.clone();
        for pair in &mappings {
            let old = pair[0].as_bytes()[0] as usize;
            let nw = pair[1].as_bytes()[0] as usize;
            for k in 0..words {
                matched[old][k] |= base[nw][k];
            }
        }
        // bit e of seen marks a window whose first j + 1 characters all match
        // and that ends at e. Seed with the first character's mask; every
        // later character grows the survivors one position deeper into s.
        let seed = &matched[sub.as_bytes()[0] as usize];
        let mut seen: Vec<u64> = seed.clone();
        for byte in sub.as_bytes().iter().skip(1) {
            // Shift every survivor one position deeper; bits pushed past the
            // top word die at the AND below, whose rows hold no bit >= n.
            let mut carry = 0u64;
            for word in seen.iter_mut() {
                let next_carry = *word >> 63;
                *word = (*word << 1) | carry;
                carry = next_carry;
            }
            let row = &matched[*byte as usize];
            for k in 0..words {
                seen[k] &= row[k];
            }
        }
        seen.iter().any(|&word| word != 0)
    }
}
