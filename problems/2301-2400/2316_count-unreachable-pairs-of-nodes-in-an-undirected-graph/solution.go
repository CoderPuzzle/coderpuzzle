func countPairs(n int, edges [][]int) int64 {
	// reachability in an undirected graph is an equivalence, so the answer
	// is all pairs minus the pairs inside one connected component
	parent := make([]int, n)
	size := make([]int, n)
	for i := 0; i < n; i++ {
		parent[i] = i
		size[i] = 1
	}

	var find func(int) int
	find = func(x int) int {
		// first pass locates the root, second rewires every visited node
		// directly to it: path compression without recursion
		root := x
		for parent[root] != root {
			root = parent[root]
		}
		for parent[x] != root {
			parent[x], x = root, parent[x]
		}
		return root
	}

	for _, e := range edges {
		ra, rb := find(e[0]), find(e[1])
		if ra != rb {
			// union by size: the smaller tree hangs off the larger's root,
			// keeping trees shallow; size[root] stays the component's count
			if size[ra] < size[rb] {
				ra, rb = rb, ra
			}
			parent[rb] = ra
			size[ra] += size[rb]
		}
	}

	// each component is counted exactly once, at its root; its C(s, 2)
	// pairs are mutually reachable, every other pair is not
	reachable := int64(0)
	for v := 0; v < n; v++ {
		if find(v) == v {
			reachable += int64(size[v]) * int64(size[v]-1) / 2
		}
	}
	totalPairs := int64(n) * int64(n-1) / 2
	return totalPairs - reachable
}
