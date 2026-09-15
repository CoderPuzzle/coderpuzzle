func maximizeWin(prizePositions []int, k int) int {
	// Sliding windows in each direction build the best single k-window
	// inside every index prefix and suffix; the answer maximizes their
	// sum over all split points. Counts stay <= n <= 10^5, inside int.
	n := len(prizePositions)
	pre := make([]int, n+1)
	for t, s, mx := 0, 0, 0; t < n; t++ {
		for prizePositions[t]-prizePositions[s] > k {
			s++
		}
		if c := t - s + 1; c > mx {
			mx = c
		}
		pre[t+1] = mx
	}
	suf := make([]int, n+1)
	for e, g, mx := n-1, n-1, 0; e >= 0; e-- {
		for prizePositions[g]-prizePositions[e] > k {
			g--
		}
		if c := g - e + 1; c > mx {
			mx = c
		}
		suf[e] = mx
	}
	ans := 0
	for c := 0; c <= n; c++ {
		if v := pre[c] + suf[c]; v > ans {
			ans = v
		}
	}
	return ans
}
