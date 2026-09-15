// Monotonic stack of record lows: an index matters as a left end only when
// no earlier index holds a smaller value.
func maxWidthRamp(nums []int) int {
	stack := []int{}
	for i, x := range nums {
		if len(stack) == 0 || nums[stack[len(stack)-1]] > x {
			stack = append(stack, i)
		}
	}
	// Right-to-left: the first (largest) j that dominates a stack top pops
	// it at that top's widest possible width.
	best := 0
	for j := len(nums) - 1; j >= 0; j-- {
		for len(stack) > 0 && nums[stack[len(stack)-1]] <= nums[j] {
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			best = max(best, j-top)
		}
	}
	return best
}
