func incremovableSubarrayCount(nums []int) int {
	// A subarray (i, j) is incremovable exactly when splicing it out
	// leaves a strictly increasing sequence. n <= 50, so every one of
	// the O(n^2) subarrays is checked directly: walk the surviving
	// elements (prefix nums[:i] then suffix nums[j+1:]) and require
	// each one to exceed its predecessor; values are positive, so a
	// sentinel of 0 seeds the comparison.
	n := len(nums)
	count := 0
	for i := 0; i < n; i++ {
		for j := i; j < n; j++ {
			ok := true
			prev := 0
			for idx := 0; idx < n; idx++ {
				if idx >= i && idx <= j {
					continue
				}
				if nums[idx] <= prev {
					ok = false
					break
				}
				prev = nums[idx]
			}
			if ok {
				count++
			}
		}
	}
	return count
}
