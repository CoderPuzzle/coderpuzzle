// Deletion freedom reduces the subsequence to its value multiset: only how
// often each value occurs matters, never the order. The exactly-1 gap forces
// a harmonious pick onto the two values v and v + 1, and a count-map key
// occurs at least once, so looking up each key's successor is exactly the
// both-values-present test; the largest count(v) + count(v + 1) wins, 0 when
// no adjacent pair exists.
func findLHS(nums []int) int {
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	best := 0
	for value, count := range counts {
		if next, ok := counts[value+1]; ok {
			best = max(best, count+next)
		}
	}
	return best
}
