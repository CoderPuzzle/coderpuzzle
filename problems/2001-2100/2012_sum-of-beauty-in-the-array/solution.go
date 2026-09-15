func sumOfBeauties(nums []int) int {
	n := len(nums)
	prefix := make([]int, n)
	suffix := make([]int, n)
	for index := 1; index < n; index++ {
		prefix[index] = prefix[index-1]
		if nums[index-1] > prefix[index] {
			prefix[index] = nums[index-1]
		}
	}
	suffix[n-2] = nums[n-1]
	for index := n - 3; index >= 1; index-- {
		suffix[index] = suffix[index+1]
		if nums[index+1] < suffix[index] {
			suffix[index] = nums[index+1]
		}
	}

	beauty := 0
	for index := 1; index < n-1; index++ {
		if prefix[index] < nums[index] && nums[index] < suffix[index] {
			beauty += 2
		} else if nums[index-1] < nums[index] && nums[index] < nums[index+1] {
			beauty++
		}
	}
	return beauty
}
