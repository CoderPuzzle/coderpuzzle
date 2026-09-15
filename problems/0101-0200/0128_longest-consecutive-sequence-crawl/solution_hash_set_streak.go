func longestConsecutive(nums []int) int {
	// The set collapses duplicates and makes membership an O(1) test.
	values := make(map[int64]struct{}, len(nums))
	for _, value := range nums {
		values[int64(value)] = struct{}{}
	}
	best := 0
	for value := range values {
		// Only a true run start (no value-1 present) triggers a walk; each
		// maximal run has exactly one such start, which keeps the nested loop
		// linear: every element is touched at most twice.
		if _, ok := values[value-1]; !ok {
			length := 1
			// Walk upward through the run without sorting anything.
			for {
				if _, ok := values[value+int64(length)]; !ok {
					break
				}
				length++
			}
			if length > best {
				best = length
			}
		}
	}
	return best
}
