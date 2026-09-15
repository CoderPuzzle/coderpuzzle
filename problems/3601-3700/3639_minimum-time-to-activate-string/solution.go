func minTime(s string, order []int, k int) int {
	n := len(s)
	// Once every character is a '*', all n * (n + 1) / 2 substrings are
	// valid; if even that total falls short of k, no time ever works.
	// The total passes 32 bits near n = 10^5, hence the widening.
	total := int64(n) * int64(n+1) / 2
	if total < int64(k) {
		return -1
	}
	// Number of substrings holding at least one star after the first
	// t + 1 positions are starred: the total minus what the star-free
	// runs hide, each maximal run of length L hiding 1 + 2 + ... + L.
	validCount := func(t int) int64 {
		starred := make([]bool, n)
		for i := 0; i <= t; i++ {
			starred[order[i]] = true
		}
		var invalid, run int64
		for _, flag := range starred {
			if flag {
				run = 0
			} else {
				run++
				invalid += run
			}
		}
		return total - invalid
	}
	// Each replacement only turns more substrings valid, so activity is
	// monotone in t and the earliest active time admits a binary search.
	// Feasibility at t = n - 1 is guaranteed by the early return above.
	lo, hi := 0, n-1
	for lo < hi {
		mid := (lo + hi) / 2
		if validCount(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
