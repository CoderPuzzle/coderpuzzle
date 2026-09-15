// Slices are counted by their right end: an element that keeps the run
// arithmetic extends every slice ending one step earlier plus adds a fresh
// length-3 one, so current steps up by one each time.
func numberOfArithmeticSlices(nums []int) int {
	total, current := 0, 0
	for i := 2; i < len(nums); i++ {
		if nums[i]-nums[i-1] == nums[i-1]-nums[i-2] {
			current++
			total += current
		} else {
			// The run is broken; no slice crosses the new difference.
			current = 0
		}
	}
	return total
}
