func minCost(n int, cost [][]int) int64 {
	// Paint equidistant pairs (k, n-1-k) outside-in. dp[a][b] is the
	// cheapest way to paint every pair so far, ending with outer colors
	// (a, b) — 9 states, because a pair only constrains the two houses
	// it touches in the next pair. Totals reach 10^10, past 32-bit.
	const inf = int64(1) << 60
	var dp [3][3]int64
	for a := 0; a < 3; a++ {
		for b := 0; b < 3; b++ {
			if a == b {
				dp[a][b] = inf
			} else {
				dp[a][b] = int64(cost[0][a]) + int64(cost[n-1][b])
			}
		}
	}
	for k := 1; k < n/2; k++ {
		left := cost[k]
		right := cost[n-1-k]
		// e[t][c]: best dp[t][b] over b != c — the previous right house
		// must differ from the new right one (adjacency on that side)
		var e [3][3]int64
		for t := 0; t < 3; t++ {
			e[t][0] = min(dp[t][1], dp[t][2])
			e[t][1] = min(dp[t][0], dp[t][2])
			e[t][2] = min(dp[t][0], dp[t][1])
		}
		var next [3][3]int64
		for a := 0; a < 3; a++ {
			for b := 0; b < 3; b++ {
				// the diagonal stays unreachable: a pair's two houses are
				// mirrors of each other and may not share a color
				if a == b {
					next[a][b] = inf
					continue
				}
				best := inf
				// drop left color a so the new left house differs from the
				// old one; column b was already excluded in e
				for t := 0; t < 3; t++ {
					if t != a {
						best = min(best, e[t][b])
					}
				}
				next[a][b] = best + int64(left[a]) + int64(right[b])
			}
		}
		dp = next
	}
	answer := inf
	for a := 0; a < 3; a++ {
		for b := 0; b < 3; b++ {
			answer = min(answer, dp[a][b])
		}
	}
	return answer
}
