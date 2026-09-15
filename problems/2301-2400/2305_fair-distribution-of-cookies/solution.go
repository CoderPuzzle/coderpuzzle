func distributeCookies(cookies []int, k int) int {
	children := make([]int64, k)
	// huge start guarantees the first complete leaf always improves on best
	best := int64(1) << 62

	var backtrack func(i int, curMax int64)
	backtrack = func(i int, curMax int64) {
		// bound pruning: the running max only grows, so this branch can no
		// longer beat the best complete distribution found so far
		if curMax >= best {
			return
		}
		// all bags placed: the running max is this leaf's unfairness
		if i == len(cookies) {
			best = curMax
			return
		}
		tried := make(map[int64]bool)
		for j := 0; j < k; j++ {
			// symmetry: children holding equal totals are interchangeable,
			// so try each distinct total only once
			if tried[children[j]] {
				continue
			}
			tried[children[j]] = true
			children[j] += int64(cookies[i])
			// running maximum of the per-child totals
			nm := curMax
			if children[j] > nm {
				nm = children[j]
			}
			backtrack(i+1, nm)
			children[j] -= int64(cookies[i])
		}
	}

	backtrack(0, 0)
	return int(best)
}
