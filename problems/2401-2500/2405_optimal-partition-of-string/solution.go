func partitionString(s string) int {
	count := 1
	seen := 0
	for i := 0; i < len(s); i++ {
		bit := 1 << (s[i] - 'a')
		if seen&bit != 0 {
			count++
			seen = bit
		} else {
			seen |= bit
		}
	}
	return count
}
