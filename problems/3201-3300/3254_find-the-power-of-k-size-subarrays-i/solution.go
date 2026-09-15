func resultsArray(nums []int, k int) []int {
	// run counts the consecutive +1 steps ending at the current index; a
	// size-k window is powered iff its last k-1 adjacent pairs all step up
	// by one, i.e. run reaches k-1 at the window's end.
	results := make([]int, len(nums)-k+1)
	run := 0
	for i := 0; i < len(nums); i++ {
		if i > 0 && nums[i] == nums[i-1]+1 {
			run++
		} else {
			run = 0
		}
		if i >= k-1 {
			if run >= k-1 {
				results[i-k+1] = nums[i]
			} else {
				results[i-k+1] = -1
			}
		}
	}
	return results
}
