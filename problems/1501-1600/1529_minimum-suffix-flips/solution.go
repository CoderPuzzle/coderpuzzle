func minFlips(target string) int {
	// `current` tracks the bit the string holds at the position just
	// processed, starting from the initial all-zero string. Each mismatch
	// means the suffix from here on needs one more flip, and flips the
	// tracked bit to match.
	current := byte('0')
	count := 0
	for i := 0; i < len(target); i++ {
		c := target[i]
		if c != current {
			count++
			current = c
		}
	}
	return count
}
