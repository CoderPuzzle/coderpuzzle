func distinctPoints(s string, k int) int {
	n := len(s)
	// Moves add like vectors, so the endpoint left after deleting a window
	// is the full-walk endpoint minus the window's own displacement — only
	// window sums matter, never the re-walk.
	dx := map[byte]int{'L': -1, 'R': 1}
	dy := map[byte]int{'D': -1, 'U': 1}
	tx, ty := 0, 0
	for i := 0; i < n; i++ {
		tx += dx[s[i]]
		ty += dy[s[i]]
	}
	// Slide the length-k window, updating its displacement in O(1) per step
	// — drop the outgoing move, pick up the incoming one — and collect the
	// endpoint every deletion produces.
	wx, wy := 0, 0
	for i := 0; i < k; i++ {
		wx += dx[s[i]]
		wy += dy[s[i]]
	}
	seen := make(map[[2]int]struct{}, n-k+1)
	for i := 0; i+k <= n; i++ {
		seen[[2]int{tx - wx, ty - wy}] = struct{}{}
		if i+k < n {
			wx += dx[s[i+k]] - dx[s[i]]
			wy += dy[s[i+k]] - dy[s[i]]
		}
	}
	return len(seen)
}
