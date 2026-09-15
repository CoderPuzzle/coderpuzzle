func minimumSubarrayLength(nums []int, k int) int {
	// Validity of a window is downward-closed in its left end (shrinking
	// can only drop bits) and extending r never invalidates a previously
	// valid l, so the shortest valid left end never regresses: two
	// pointers amortize. OR cannot be undone directly, so per-bit counts
	// rebuild the window OR one counter flip at a time on add/remove.
	windowOr := func(counts []int) int {
		v := 0
		for b := 0; b < 30; b++ {
			if counts[b] > 0 {
				v |= 1 << b
			}
		}
		return v
	}
	counts := make([]int, 30)
	best := -1
	left := 0
	for right := 0; right < len(nums); right++ {
		for b := 0; b < 30; b++ {
			counts[b] += nums[right] >> b & 1
		}
		// Shrink while the window stays special; each recorded length is
		// a candidate, and the one recorded just before the window breaks
		// is the shortest ending here.
		for left <= right && windowOr(counts) >= k {
			if length := right - left + 1; best == -1 || length < best {
				best = length
			}
			leaving := nums[left]
			for b := 0; b < 30; b++ {
				counts[b] -= leaving >> b & 1
			}
			left++
		}
	}
	return best
}
