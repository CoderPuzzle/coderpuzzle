func maxRunTime(n int, batteries []int) int64 {
	n64 := int64(n)
	var sum int64
	for _, b := range batteries {
		sum += int64(b)
	}
	feasible := func(t int64) bool {
		// Over a t-minute horizon a battery powers one computer at a time,
		// so it contributes at most min(b, t) computer-minutes; the capped
		// pool is freely schedulable, and n computers for t minutes need
		// exactly n*t.
		var total int64
		for _, b := range batteries {
			bb := int64(b)
			if bb > t {
				bb = t
			}
			total += bb
		}
		return total >= n64*t
	}
	// Feasibility is monotone in t, so binary search the largest t; the
	// total charge over n computers is an absolute ceiling.
	lo, hi := int64(0), sum/n64
	for lo < hi {
		// Upper-mid keeps the search converging on the max feasible value.
		mid := (lo + hi + 1) / 2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
