func maxPoints(points [][]int) int64 {
	m := len(points)
	n := len(points[0])
	// dp[c] = best score with the current row's pick at column c; the
	// first row seeds it with its own point values.
	prev := make([]int64, n)
	for c := 0; c < n; c++ {
		prev[c] = int64(points[0][c])
	}
	left := make([]int64, n)
	right := make([]int64, n)
	for r := 1; r < m; r++ {
		// Split |p - c| by direction: from the left the carry-over is
		// dp[p] + p - c, so a running max of dp[p] + p replaces the
		// quadratic predecessor rescan.
		best := prev[0] + 0
		for c := 0; c < n; c++ {
			if prev[c]+int64(c) > best {
				best = prev[c] + int64(c)
			}
			left[c] = best
		}
		// Mirror sweep from the right: running max of dp[p] - p, p >= c.
		best = prev[n-1] - int64(n-1)
		for c := n - 1; c >= 0; c-- {
			if prev[c]-int64(c) > best {
				best = prev[c] - int64(c)
			}
			right[c] = best
		}
		// Both directions cover p == c (zero penalty), so every
		// predecessor is considered under the correct penalty sign.
		for c := 0; c < n; c++ {
			l := left[c] - int64(c)
			rr := right[c] + int64(c)
			b := l
			if rr > b {
				b = rr
			}
			prev[c] = int64(points[r][c]) + b
		}
	}
	ans := prev[0]
	for c := 1; c < n; c++ {
		if prev[c] > ans {
			ans = prev[c]
		}
	}
	return ans
}
