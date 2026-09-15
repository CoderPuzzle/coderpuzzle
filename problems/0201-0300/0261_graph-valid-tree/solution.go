func validTree(n int, edges [][]int) bool {
	// A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
	// more cannot stay acyclic — any other count fails immediately.
	if len(edges) != n-1 {
		return false
	}
	// Union-Find over the nodes, each starting as its own component.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	var find func(int) int
	// Path halving: point each visited node at its grandparent on the
	// way up, short-circuiting future traversals.
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	for _, e := range edges {
		ra, rb := find(e[0]), find(e[1])
		// Same root: the edge joins two nodes already in one
		// component — it closes a cycle.
		if ra == rb {
			return false
		}
		// Distinct roots: merge the two components.
		parent[ra] = rb
	}
	// All n - 1 edges merged distinct components: connected and
	// acyclic, hence a valid tree.
	return true
}
