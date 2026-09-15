func longestMonotonicSubarray(nums []int) int {
	best := 1
	inc := 1
	dec := 1
	for index := 1; index < len(nums); index++ {
		if nums[index] > nums[index-1] {
			inc++
			dec = 1
		} else if nums[index] < nums[index-1] {
			dec++
			inc = 1
		} else {
			inc = 1
			dec = 1
		}
		best = max(best, max(inc, dec))
	}
	return best
}
