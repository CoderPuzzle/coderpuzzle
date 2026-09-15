func maxSubArrayLen(nums []int, k int) int {
	// first[prefix] = earliest index that prefix value occurred; the
	// seed 0: -1 lets a subarray starting at index 0 be found.
	first := make(map[int64]int)
	first[0] = -1
	var acc int64
	best := 0
	for i, x := range nums {
		acc += int64(x)
		// Subarray (j, i] sums to k exactly when the earlier prefix
		// equals acc - k; earliest j gives the longest subarray.
		if j, ok := first[acc-int64(k)]; ok && i-j > best {
			best = i - j
		}
		// Keep only the first occurrence per prefix value — a later
		// duplicate would only shorten future subarrays.
		if _, ok := first[acc]; !ok {
			first[acc] = i
		}
	}
	return best
}
