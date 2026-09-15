// A size-k group anchored at start s spans the circle's tiles s .. s + k - 1
// and alternates exactly when its k - 1 neighbor pairs all differ. Sweep
// virtual positions 0 .. n + k - 2 (virtual index p reads tile p % n, so
// pairs continue seamlessly across the seam), tracking the alternating run
// ending there; each position credits anchor p - (k - 1) when it is a real
// start (0..n-1) and the run has reached k. Anchors are bounded to one lap,
// so nothing double counts.
func numberOfAlternatingGroups(colors []int, k int) int {
	n := len(colors)
	count := 0
	run := 0
	for p := 0; p <= n+k-2; p++ {
		if p > 0 && colors[p%n] != colors[(p-1)%n] {
			run++
		} else {
			run = 1
		}
		if anchor := p - (k - 1); anchor >= 0 && anchor < n && run >= k {
			count++
		}
	}
	return count
}
