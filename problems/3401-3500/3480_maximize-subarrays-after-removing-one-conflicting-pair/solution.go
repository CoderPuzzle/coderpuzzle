func maxSubarrays(n int, conflictingPairs [][]int) int64 {
	// bucket each pair at its smaller element; g[a] collects the larger endpoints
	g := make([][]int, n+1)
	for _, pair := range conflictingPairs {
		a, b := pair[0], pair[1]
		if a > b {
			a, b = b, a
		}
		g[a] = append(g[a], b)
	}
	cnt := make([]int64, n+2)
	var ans, add int64
	b1, b2 := n+1, n+1
	// sweep left endpoints right to left; b1, b2 are the smallest and
	// second-smallest right endpoint among pairs whose smaller side is >= a
	for a := n; a >= 1; a-- {
		for _, b := range g[a] {
			if b < b1 {
				b2, b1 = b1, b
			} else if b < b2 {
				b2 = b
			}
		}
		// a subarray starting at a stays valid up to just before b1
		ans += int64(b1 - a)
		// removing the pair that uniquely supplies b1 relaxes its bound to
		// b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
		cnt[b1] += int64(b2 - b1)
		if cnt[b1] > add {
			add = cnt[b1]
		}
	}
	ans += add
	return ans
}
