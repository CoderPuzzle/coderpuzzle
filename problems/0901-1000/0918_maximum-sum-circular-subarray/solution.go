func maxSubarraySumCircular(nums []int) int {
	total := 0
	for _, x := range nums {
		total += x
	}
	// One pass runs Kadane twice: bestMax for the non-wrapping case, and
	// bestMin because a wrapping subarray is total minus the omitted
	// middle chunk, which must be minimized. Seeding with nums[0] keeps
	// every candidate non-empty.
	curMax, bestMax := nums[0], nums[0]
	curMin, bestMin := nums[0], nums[0]
	for _, x := range nums[1:] {
		if curMax > 0 {
			curMax = x + curMax
		} else {
			curMax = x
		}
		if curMax > bestMax {
			bestMax = curMax
		}
		if curMin < 0 {
			curMin = x + curMin
		} else {
			curMin = x
		}
		if curMin < bestMin {
			bestMin = curMin
		}
	}
	if bestMax < 0 {
		// All negative: the wrap candidate degenerates to the empty
		// subarray, which is not allowed — answer is the best run.
		return bestMax
	}
	if total-bestMin > bestMax {
		return total - bestMin
	}
	return bestMax
}
