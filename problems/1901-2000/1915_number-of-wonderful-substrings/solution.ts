function wonderfulSubstrings(word: string): number {
    // count[m] = prefixes seen so far with parity mask m (10 bits, letters a..j).
    // count[0] = 1 seeds the empty prefix so substrings starting at index 0 count.
    const count = new Array<number>(1024).fill(0);
    count[0] = 1;
    let mask = 0;
    let total = 0;
    for (let i = 0; i < word.length; i++) {
        mask ^= 1 << (word.charCodeAt(i) - 97);
        // Substring between two prefixes with masks P, Q has parity P^Q:
        // wonderful iff P == Q (all even) ...
        total += count[mask];
        // ... or P^Q is a single bit (exactly one odd letter).
        for (let b = 0; b < 10; b++) {
            total += count[mask ^ (1 << b)];
        }
        // Increment AFTER counting so each pair uses an earlier prefix —
        // every substring is counted exactly once.
        count[mask] += 1;
    }
    return total;
}
