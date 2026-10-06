func pairSum(nums []int, target int) []int {
	// Hash map from value -> index: one pass answers "seen the complement?"
	// in O(1), replacing the nested brute-force scan.
	seen := make(map[int]int)
	for index, value := range nums {
		// Look up before inserting, so an element can never match itself
		// and the two returned indexes are guaranteed distinct.
		if earlier, ok := seen[target-value]; ok {
			return []int{earlier, index}
		}
		seen[value] = index
	}
	// Statement promises a solution exists; empty is just the fallback.
	return nil
}
