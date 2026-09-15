func maximumCandies(candies []int, k int64) int {
	// feasibility is monotone in c: if every child can get c, any smaller
	// amount works too, so binary search the largest feasible pile size
	can := func(c int) bool {
		// c == 0 is vacuously feasible: pins the search's lower end at 0
		if c == 0 {
			return true
		}
		var cnt int64
		for _, p := range candies {
			// a pile of size p splits into exactly p / c child portions
			cnt += int64(p / c)
			if cnt >= k {
				return true
			}
		}
		return cnt >= k
	}

	lo, hi := 0, 0
	for _, p := range candies {
		if p > hi {
			hi = p
		}
	}
	for lo < hi {
		// upper mid: feasible moves lo up to mid; the +1 avoids stalling
		mid := lo + (hi-lo+1)/2
		if can(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
