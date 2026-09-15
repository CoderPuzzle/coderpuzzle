func maxChunksToSorted(arr []int) int {
	// A boundary is legal exactly when the prefix's largest entry is
	// no greater than every entry after the cut — non-strict, which
	// is what keeps repeated values legal at equal boundaries.
	suffixMin := make([]int, len(arr))
	copy(suffixMin, arr)
	for i := len(arr) - 2; i >= 0; i-- {
		suffixMin[i] = min(suffixMin[i], suffixMin[i+1])
	}
	blocks := 1
	prefixMax := arr[0]
	for i := 1; i < len(arr); i++ {
		// The prefix holds the smallest i+1 entries exactly when its
		// running maximum does not exceed the suffix minimum.
		if prefixMax <= suffixMin[i] {
			blocks++
		}
		prefixMax = max(prefixMax, arr[i])
	}
	return blocks
}
