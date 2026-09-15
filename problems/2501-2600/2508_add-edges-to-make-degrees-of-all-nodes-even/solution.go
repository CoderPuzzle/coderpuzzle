func isPossible(n int, edges [][]int) bool {
	// One added edge flips exactly two parities, so at most four odd-degree
	// nodes are repairable: connect a lonely pair directly when the slot is
	// free or route both through one fresh middle node; four odds need a
	// disjoint pairing of two free slots.
	seen := make(map[[2]int]bool)
	degree := make([]int, n+1)
	for _, edge := range edges {
		degree[edge[0]]++
		degree[edge[1]]++
		key := [2]int{edge[0], edge[1]}
		if key[0] > key[1] {
			key = [2]int{key[1], key[0]}
		}
		seen[key] = true
	}
	linked := func(a, b int) bool {
		if a > b {
			a, b = b, a
		}
		return seen[[2]int{a, b}]
	}
	var odds []int
	for node := 1; node <= n; node++ {
		if degree[node]&1 == 1 {
			odds = append(odds, node)
		}
	}
	switch len(odds) {
	case 0:
		return true
	case 2:
		a, b := odds[0], odds[1]
		if !linked(a, b) {
			return true
		}
		for c := 1; c <= n; c++ {
			if c != a && c != b && !linked(a, c) && !linked(b, c) {
				return true
			}
		}
		return false
	case 4:
		w, x, y, z := odds[0], odds[1], odds[2], odds[3]
		free := func(p, q int) bool { return !linked(p, q) }
		return (free(w, x) && free(y, z)) ||
			(free(w, y) && free(x, z)) ||
			(free(w, z) && free(x, y))
	default:
		return false
	}
}
