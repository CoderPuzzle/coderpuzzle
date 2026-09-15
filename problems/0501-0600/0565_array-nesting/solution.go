// A permutation makes i -> nums[i] a graph where every node has exactly one
// successor and one predecessor, so the array splits into disjoint cycles;
// s[k] is exactly the cycle containing k, and every member of that cycle
// generates the same-length set. Each index is marked by the single walk
// that first reaches it, so no index is ever walked twice.
func arrayNesting(nums []int) int {
	seen := make([]bool, len(nums))
	longest := 0
	for start := range nums {
		if seen[start] {
			continue
		}
		length := 0
		index := start
		for !seen[index] {
			seen[index] = true
			index = nums[index]
			length++
		}
		if length > longest {
			longest = length
		}
	}
	return longest
}
