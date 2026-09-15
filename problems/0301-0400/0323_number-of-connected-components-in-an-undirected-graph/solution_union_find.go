func countComponents(n int, edges [][]int) int {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	// Path-halving: splice every other node directly under its
	// grandparent, flattening the tree while walking to the root.
	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	// Every node begins as its own component.
	count := n
	for _, e := range edges {
		ra, rb := find(e[0]), find(e[1])
		// An edge joining two distinct roots merges two components;
		// one whose endpoints already share a root is redundant.
		if ra != rb {
			parent[ra] = rb
			count--
		}
	}
	return count
}
