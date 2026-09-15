func subarraySum(nums []int, k int) int {
	prefixCounts := make(map[int]int, len(nums)+1)
	// Seed with the empty prefix so subarrays starting at index 0 are counted.
	prefixCounts[0] = 1
	running := 0
	total := 0
	for _, value := range nums {
		running += value
		// Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
		total += prefixCounts[running-k]
		// Record only after counting, so a subarray never matches against itself.
		prefixCounts[running]++
	}
	return total
}
