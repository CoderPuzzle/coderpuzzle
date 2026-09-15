func maximumSubarraySum(nums []int, k int) int64 {
	// counts maps value -> frequency in the current window; zero-count keys
	// are deleted so len(counts) is the window's distinct count.
	counts := make(map[int]int)
	var windowSum int64
	var best int64
	for i, value := range nums {
		counts[value]++
		windowSum += int64(value)
		// Retire nums[i-k] BEFORE evaluating, so exactly k members are
		// in the window at each check.
		if i >= k {
			old := nums[i-k]
			if counts[old] == 1 {
				delete(counts, old)
			} else {
				counts[old]--
			}
			windowSum -= int64(old)
		}
		// k slots holding k distinct values means no repeats.
		if i >= k-1 && len(counts) == k && windowSum > best {
			best = windowSum
		}
	}
	return best
}
