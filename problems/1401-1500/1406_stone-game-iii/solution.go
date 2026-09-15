func stoneGameIII(stoneValue []int) string {
	n := len(stoneValue)
	// dp[i] = best (current player's score - opponent's score) on the
	// suffix starting at i; dp[n] = 0 is the empty-row base.
	dp := make([]int64, n+1)
	// Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
	for i := n - 1; i >= 0; i-- {
		take := int64(0)
		best := int64(-1) << 62
		// Try taking 1-3 piles; the clamp handles short rows. Taking
		// piles i..j earns `take`, then the opponent plays optimally and
		// wins dp[j+1] over us, so the net is take - dp[j+1].
		hi := i + 3
		if hi > n {
			hi = n
		}
		for j := i; j < hi; j++ {
			take += int64(stoneValue[j])
			cand := take - dp[j+1]
			if cand > best {
				best = cand
			}
		}
		dp[i] = best
	}
	// Alice moves first: dp[0] is her optimal margin over Bob.
	if dp[0] > 0 {
		return "Alice"
	}
	if dp[0] < 0 {
		return "Bob"
	}
	return "Tie"
}
