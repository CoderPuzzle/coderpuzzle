func wonderfulSubstrings(word string) int64 {
	// count[m] = prefixes seen so far with parity mask m (10 bits, letters a..j).
	// count[0] = 1 seeds the empty prefix so substrings starting at index 0 count.
	var count [1024]int64
	count[0] = 1
	mask := 0
	var total int64
	for i := 0; i < len(word); i++ {
		mask ^= 1 << (word[i] - 'a')
		// Substring between two prefixes with masks P, Q has parity P^Q:
		// wonderful iff P == Q (all even) ...
		total += count[mask]
		// ... or P^Q is a single bit (exactly one odd letter).
		for b := 0; b < 10; b++ {
			total += count[mask^(1<<b)]
		}
		// Increment AFTER counting so each pair uses an earlier prefix —
		// every substring is counted exactly once.
		count[mask]++
	}
	return total
}
