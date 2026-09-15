func maximumLengthOfRanges(nums []int) []int {
	n := len(nums)
	left := make([]int, n) // nearest index with a greater element on the left, +1
	stack := make([]int, 0, n)
	for i := 0; i < n; i++ {
		for len(stack) > 0 && nums[stack[len(stack)-1]] < nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			left[i] = stack[len(stack)-1] + 1
		} else {
			left[i] = 0
		}
		stack = append(stack, i)
	}
	right := make([]int, n) // nearest index with a greater element on the right, -1
	stack = stack[:0]
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && nums[stack[len(stack)-1]] < nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			right[i] = stack[len(stack)-1] - 1
		} else {
			right[i] = n - 1
		}
		stack = append(stack, i)
	}
	result := make([]int, n)
	for i := 0; i < n; i++ {
		result[i] = right[i] - left[i] + 1
	}
	return result
}
