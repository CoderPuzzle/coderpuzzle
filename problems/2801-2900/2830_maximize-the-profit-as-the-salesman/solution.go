func maximizeTheProfit(n int, offers [][]int) int {
	// Non-overlapping offers make this weighted interval scheduling on a
	// line. Bucket offers by end house — the bucket array itself provides
	// ordering by end position, so no sorting is needed.
	byEnd := make([][][2]int, n)
	for _, offer := range offers {
		e := offer[1]
		byEnd[e] = append(byEnd[e], [2]int{offer[0], offer[2]})
	}
	// dp[e+1]: best gold from houses 0..e. Either house e stays unsold
	// (carry dp[e] forward) or some offer [start, e, gold] is sold on top of
	// the optimum strictly before its start — reading dp[start] is what
	// keeps overlapping offers from being combined.
	dp := make([]int64, n+1)
	for end := 0; end < n; end++ {
		dp[end+1] = dp[end]
		for _, sg := range byEnd[end] {
			cand := dp[sg[0]] + int64(sg[1])
			if cand > dp[end+1] {
				dp[end+1] = cand
			}
		}
	}
	return int(dp[n])
}
