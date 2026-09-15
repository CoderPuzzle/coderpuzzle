func isAdjacentDiffAtMostTwo(s string) bool {
	for i := 1; i < len(s); i++ {
		diff := int(s[i]) - int(s[i-1])
		if diff < 0 {
			diff = -diff
		}
		if diff > 2 {
			return false
		}
	}
	return true
}
