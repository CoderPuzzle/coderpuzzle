func minimumPartition(s string, k int) int {
	// Greedy from the left: extend the current piece while its value
	// stays <= k, since splitting as late as possible is optimal. The
	// tentative value k * 10 + 9 exceeds int32, so compute in int64.
	pieces := 1
	value := int64(0)
	limit := int64(k)
	for i := 0; i < len(s); i++ {
		digit := int64(s[i] - '0')
		candidate := value*10 + digit
		if candidate <= limit {
			value = candidate
		} else {
			// This digit must open a new piece; fail if it cannot stand
			// alone either.
			if digit > limit {
				return -1
			}
			pieces++
			value = digit
		}
	}
	return pieces
}
