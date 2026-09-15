func numDistinct(s string, t string) int {
	m := len(t)
	// dp[j] = ways to form the first j chars of t using the prefix of s
	// processed so far. dp[0] = 1 encodes the empty string being formable
	// exactly once, by matching nothing. Counts are kept in int64s for
	// headroom during the run.
	dp := make([]int64, m+1)
	dp[0] = 1
	for i := 0; i < len(s); i++ {
		ch := s[i]
		// Sweep j downward so dp[j-1] is still the previous row's value
		// when read; a left-to-right sweep would let one character of s
		// be matched against several characters of t.
		for j := m; j > 0; j-- {
			// Reading ch can only create new ways where it matches: every
			// earlier way of forming t[:j-1] extends by matching ch there.
			// Elsewhere ch is simply skipped and the count is unchanged.
			if t[j-1] == ch {
				dp[j] += dp[j-1]
			}
		}
	}
	return int(dp[m])
}
