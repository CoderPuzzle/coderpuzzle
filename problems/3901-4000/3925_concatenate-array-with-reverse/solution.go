func concatWithReverse(nums []int) []int {
	n := len(nums)
	answer := make([]int, 2*n)
	for i := 0; i < n; i++ {
		answer[i] = nums[i]
		answer[n+i] = nums[n-i-1]
	}
	return answer
}
