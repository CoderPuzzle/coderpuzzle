// The direct reading: record every value in a hash set, then walk the
// candidate range 1..n and keep the values the set does not hold. The set
// carries no order of its own; walking the candidates in increasing order
// is what makes the pinned ascending output free.
func findDisappearedNumbers(nums []int) []int {
	// make (never a nil slice) so an empty answer marshals as [] not null;
	// len(nums) is the output's upper bound: at most n-1 values disappear.
	disappeared := make([]int, 0, len(nums))
	seen := make(map[int]bool, len(nums))
	for _, value := range nums {
		seen[value] = true
	}
	for value := 1; value <= len(nums); value++ {
		if !seen[value] {
			disappeared = append(disappeared, value)
		}
	}
	return disappeared
}
