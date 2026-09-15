import "sort"

func threeSum(nums []int) [][]int {
	// Triples are collected as sorted [3]int arrays in a set, so a value
	// triple that closes at several positions arrives several times but is
	// kept once.
	triples := make(map[[3]int]struct{})
	// Pin each distinct value once, at its first occurrence: the suffix
	// behind the first occurrence is a superset of every later one, so no
	// distinct triple is lost and identical re-scans are skipped.
	pinned := make(map[int]bool)
	for i := 0; i+2 < len(nums); i++ {
		first := nums[i]
		if pinned[first] {
			continue
		}
		pinned[first] = true
		// Values already passed in this suffix. A complement found here
		// sits strictly between i and the closing element, so the three
		// values occupy three different positions.
		seen := make(map[int]bool)
		for _, later := range nums[i+1:] {
			complement := -(first + later)
			if seen[complement] {
				triple := [3]int{first, complement, later}
				sort.Ints(triple[:])
				triples[triple] = struct{}{}
			}
			seen[later] = true
		}
	}
	result := make([][]int, 0, len(triples))
	for triple := range triples {
		result = append(result, []int{triple[0], triple[1], triple[2]})
	}
	// The hash walk has no order of its own, so one final sort buys what
	// the sorted walk gives the two-pointer variant for free: each triple's
	// values ascending, the triples themselves lexicographic.
	sort.Slice(result, func(a, b int) bool {
		for k := 0; k < 3; k++ {
			if result[a][k] != result[b][k] {
				return result[a][k] < result[b][k]
			}
		}
		return false
	})
	return result
}
