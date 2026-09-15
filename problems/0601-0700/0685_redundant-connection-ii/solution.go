func findRedundantDirectedConnection(edges [][]int) []int {
	// First pass: a node with two parents names the two candidate
	// edges, in input order.
	n := len(edges)
	parentEdge := make([]int, n+1)
	for node := range parentEdge {
		parentEdge[node] = -1
	}
	cand1, cand2 := -1, -1
	for i, edge := range edges {
		if parentEdge[edge[1]] != -1 {
			cand1, cand2 = parentEdge[edge[1]], i
		} else {
			parentEdge[edge[1]] = i
		}
	}

	dsu := make([]int, n+1)
	for node := range dsu {
		dsu[node] = node
	}

	find := func(node int) int {
		root := node
		for dsu[root] != root {
			root = dsu[root]
		}
		// Second walk repoints every visited node at the root (path
		// compression), flattening the structure for later finds.
		for dsu[node] != root {
			next := dsu[node]
			dsu[node] = root
			node = next
		}
		return root
	}

	// Second pass over every edge except the later candidate: a cycle
	// means dropping it is not enough, so the earlier edge is the
	// answer; a clean pass means the later edge is.
	for i, edge := range edges {
		if i == cand2 {
			continue
		}
		ru, rv := find(edge[0]), find(edge[1])
		// Equal roots mean this edge would reconnect one component.
		if ru == rv {
			if cand2 != -1 {
				return edges[cand1]
			}
			return edge
		}
		dsu[ru] = rv
	}
	return edges[cand2]
}
