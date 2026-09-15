func orArray(nums []int) []int {
	answer := make([]int, len(nums)-1)
	for i := 0; i < len(nums)-1; i++ {
		answer[i] = nums[i] | nums[i+1]
	}
	return answer
}
