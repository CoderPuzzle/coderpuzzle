func minSubArrayLen(target int, nums []int) int {
	n := len(nums)
	// Sentinel: an impossible length that survives when target is never met.
	best := n + 1
	window := 0
	left := 0
	for right := 0; right < n; right++ {
		window += nums[right]
		// Positive elements make the window sum monotone under both pointer
		// moves, so the smallest left end for each right only moves rightward
		// — both pointers make at most n steps.
		for window >= target {
			if right-left+1 < best {
				best = right - left + 1
			}
			// Shrink from the left to reach the minimal window ending here
			// and leave the leanest state for the next extension.
			window -= nums[left]
			left++
		}
	}
	if best == n+1 {
		return 0
	}
	return best
}
