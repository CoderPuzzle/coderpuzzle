// The optimal first hop out of any position lands on the nearest later
// index holding a strictly greater value: everything in between is at most
// the current value, so any detour's legs earn no more per unit of
// distance than staying put over the same ground, while the leg beyond the
// swap gains the strictly larger rate. When no greater value remains,
// jumping straight to the last index is optimal by the same telescoping
// bound. Precompute those nearest greater neighbors with a right-to-left
// monotonic stack, then walk the chain.
func findMaximumScore(nums []int) int64 {
	n := len(nums)
	jump := make([]int, n)
	for i := range jump {
		jump[i] = n - 1
	}
	stack := make([]int, 0, n)
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && nums[stack[len(stack)-1]] <= nums[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			jump[i] = stack[len(stack)-1]
		}
		stack = append(stack, i)
	}
	score := int64(0)
	pos := 0
	for pos < n-1 {
		score += int64(jump[pos]-pos) * int64(nums[pos])
		pos = jump[pos]
	}
	return score
}
