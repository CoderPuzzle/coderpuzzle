func maxTotalFruits(fruits [][]int, startPos int, k int) int64 {
	n := len(fruits)
	// An optimal walk turns at most once, so the harvest is always one
	// contiguous interval of the position-sorted fruit array. Prefix sums
	// give each interval's fruit total in O(1).
	prefix := make([]int64, n+1)
	for i, f := range fruits {
		prefix[i+1] = prefix[i] + int64(f[1])
	}

	windowCost := func(leftPos, rightPos int) int64 {
		// Cheapest cost of covering the interval from startPos: straight
		// line when the start lies outside it; otherwise double the leg
		// walked first, taking the better direction to double.
		if startPos <= leftPos {
			return int64(rightPos - startPos)
		}
		if startPos >= rightPos {
			return int64(startPos - leftPos)
		}
		a := int64(2*(startPos-leftPos) + (rightPos - startPos))
		b := int64(2*(rightPos-startPos) + (startPos - leftPos))
		if a < b {
			return a
		}
		return b
	}

	var best int64
	left := 0
	// Two-pointer sweep: shrink while the interval exceeds k, and re-check
	// affordability before counting (a lone unreachable fruit never
	// contributes). Both pointers only advance, so the sweep is linear.
	for right := 0; right < n; right++ {
		for left < right && windowCost(fruits[left][0], fruits[right][0]) > int64(k) {
			left++
		}
		if windowCost(fruits[left][0], fruits[right][0]) <= int64(k) {
			sum := prefix[right+1] - prefix[left]
			if sum > best {
				best = sum
			}
		}
	}
	return best
}
