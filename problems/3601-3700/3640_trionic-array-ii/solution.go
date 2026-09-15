func maxSumTrionic(nums []int) int64 {
	// Best sums of subarrays ending at the previous element: s0 inside the
	// first climb (length >= 2), s1 descending after a finished climb, s2 a
	// full trionic mid-final-climb. Unreachable sits on a sentinel far
	// below any real sum.
	neg := -(int64(1) << 60)
	s0, s1, s2 := neg, neg, neg
	best := neg
	for i := 1; i < len(nums); i++ {
		prev, x := int64(nums[i-1]), int64(nums[i])
		if x > prev {
			// Rising step: the final climb continues or opens from a
			// finished descent; the first climb extends from itself or
			// grows past the lone previous element.
			s2 = max(s2, s1) + x
			s0 = max(s0, prev) + x
			s1 = neg
		} else if x < prev {
			// Falling step: the descent continues or opens from a finished
			// two-element climb; climbs cannot persist.
			s1 = max(s1, s0) + x
			s0 = neg
			s2 = neg
		} else {
			// Equal neighbors break strictness on both sides.
			s0 = neg
			s1 = neg
			s2 = neg
		}
		best = max(best, s2)
	}
	return best
}
