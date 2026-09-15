impl Solution {
    pub fn wonderful_substrings(word: String) -> i64 {
        // count[m] = prefixes seen so far with parity mask m (10 bits, letters a..j).
        // count[0] = 1 seeds the empty prefix so substrings starting at index 0 count.
        let mut count = vec![0i64; 1024];
        count[0] = 1;
        let mut mask = 0usize;
        let mut total: i64 = 0;
        for ch in word.bytes() {
            mask ^= 1usize << (ch - b'a');
            // Substring between two prefixes with masks P, Q has parity P^Q:
            // wonderful iff P == Q (all even) ...
            total += count[mask];
            // ... or P^Q is a single bit (exactly one odd letter).
            for b in 0..10 {
                total += count[mask ^ (1usize << b)];
            }
            // Increment AFTER counting so each pair uses an earlier prefix —
            // every substring is counted exactly once.
            count[mask] += 1;
        }
        total
    }
}
