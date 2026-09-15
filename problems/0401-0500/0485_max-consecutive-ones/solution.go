// One pass with a running count: a 1 extends the current run of ones, a 0
// ends it and resets the count to zero.
func findMaxConsecutiveOnes(nums []int) int {
	count := 0
	best := 0
	for _, value := range nums {
		if value == 1 {
			count++
			// A run only reaches its full length at its last 1, so
			// tracking the best while it grows misses nothing.
			best = max(best, count)
		} else {
			count = 0
		}
	}
	return best
}
