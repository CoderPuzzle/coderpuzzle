func minDays(bloomDay []int, m int, k int) int {
	n := len(bloomDay)
	// Not enough flowers to ever build m bouquets of k flowers each.
	if int64(m)*int64(k) > int64(n) {
		return -1
	}
	feasible := func(day int) bool {
		bouquets := 0
		// Length of the current run of consecutive bloomed flowers.
		run := 0
		for _, d := range bloomDay {
			if d <= day {
				run++
				if run == k {
					// A full run completes one bouquet; reset the run.
					bouquets++
					run = 0
				}
			} else {
				// Bouquets cannot span an unbloomed flower.
				run = 0
			}
		}
		return bouquets >= m
	}
	// Feasibility is monotone in the day (blooming only adds flowers), so
	// binary search the first feasible day between the extreme bloom days:
	// no flower opens before the first, and all are open by the last.
	lo, hi := bloomDay[0], bloomDay[0]
	for _, d := range bloomDay {
		if d < lo {
			lo = d
		}
		if d > hi {
			hi = d
		}
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
