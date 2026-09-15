func validSubarraySize(nums []int, threshold int) int {
	n := len(nums)
	// next_le[i] = nearest index j > i with nums[j] <= nums[i]
	nextLe := make([]int, n)
	stack := make([]int, 0, n)
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && nums[stack[len(stack)-1]] > nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			nextLe[i] = stack[len(stack)-1]
		} else {
			nextLe[i] = n
		}
		stack = append(stack, i)
	}

	// prev_lt[i] = nearest index j < i with nums[j] < nums[i]
	prevLt := make([]int, n)
	stack = stack[:0]
	for i := 0; i < n; i++ {
		for len(stack) > 0 && nums[stack[len(stack)-1]] >= nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			prevLt[i] = stack[len(stack)-1]
		} else {
			prevLt[i] = -1
		}
		stack = append(stack, i)
	}

	best := -1
	for i := 0; i < n; i++ {
		span := nextLe[i] - prevLt[i] - 1
		k := threshold/nums[i] + 1
		if k <= span && (best == -1 || k < best) {
			best = k
		}
	}
	return best
}
