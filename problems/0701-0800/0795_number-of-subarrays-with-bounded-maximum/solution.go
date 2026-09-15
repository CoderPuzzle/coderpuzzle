func numSubarrayBoundedMax(nums []int, left int, right int) int {
	// One-sided count of subarrays whose max is <= bound; the
	// answer follows by subtracting the two bounds.
	countBelow := func(bound int) int64 {
		var total, run int64
		for _, v := range nums {
			if v <= bound {
				// run = length of the current streak of in-bounds
				// elements: this element ends exactly run new
				// subarrays, each counted once at its right end.
				run++
				total += run
			} else {
				// Above the bound: no valid subarray crosses here.
				run = 0
			}
		}
		return total
	}

	// Max in [left, right] iff at most right but not at most
	// left - 1; with left = 0 the subtracted count is empty.
	return int(countBelow(right) - countBelow(left-1))
}
