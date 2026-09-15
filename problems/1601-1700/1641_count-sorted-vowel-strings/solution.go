func countVowelStrings(n int) int {
	dp := [5]int{1, 1, 1, 1, 1}
	for step := 0; step < n-1; step++ {
		var next [5]int
		prefix := 0
		for v := 0; v < 5; v++ {
			prefix += dp[v]
			next[v] = prefix
		}
		dp = next
	}
	total := 0
	for _, v := range dp {
		total += v
	}
	return total
}
