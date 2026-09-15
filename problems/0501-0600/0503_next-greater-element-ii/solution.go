func nextGreaterElements(nums []int) []int {
	n := len(nums)
	result := make([]int, n)
	for i := range result {
		result[i] = -1
	}
	stack := make([]int, 0, n)
	// One extra lap simulates the wrap-around without copying the array;
	// the resolver of any waiting index lies within one cycle ahead.
	for i := 0; i < 2*n; i++ {
		idx := i % n
		// The stack holds indices with non-increasing values; the current
		// circular value is the first strictly greater one ahead of each
		// popped index (equal values are not popped).
		for len(stack) > 0 && nums[stack[len(stack)-1]] < nums[idx] {
			result[stack[len(stack)-1]] = nums[idx]
			stack = stack[:len(stack)-1]
		}
		// Push only during the first lap; the second just resolves.
		if i < n {
			stack = append(stack, idx)
		}
	}
	return result
}
