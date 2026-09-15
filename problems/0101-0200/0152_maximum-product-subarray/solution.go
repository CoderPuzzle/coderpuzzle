func maxProduct(nums []int) int {
	// Seed with the first element so a single-element array returns itself.
	best := nums[0]
	// Extremes of subarray products ending exactly at the current index; the
	// minimum must be carried too because a negative factor reverses the
	// order and can turn the worst product into the next best.
	curMax := nums[0]
	curMin := nums[0]
	for _, value := range nums[1:] {
		// A negative incoming value swaps the extremes so the usual
		// candidate rules apply unchanged.
		if value < 0 {
			curMax, curMin = curMin, curMax
		}
		// Either start a fresh subarray at this value or extend.
		if value > curMax*value {
			curMax = value
		} else {
			curMax = curMax * value
		}
		if value < curMin*value {
			curMin = value
		} else {
			curMin = curMin * value
		}
		if curMax > best {
			best = curMax
		}
	}
	return best
}
