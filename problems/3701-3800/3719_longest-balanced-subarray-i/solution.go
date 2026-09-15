func longestBalanced(nums []int) int {
	n, best := len(nums), 0
	// Fix the left endpoint and stretch the right one; the two sets hold the
	// distinct even and odd values of the current window, so equal sizes mean
	// the window is balanced.
	for left := 0; left < n; left++ {
		evens := make(map[int]bool)
		odds := make(map[int]bool)
		for right := left; right < n; right++ {
			if nums[right]%2 == 0 {
				evens[nums[right]] = true
			} else {
				odds[nums[right]] = true
			}
			if len(evens) == len(odds) {
				best = max(best, right-left+1)
			}
		}
	}
	// No window ever balanced leaves best at 0.
	return best
}
