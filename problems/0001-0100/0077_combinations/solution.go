func combine(n int, k int) [][]int {
	combinations := [][]int{}
	current := make([]int, 0, k)
	// Ascending start values make each combination ascending and the walk
	// emit lexicographic order directly.
	var walk func(start int)
	walk = func(start int) {
		// A full pick of k numbers is one combination.
		if len(current) == k {
			// Copy: current is the shared buffer for the next branch.
			combinations = append(combinations, append([]int(nil), current...))
			return
		}
		// The bound keeps only values that leave enough larger numbers to
		// fill the rest of the combination.
		last := n - (k - len(current)) + 1
		for value := start; value <= last; value++ {
			current = append(current, value)
			walk(value + 1)
			current = current[:len(current)-1]
		}
	}
	walk(1)
	return combinations
}
