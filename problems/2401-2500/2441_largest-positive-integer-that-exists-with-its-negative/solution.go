func findMaxK(nums []int) int {
	// A positive k is valid exactly when -k sits in the same array, so
	// membership is the whole question -- drop every value into a hash
	// set once, then scan for the largest positive whose negation is
	// present. Values are nonzero by the constraints, so no value can
	// be its own partner.
	seen := make(map[int]bool, len(nums))
	for _, value := range nums {
		seen[value] = true
	}
	best := -1
	for _, value := range nums {
		if value > 0 && seen[-value] && value > best {
			best = value
		}
	}
	return best
}
