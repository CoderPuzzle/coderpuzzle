func maximumStrongPairXor(nums []int) int {
	// Try every unordered pair (the same integer twice is allowed, so
	// j >= i covers the (x, x) pairs too); keep the best XOR among the
	// pairs that satisfy the strong-pair condition.
	best := 0
	for i := 0; i < len(nums); i++ {
		for j := i; j < len(nums); j++ {
			x, y := nums[i], nums[j]
			d := x - y
			if d < 0 {
				d = -d
			}
			if d <= min(x, y) {
				best = max(best, x^y)
			}
		}
	}
	return best
}
