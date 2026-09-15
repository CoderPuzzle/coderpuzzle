func findMiddleIndex(nums []int) int {
	// Single pass with a running left sum: an index is a middle index when
	// left == total - left - nums[i] (the right side's sum).
	total := 0
	for _, x := range nums {
		total += x
	}
	left := 0
	for i, x := range nums {
		if left == total-left-x {
			return i
		}
		left += x
	}
	return -1
}
