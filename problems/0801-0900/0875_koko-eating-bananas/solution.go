func minEatingSpeed(piles []int, h int) int {
	// Pile p costs ceil(p / k) hours; hours(k) only shrinks as k
	// grows, so feasibility is a threshold. Ceil via (p + k - 1) / k
	// with an int64 accumulator: the total can reach 10^4 * 10^9.
	hoursNeeded := func(k int) int64 {
		var total int64
		for _, pile := range piles {
			total += int64((pile + k - 1) / k)
		}
		return total
	}
	// Range [1, max(piles)]: the max speed empties any pile in a
	// single hour, and h >= len(piles) makes it always feasible.
	lo, hi := 1, 0
	for _, pile := range piles {
		if pile > hi {
			hi = pile
		}
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		// Lower-bound bisection: feasible means the answer is mid
		// or smaller; infeasible raises lo. Exiting, lo is the
		// smallest feasible speed.
		if hoursNeeded(mid) <= int64(h) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
