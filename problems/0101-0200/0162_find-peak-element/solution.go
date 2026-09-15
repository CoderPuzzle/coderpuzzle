func findPeakElement(nums []int) int {
	n := len(nums)
	// Left-to-right scan stopping at the first descent — the direct way to
	// return the leftmost peak, which binary search cannot guarantee.
	for i := 0; i < n; i++ {
		// Positions just outside the array count as -infinity, so the
		// boundary checks pass vacuously at the ends.
		leftOk := i == 0 || nums[i] > nums[i-1]
		rightOk := i == n-1 || nums[i] > nums[i+1]
		if leftOk && rightOk {
			return i
		}
	}
	// Unreachable: some peak always exists.
	return -1
}
