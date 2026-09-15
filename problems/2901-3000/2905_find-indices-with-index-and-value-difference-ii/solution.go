func findIndices(nums []int, indexDifference int, valueDifference int) []int {
	// For each later index j, every legal partner t satisfies
	// t <= j - indexDifference, and the largest |nums[t] - nums[j]| over
	// that window is attained at its minimum or maximum, so remembering
	// the first index of each extreme as the window grows is enough.
	// Testing the minimum candidate before the maximum, and keeping
	// first occurrences on ties, pins one deterministic answer out of
	// the many the statement permits.
	n := len(nums)
	minIdx, maxIdx := -1, -1
	for j := 0; j < n; j++ {
		t := j - indexDifference
		if t < 0 {
			continue
		}
		if minIdx == -1 || nums[t] < nums[minIdx] {
			minIdx = t
		}
		if maxIdx == -1 || nums[t] > nums[maxIdx] {
			maxIdx = t
		}
		d := nums[j] - nums[minIdx]
		if d < 0 {
			d = -d
		}
		if d >= valueDifference {
			return []int{minIdx, j}
		}
		d = nums[j] - nums[maxIdx]
		if d < 0 {
			d = -d
		}
		if d >= valueDifference {
			return []int{maxIdx, j}
		}
	}
	return []int{-1, -1}
}
