func stoneGameII(piles []int) int {
	n := len(piles)
	suf := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suf[i] = suf[i+1] + piles[i]
	}
	// dp[i][m]: max stones the player to move collects from piles[i:]
	// when the current M is m. dp[n][*] = 0.
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i := n - 1; i >= 0; i-- {
		for m := 1; m <= n; m++ {
			limit := 2 * m
			if limit > n-i {
				limit = n - i
			}
			best := 0
			for x := 1; x <= limit; x++ {
				m2 := m
				if x > m2 {
					m2 = x
				}
				if m2 > n {
					m2 = n
				}
				// taking x piles hands over (i+x, max(m, x)); the two
				// players split the whole suffix, so the mover's haul is
				// the suffix total minus the opponent's optimal dp
				if cand := suf[i] - dp[i+x][m2]; cand > best {
					best = cand
				}
			}
			dp[i][m] = best
		}
	}
	return dp[0][1]
}
