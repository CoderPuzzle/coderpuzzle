func findMaximumXOR(nums []int) int {
	best := 0
	mask := 0
	// Decide each answer bit from the MSB down: a set higher bit dominates
	// all lower bits, so keep it whenever some pair achieves it.
	for bit := 30; bit >= 0; bit-- {
		mask |= 1 << uint(bit)
		// Prefixes = numbers truncated to the bits considered so far.
		prefixes := make(map[int]struct{}, len(nums))
		for _, value := range nums {
			prefixes[value&mask] = struct{}{}
		}
		candidate := best | (1 << uint(bit))
		// Achievable iff two prefixes XOR to candidate, i.e.
		// candidate^prefix is itself a prefix.
		found := false
		for prefix := range prefixes {
			if _, ok := prefixes[candidate^prefix]; ok {
				found = true
				break
			}
		}
		if found {
			best = candidate
		}
	}
	return best
}
