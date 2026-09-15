func longestSubsequence(arr []int, difference int) int {
	// A fixed difference means each step must land on v + difference, so the
	// DP collapses from positions to a map keyed by ending value.
	dp := make(map[int]int)
	best := 0
	for _, x := range arr {
		// Best chain ending at x is one longer than the best ending at
		// x - difference (missing key reads as 0, i.e. no predecessor yet).
		// The lookup precedes the write, so only strictly-left elements are
		// used and the chain never runs backwards.
		len := dp[x-difference] + 1
		// Overwriting is safe: a later chain through the same value is
		// always at least as long as an earlier one.
		dp[x] = len
		if len > best {
			best = len
		}
	}
	return best
}
