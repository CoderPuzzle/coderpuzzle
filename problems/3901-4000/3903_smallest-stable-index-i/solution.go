func firstStableIndex(nums []int, k int) int {
	for i := range nums {
		prefixMax := nums[0]
		for j := 1; j <= i; j++ {
			if nums[j] > prefixMax {
				prefixMax = nums[j]
			}
		}

		suffixMin := nums[i]
		for j := i + 1; j < len(nums); j++ {
			if nums[j] < suffixMin {
				suffixMin = nums[j]
			}
		}

		if prefixMax-suffixMin <= k {
			return i
		}
	}
	return -1
}
