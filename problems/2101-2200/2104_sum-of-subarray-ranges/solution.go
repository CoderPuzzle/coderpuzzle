func subArrayRanges(nums []int) int64 {
	n := len(nums)
	var total int64
	for i := 0; i < n; i++ {
		// Extending nums[i..j-1] by nums[j] updates the range in O(1):
		// only the new element can tighten mn or raise mx.
		mn, mx := nums[i], nums[i]
		// j starts at i+1, skipping length-1 subarrays (range 0).
		for j := i + 1; j < n; j++ {
			// else-if is safe: one element can't be both a strict new
			// minimum and a strict new maximum.
			if nums[j] < mn {
				mn = nums[j]
			} else if nums[j] > mx {
				mx = nums[j]
			}
			total += int64(mx - mn)
		}
	}
	return total
}
