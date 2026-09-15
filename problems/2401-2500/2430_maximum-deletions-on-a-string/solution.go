func deleteString(s string) int {
	// dp[i] = max operations to delete s[i:]; LCP via two rolling rows
	n := len(s)
	b := []byte(s)
	dp := make([]int, n+1)
	for i := 0; i < n; i++ {
		dp[i] = 1
	}
	dp[n] = 0                   // empty suffix needs no operations
	nextRow := make([]int, n+1) // lcp row for index i+1
	cur := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		si := b[i]
		for j := 0; j <= n; j++ {
			cur[j] = 0
		}
		for j := n - 1; j >= 0; j-- {
			if si == b[j] {
				cur[j] = nextRow[j+1] + 1
			}
		}
		best := 1
		maxLen := (n - i) / 2
		for length := 1; length <= maxLen; length++ {
			if cur[i+length] >= length {
				cand := 1 + dp[i+length]
				if cand > best {
					best = cand
				}
			}
		}
		dp[i] = best
		nextRow, cur = cur, nextRow
	}
	return dp[0]
}
