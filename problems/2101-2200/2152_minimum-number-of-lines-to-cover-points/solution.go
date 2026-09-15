// At most 10 points, so the set of covered points fits in a bitmask:
// dp[covered] = fewest lines covering exactly that subset. In each state
// the lowest uncovered point i is covered by the next line, so trying i
// alone and every line through i and one more uncovered point j exhausts
// every option.
func minimumLines(points [][]int) int {
	n := len(points)
	full := (1 << n) - 1
	// lineMask[i][j] = all points on the straight line through i and j;
	// the cross-product comparison tests collinearity on integers, and
	// coordinates bounded by 100 keep every product well inside int.
	lineMask := make([][]int, n)
	for i := range lineMask {
		lineMask[i] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i == j {
				continue
			}
			dx1 := points[j][0] - points[i][0]
			dy1 := points[j][1] - points[i][1]
			mask := (1 << i) | (1 << j)
			for k := 0; k < n; k++ {
				dx2 := points[k][0] - points[i][0]
				dy2 := points[k][1] - points[i][1]
				if k != i && k != j && dx1*dy2 == dy1*dx2 {
					mask |= 1 << k
				}
			}
			lineMask[i][j] = mask
		}
	}
	unreachable := n + 1
	dp := make([]int, full+1)
	for i := range dp {
		dp[i] = unreachable
	}
	dp[0] = 0
	for covered := 0; covered < full; covered++ {
		if dp[covered] == unreachable {
			continue
		}
		i := 0
		for covered&(1<<i) != 0 {
			i++
		}
		nxt := covered | (1 << i)
		if dp[covered]+1 < dp[nxt] {
			dp[nxt] = dp[covered] + 1
		}
		for j := 0; j < n; j++ {
			if j == i || covered&(1<<j) != 0 {
				continue
			}
			nxt = covered | lineMask[i][j]
			if dp[covered]+1 < dp[nxt] {
				dp[nxt] = dp[covered] + 1
			}
		}
	}
	return dp[full]
}
