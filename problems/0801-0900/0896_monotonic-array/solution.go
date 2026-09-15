// Two hypotheses survive until refuted: a rise kills the decreasing one, a
// drop kills the increasing one, equals keep both standing.
func isMonotonic(nums []int) bool {
	increasing := true
	decreasing := true
	for i := 1; i < len(nums); i++ {
		if nums[i] > nums[i-1] {
			decreasing = false
		} else if nums[i] < nums[i-1] {
			increasing = false
		}
	}
	return increasing || decreasing
}
