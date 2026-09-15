func minimumPrefixLength(nums []int) int {
	// What survives removal is a suffix, and a suffix is strictly
	// increasing exactly when none of its adjacent pairs violates the
	// order, so the best cut sits just past the LAST violating pair.
	// Scan from the right and stop at the first index i with
	// nums[i] >= nums[i+1]; that i is the rightmost violation.
	for i := len(nums) - 2; i >= 0; i-- {
		if nums[i] >= nums[i+1] {
			return i + 1
		}
	}
	return 0
}
