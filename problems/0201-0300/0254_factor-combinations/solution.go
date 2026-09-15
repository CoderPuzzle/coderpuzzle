import "sort"

func getFactors(n int) [][]int {
	combinations := [][]int{}
	current := []int{}
	// start is the smallest factor still allowed, so factors only grow and
	// every emitted list is ascending.
	var backtrack func(remaining, start int)
	backtrack = func(remaining, start int) {
		for factor := start; factor*factor <= remaining; factor++ {
			if remaining%factor != 0 {
				continue
			}
			// factor closes a combination: the cofactor remaining/factor is
			// at least factor, so both stay in [2, n-1] and the list stays
			// ascending.
			combination := make([]int, len(current)+2)
			copy(combination, current)
			combination[len(current)] = factor
			combination[len(current)+1] = remaining / factor
			combinations = append(combinations, combination)
			current = append(current, factor)
			// Split the cofactor further; the new start stays at factor so
			// the next factor is at least as large.
			backtrack(remaining/factor, factor)
			current = current[:len(current)-1]
		}
	}
	backtrack(n, 2)
	// Left-to-right growth emits each length group in lexicographic order
	// but interleaves the groups; the pinned display wants fewest factors
	// first, so reassemble by (length, lexicographic).
	sort.Slice(combinations, func(i, j int) bool {
		a, b := combinations[i], combinations[j]
		if len(a) != len(b) {
			return len(a) < len(b)
		}
		for k := range a {
			if a[k] != b[k] {
				return a[k] < b[k]
			}
		}
		return false
	})
	return combinations
}
