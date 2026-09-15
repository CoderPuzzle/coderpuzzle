func percentageLetter(s string, letter string) int {
	// One pass counts the matches; multiplying before dividing keeps the
	// rounded-down percentage entirely in integer arithmetic.
	count := 0
	for index := 0; index < len(s); index++ {
		if s[index] == letter[0] {
			count++
		}
	}
	return count * 100 / len(s)
}
