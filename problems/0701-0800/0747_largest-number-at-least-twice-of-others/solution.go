// One pass for the top two values: the largest dominates exactly when it is
// at least twice the runner-up, since every other element is at most that
// runner-up.
func dominantIndex(nums []int) int {
	best, second := 0, -1
	for i := 1; i < len(nums); i++ {
		if nums[i] > nums[best] {
			second = nums[best]
			best = i
		} else if nums[i] > second {
			second = nums[i]
		}
	}
	// The boundary is inclusive: "at least twice" keeps max == 2*second.
	if nums[best] >= 2*second {
		return best
	}
	return -1
}
