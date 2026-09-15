func countMatchingSubarrays(nums []int, pattern []int) int {
	n, m := len(nums), len(pattern)

	// Reduce every adjacent pair to its relation: rise, fall, or tie.
	signs := make([]int, n-1)
	for i := 0; i+1 < n; i++ {
		switch {
		case nums[i+1] > nums[i]:
			signs[i] = 1
		case nums[i+1] < nums[i]:
			signs[i] = -1
		}
	}

	// A size m+1 subarray matches iff its m relations equal the pattern.
	count := 0
	for start := 0; start+m < n; start++ {
		match := true
		for k := 0; k < m && match; k++ {
			match = signs[start+k] == pattern[k]
		}
		if match {
			count++
		}
	}
	return count
}
