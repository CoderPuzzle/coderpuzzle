impl Solution {
    pub fn is_alien_sorted(words: Vec<String>, order: String) -> bool {
        // Rank of every letter under the alien alphabet.
        let mut rank = [0_u8; 26];
        for (index, letter) in order.bytes().enumerate() {
            rank[usize::from(letter - b'a')] = index as u8;
        }
        // Adjacent pairs decide the whole list: any out-of-order pair
        // falsifies it, and each pair's verdict is final.
        for pair in words.windows(2) {
            let first = pair[0].as_bytes();
            let second = pair[1].as_bytes();
            // March to the first differing position — the only one that
            // orders this pair.
            let length = first.len().min(second.len());
            let mut j = 0;
            while j < length && first[j] == second[j] {
                j += 1;
            }
            // A shared prefix: the shorter word is smaller, so only the
            // left word may be short; otherwise the first differing
            // letters decide, and the left word must lose that duel.
            if j == length {
                if first.len() > second.len() {
                    return false;
                }
            } else if rank[usize::from(first[j] - b'a')] > rank[usize::from(second[j] - b'a')] {
                return false;
            }
        }
        true
    }
}
