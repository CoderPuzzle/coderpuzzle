func longestRepeatingSubstring(s string) int {
	n := len(s)

	// Exact check: every length-`length` window goes into a set, so a hit
	// means two identical substrings (overlaps allowed) — no hashing caveats.
	hasRepeat := func(length int) bool {
		if length == 0 {
			return true
		}
		seen := make(map[string]bool)
		for i := 0; i+length <= n; i++ {
			piece := s[i : i+length]
			if seen[piece] {
				return true
			}
			seen[piece] = true
		}
		return false
	}

	// Monotone feasibility: a repeat of length L implies repeats of every
	// shorter length, so binary search the largest feasible length. The
	// upper-mid convention keeps the loop terminating; hi starts at n-1
	// because the whole string cannot repeat within itself.
	lo, hi := 0, n-1
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if hasRepeat(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
