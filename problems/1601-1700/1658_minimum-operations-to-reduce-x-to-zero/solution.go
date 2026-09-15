func minOperations(nums []int, x int) int {
	total := 0
	for _, v := range nums {
		total += v
	}
	target := total - x // longest middle subarray summing to target
	if target < 0 {
		return -1
	}
	if target == 0 {
		return len(nums)
	}
	best := -1
	window := 0
	left := 0
	for right, value := range nums {
		window += value
		for window > target {
			window -= nums[left]
			left++
		}
		if window == target {
			if length := right - left + 1; length > best {
				best = length
			}
		}
	}
	if best == -1 {
		return -1
	}
	return len(nums) - best
}
