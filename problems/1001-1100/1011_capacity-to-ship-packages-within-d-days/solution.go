func shipWithinDays(weights []int, days int) int {
	feasible := func(cap int) bool {
		need := 1
		current := 0
		// order fixed: greedily filling each day as full as possible
		// minimizes the day count, so this pass decides feasibility
		for _, w := range weights {
			if current+w > cap {
				need++
				if need > days {
					return false
				}
				current = w
			} else {
				current += w
			}
		}
		return true
	}

	// feasibility is monotone in capacity; lo must at least carry the
	// heaviest package, hi = total weight ships everything in one day
	lo := 0
	hi := 0
	for _, w := range weights {
		if w > lo {
			lo = w
		}
		hi += w
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		// hi always stays feasible, lo moves past infeasible midpoints,
		// so the loop ends on the least feasible capacity
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
