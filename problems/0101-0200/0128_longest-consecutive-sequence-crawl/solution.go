// A hash set answers "is this value present?" in O(1); iterating the set
// itself also collapses duplicates before any walking starts.
func longestConsecutive(nums []int) int {
	values := make(map[int]struct{}, len(nums))
	for _, value := range nums {
		values[value] = struct{}{}
	}
	longest := 0
	for value := range values {
		// value - 1 absent means value is where its maximal run begins.
		// Skipping every non-initial member is what keeps the walk linear:
		// without the check, each run would be re-traversed by all of its
		// members and the nested loops would go quadratic.
		if _, hasPredecessor := values[value-1]; hasPredecessor {
			continue
		}
		length := 0
		for {
			if _, found := values[value+length]; !found {
				break
			}
			length++
		}
		if length > longest {
			longest = length
		}
	}
	return longest
}
