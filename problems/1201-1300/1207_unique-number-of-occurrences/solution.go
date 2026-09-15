// Count every value, then test each count for a repeat: the answer is
// false exactly when a second value reports the same frequency.
func uniqueOccurrences(arr []int) bool {
	counts := make(map[int]int)
	for _, value := range arr {
		counts[value]++
	}
	seen := make(map[int]bool)
	for _, count := range counts {
		if seen[count] {
			return false
		}
		seen[count] = true
	}
	return true
}
