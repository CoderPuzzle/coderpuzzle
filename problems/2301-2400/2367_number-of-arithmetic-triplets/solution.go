func arithmeticTriplets(nums []int, diff int) int {
	// Strictly increasing means every value occurs once, so a triplet is
	// determined by its middle: count elements whose value - diff and
	// value + diff are both present.
	seen := make(map[int]bool, len(nums))
	for _, value := range nums {
		seen[value] = true
	}
	count := 0
	for _, value := range nums {
		if seen[value-diff] && seen[value+diff] {
			count++
		}
	}
	return count
}
