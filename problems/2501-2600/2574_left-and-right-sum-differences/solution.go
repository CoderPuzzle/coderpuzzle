func leftRightDifference(nums []int) []int {
	// rightSum[i] is just total - leftSum[i] - nums[i], so one running
	// prefix replaces both arrays: pay one pass for the total, then a
	// second that walks left forward and emits each absolute difference.
	total := 0
	for _, value := range nums {
		total += value
	}
	answer := make([]int, len(nums))
	left := 0
	for i, value := range nums {
		diff := left - (total - left - value)
		if diff < 0 {
			diff = -diff
		}
		answer[i] = diff
		left += value
	}
	return answer
}
