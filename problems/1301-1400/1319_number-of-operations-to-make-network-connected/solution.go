func makeConnected(n int, connections [][]int) int {
	// Connecting n computers needs at least n-1 cables; with fewer the
	// task is impossible no matter how cables are rearranged.
	if len(connections) < n-1 {
		return -1
	}
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		// Union-find with path halving: point each node at its
		// grandparent while climbing toward the root.
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	// Count components: every union between two different roots merges
	// two components; a cable whose endpoints already share a root is
	// redundant (the spare cable the counting argument relies on).
	components := n
	for _, c := range connections {
		ra, rb := find(c[0]), find(c[1])
		if ra != rb {
			parent[ra] = rb
			components--
		}
	}
	// Each move links two components, so the minimum is components - 1.
	return components - 1
}
