// Consistency depends only on which letters a word uses, so fold allowed
// into one 26-bit mask: bit i means 'a' + i may appear.
func countConsistentStrings(allowed string, words []string) int {
	allowedMask := 0
	for index := 0; index < len(allowed); index++ {
		allowedMask |= 1 << (allowed[index] - 'a')
	}
	count := 0
	for _, word := range words {
		mask := 0
		for index := 0; index < len(word); index++ {
			mask |= 1 << (word[index] - 'a')
		}
		// the word is consistent exactly when its mask holds no bit
		// outside allowedMask — one AND answers the subset question
		if mask&^allowedMask == 0 {
			count++
		}
	}
	return count
}
