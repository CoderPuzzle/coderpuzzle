func splitArray(nums []int) int64 {
	// e ends the longest strictly increasing prefix: a left part
	// nums[0..i] is strictly increasing exactly when i <= e.
	e := 0
	for e+1 < len(nums) && nums[e+1] > nums[e] {
		e++
	}
	// s starts the longest strictly decreasing suffix: a right part
	// nums[i+1..n-1] is strictly decreasing exactly when i + 1 >= s.
	s := len(nums) - 1
	for s > 0 && nums[s-1] > nums[s] {
		s--
	}
	// One scan accumulates the left sum; the right sum is the total minus
	// it. Only indices inside the anchor window are scored. Sums reach
	// 10^10, so every accumulator stays in 64 bits.
	total := int64(0)
	for _, x := range nums {
		total += int64(x)
	}
	best := int64(-1)
	left := int64(0)
	for i := 0; i+1 < len(nums); i++ {
		left += int64(nums[i])
		if i+1 >= s && i <= e {
			diff := left - (total - left)
			if diff < 0 {
				diff = -diff
			}
			if best == -1 || diff < best {
				best = diff
			}
		}
	}
	return best
}
