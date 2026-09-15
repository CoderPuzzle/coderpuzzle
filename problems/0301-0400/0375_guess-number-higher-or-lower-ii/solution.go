func getMoneyAmount(n int) int {
	// dp[i][j] = min money that guarantees finding any number in
	// [i, j]; padded to n+2 so the empty-side reads dp[i][guess-1]
	// and dp[guess+1][j] stay valid (and 0).
	size := n + 2
	dp := make([][]int, size)
	for i := range dp {
		dp[i] = make([]int, size)
	}
	// Fill by interval length: a range's value depends only on its
	// strictly shorter subranges. Length 1 is free (single candidate).
	for length := 2; length <= n; length++ {
		for i := 1; i <= n-length+1; i++ {
			j := i + length - 1
			best := int(^uint(0) >> 1)
			// Minimax: the opponent may hide in the worse side, so
			// guessing g costs g + max(dp of the two remaining sides).
			for guess := i; guess <= j; guess++ {
				lower := dp[i][guess-1]
				upper := dp[guess+1][j]
				cost := guess + max(lower, upper)
				if cost < best {
					best = cost
				}
			}
			dp[i][j] = best
		}
	}
	return dp[1][n]
}
