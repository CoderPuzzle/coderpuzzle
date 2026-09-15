// Implicit BFS over jump levels: the indices reachable in `jumps` steps form
// the window (currentEnd, nextEnd], so one left-to-right walk with two window
// edges replaces an explicit queue.
func jump(nums []int) int {
	jumps := 0
	currentEnd := 0
	nextEnd := 0
	for index := 0; index < len(nums)-1; index++ {
		if index+nums[index] > nextEnd {
			nextEnd = index + nums[index]
		}
		if index == currentEnd {
			// The level is exhausted; the next jump starts the level that
			// reaches as far as anything scanned so far.
			jumps++
			currentEnd = nextEnd
		}
	}
	// A single-element array never enters the loop: 0 jumps.
	return jumps
}
