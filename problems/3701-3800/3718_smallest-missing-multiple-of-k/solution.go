func missingMultiple(nums []int, k int) int {
	// The question is pure membership: drop every value into a hash set,
	// then walk the multiples of k upward until one is absent.
	seen := make(map[int]bool, len(nums))
	for _, num := range nums {
		seen[num] = true
	}
	candidate := k
	for seen[candidate] {
		candidate += k
	}
	return candidate
}
