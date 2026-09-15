func maxNonOverlapping(nums []int, target int) int {
	// `seen` holds every prefix sum reachable from the start of the current
	// "segment" (the region after the last subarray taken). The moment the
	// running sum minus `target` is in `seen`, a subarray ending here sums
	// to `target`; taking it immediately and resetting (prefix sum back to
	// 0, `seen` back to just {0}) is optimal, because closing off a valid
	// subarray as early as possible never removes an opportunity a later
	// close would have had — it can only free up more room for subarrays
	// after it. `prefixSum` is int64: up to 10^5 terms each up to 10^4 in
	// magnitude can sum to roughly 10^9, close enough to the int32 range to
	// be worth avoiding.
	seen := map[int64]bool{0: true}
	var prefixSum int64
	count := 0
	for _, x := range nums {
		prefixSum += int64(x)
		if seen[prefixSum-int64(target)] {
			count++
			seen = map[int64]bool{0: true}
			prefixSum = 0
		} else {
			seen[prefixSum] = true
		}
	}
	return count
}
