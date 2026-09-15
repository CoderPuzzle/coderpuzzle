func numberOfChild(n int, k int) int {
	// The holder walks 0 -> n-1 -> 0 in exactly 2 * (n - 1) seconds and
	// is back at child 0 facing right, so positions are periodic with
	// that cycle. Reduce k modulo the cycle: the first n - 1 steps walk
	// forward, the rest retrace backward at mirrored offsets.
	r := k % (2 * (n - 1))
	if r < n {
		return r
	}
	return 2*(n-1) - r
}
