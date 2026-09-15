import "sort"

func permute(nums []int) [][]int {
	// Sorted copy leaves the caller's slice untouched; trying candidates in
	// ascending order makes the walk emit lexicographic order directly.
	values := append([]int(nil), nums...)
	sort.Ints(values)
	permutations := [][]int{}
	current := make([]int, 0, len(values))
	used := make([]bool, len(values))
	var walk func()
	walk = func() {
		// A leaf has one chosen element per position: a full permutation.
		if len(current) == len(values) {
			// Copy: current is the shared buffer for the next branch.
			permutations = append(permutations, append([]int(nil), current...))
			return
		}
		for index := range values {
			// Marks replace an O(n) membership scan; skip taken elements.
			if used[index] {
				continue
			}
			used[index] = true
			current = append(current, values[index])
			walk()
			current = current[:len(current)-1]
			used[index] = false
		}
	}
	walk()
	return permutations
}
