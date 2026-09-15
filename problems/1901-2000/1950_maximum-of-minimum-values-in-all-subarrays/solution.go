func findMaximums(nums []int) []int {
	n := len(nums)
	left := make([]int, n)
	right := make([]int, n)
	// Nearest strictly smaller element on each side. Popping on >= (not just
	// >) deliberately splits spans at equal values so every duplicate owns
	// the sub-window where it is the minimum.
	stack := make([]int, 0, n)
	for i := 0; i < n; i++ {
		for len(stack) > 0 && nums[stack[len(stack)-1]] >= nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			left[i] = stack[len(stack)-1]
		} else {
			left[i] = -1
		}
		stack = append(stack, i)
	}
	stack = stack[:0]
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && nums[stack[len(stack)-1]] >= nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			right[i] = stack[len(stack)-1]
		} else {
			right[i] = n
		}
		stack = append(stack, i)
	}
	ans := make([]int, n)
	for i := 0; i < n; i++ {
		// nums[i] is the minimum of any window within its maximal span, so
		// it seeds that length (max wins when spans collide).
		length := right[i] - left[i] - 1
		if nums[i] > ans[length-1] {
			ans[length-1] = nums[i]
		}
	}
	// Seeding covers only maximal spans: a size-(k+1) window contains a
	// size-k sub-window with a no-smaller minimum, so answers are monotone
	// and this suffix max repairs every shorter length with the best
	// longer-span guarantee.
	for i := n - 2; i >= 0; i-- {
		if ans[i+1] > ans[i] {
			ans[i] = ans[i+1]
		}
	}
	return ans
}
