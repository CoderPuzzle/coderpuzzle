func containsDuplicate(nums []int) bool {
	// One pass with a set of already-visited values.
	seen := make(map[int]struct{}, len(nums))
	for _, value := range nums {
		// Check before inserting so the first copy is never a false hit.
		if _, ok := seen[value]; ok {
			return true
		}
		seen[value] = struct{}{}
	}
	// Loop finished: every element was distinct at insertion time.
	return false
}
