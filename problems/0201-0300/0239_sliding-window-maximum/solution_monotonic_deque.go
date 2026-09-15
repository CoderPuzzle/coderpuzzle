func maxSlidingWindow(nums []int, k int) []int {
	dq := make([]int, 0, len(nums)) // indices, values decreasing
	head := 0
	result := make([]int, 0, len(nums)-k+1)
	for i, value := range nums {
		for len(dq) > head && nums[dq[len(dq)-1]] <= value {
			dq = dq[:len(dq)-1]
		}
		dq = append(dq, i)
		if dq[head] <= i-k {
			head++
		}
		if i >= k-1 {
			result = append(result, nums[dq[head]])
		}
	}
	return result
}
