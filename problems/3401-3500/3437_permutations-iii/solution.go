func permute(n int) [][]int {
	results := [][]int{}
	current := make([]int, 0, n)
	// One flag per value: each of 1..n is consumed at most once per
	// permutation, cleared again on the way back up.
	used := make([]bool, n+1)
	// Ascending candidates make the walk emit lexicographic order directly;
	// the parity test prunes a branch the moment it would place two adjacent
	// elements both odd or both even.
	var walk func()
	walk = func() {
		// Every position filled: snapshot the finished permutation.
		if len(current) == n {
			// Copy: current is the shared buffer for the next branch.
			results = append(results, append([]int(nil), current...))
			return
		}
		for value := 1; value <= n; value++ {
			if used[value] {
				continue
			}
			if len(current) > 0 && value%2 == current[len(current)-1]%2 {
				continue
			}
			used[value] = true
			current = append(current, value)
			walk()
			current = current[:len(current)-1]
			used[value] = false
		}
	}
	walk()
	return results
}
