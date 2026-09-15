func subsets(nums []int) [][]int {
	n := len(nums)
	subsets := [][]int{}
	// Count masks upward from all bits clear ([]) to all bits set (the
	// whole array): bit i set means nums[i] is in the subset.
	for mask := 0; mask < 1<<uint(n); mask++ {
		current := make([]int, 0, n)
		for i := 0; i < n; i++ {
			// Bit i set: nums[i] joins, in input order within the subset.
			if mask&(1<<uint(i)) != 0 {
				current = append(current, nums[i])
			}
		}
		subsets = append(subsets, current)
	}
	return subsets
}
