func splitArray(nums []int, k int) int {
	feasible := func(limit int64) bool {
		// Greedy piece count under the limit: extending each piece as far
		// as possible never forces more pieces later.
		pieces, current := int64(1), int64(0)
		for _, value := range nums {
			if current+int64(value) > limit {
				pieces++
				if pieces > int64(k) {
					return false
				}
				current = int64(value)
			} else {
				current += int64(value)
			}
		}
		return true
	}

	// Binary-search the answer: the smallest limit for which k pieces
	// suffice (the piece count only falls as the limit rises). Bounds:
	// no element can be split, and one piece covering everything works.
	lo, hi := int64(-1)<<62, int64(0)
	for _, value := range nums {
		if int64(value) > lo {
			lo = int64(value)
		}
		hi += int64(value)
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
