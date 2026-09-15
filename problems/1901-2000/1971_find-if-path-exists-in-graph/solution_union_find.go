// No graph is built and nothing is traversed: every edge simply merges the
// components of its two endpoints, and afterwards a route exists exactly
// when source and destination were pulled into the same component -- that
// is, when they share a root.
func validPath(n int, edges [][]int, source int, destination int) bool {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	// Path-halving: splice every other node directly under its
	// grandparent, flattening the tree while walking to the root.
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	for _, edge := range edges {
		ru, rv := find(edge[0]), find(edge[1])
		if ru != rv {
			parent[ru] = rv
		}
	}
	return find(source) == find(destination)
}
