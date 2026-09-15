// One right-to-left pass records how many distinct values sit strictly
// right of each index, then a left-to-right pass grows the prefix set,
// so every answer is a single subtraction of two maintained counts.
func distinctDifferenceArray(nums []int) []int {
	n := len(nums)
	suffixDistinct := make([]int, n)
	seen := make(map[int]bool)
	for i := n - 1; i >= 0; i-- {
		// Visited values are exactly those right of i, so this records
		// the distinct count of nums[i + 1, ..., n - 1] itself.
		suffixDistinct[i] = len(seen)
		seen[nums[i]] = true
	}
	prefixSeen := make(map[int]bool)
	result := make([]int, 0, n)
	for i := 0; i < n; i++ {
		prefixSeen[nums[i]] = true
		result = append(result, len(prefixSeen)-suffixDistinct[i])
	}
	return result
}
