func firstStableIndex(nums []int, k int) int {
	suffixMin := append([]int(nil), nums...)
	for i := len(nums) - 2; i >= 0; i-- {
		if nums[i] < suffixMin[i+1] {
			suffixMin[i] = nums[i]
		} else {
			suffixMin[i] = suffixMin[i+1]
		}
	}

	prefixMax := nums[0]
	for i, value := range nums {
		if value > prefixMax {
			prefixMax = value
		}
		if prefixMax-suffixMin[i] <= k {
			return i
		}
	}
	return -1
}
