func maxScore(nums []int) int64 {
	// Operations only peel elements off the ends, so what remains is a
	// contiguous block: 1 element when n is odd, 2 adjacent when n is
	// even. Every removed element scores exactly once, so maximize the
	// score by leaving the cheapest possible block behind.
	var total int64
	for _, v := range nums {
		total += int64(v)
	}
	if len(nums)%2 == 1 {
		keep := nums[0]
		for _, v := range nums {
			if v < keep {
				keep = v
			}
		}
		return total - int64(keep)
	}
	keep := nums[0] + nums[1]
	for i := 0; i+1 < len(nums); i++ {
		if nums[i]+nums[i+1] < keep {
			keep = nums[i] + nums[i+1]
		}
	}
	return total - int64(keep)
}
