func getLongestSubsequence(words []string, groups []int) []string {
	// Taking the first element of every maximal run of equal group values
	// pins one deterministic answer out of the many the statement permits.
	result := []string{words[0]}
	for i := 1; i < len(groups); i++ {
		if groups[i] != groups[i-1] {
			result = append(result, words[i])
		}
	}
	return result
}
