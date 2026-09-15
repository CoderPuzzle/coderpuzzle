import "math"

func find132pattern(nums []int) bool {
	if len(nums) < 3 {
		return false
	}
	stack := make([]int, 0, len(nums))
	// Scan right-to-left; `third` is the largest value known to sit after
	// something bigger — the best nums[k] candidate (MinInt64 = none yet).
	third := int64(math.MinInt64)
	for i := len(nums) - 1; i >= 0; i-- {
		value := nums[i]
		// Current value below third makes it a valid nums[i]; the pair that
		// produced third lies entirely to its right.
		if int64(value) < third {
			return true
		}
		// Popped values are smaller than `value` and lie to its right, so
		// each has a larger number before it; the last (largest) popped
		// becomes third. The stack stays decreasing.
		for len(stack) > 0 && stack[len(stack)-1] < value {
			third = int64(stack[len(stack)-1])
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, value)
	}
	return false
}
