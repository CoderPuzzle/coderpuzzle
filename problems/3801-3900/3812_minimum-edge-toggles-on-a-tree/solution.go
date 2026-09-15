func minimumFlips(n int, edges [][]int, start string, target string) []int {
	adjacency := make([][][2]int, n)
	for index, edge := range edges {
		u, v := edge[0], edge[1]
		adjacency[u] = append(adjacency[u], [2]int{v, index})
		adjacency[v] = append(adjacency[v], [2]int{u, index})
	}

	// Breadth-first discovery from node 0 records each node's parent
	// and the edge leading to it; an explicit queue keeps deep trees
	// off the call stack.
	parent := make([]int, n)
	parentEdge := make([]int, n)
	parent[0] = -1
	order := make([]int, 1, n)
	for i := 0; i < len(order); i++ {
		node := order[i]
		for _, entry := range adjacency[node] {
			neighbor, edge := entry[0], entry[1]
			if neighbor != parent[node] {
				parent[neighbor] = node
				parentEdge[neighbor] = edge
				order = append(order, neighbor)
			}
		}
	}

	// need[node] stays 1 while the node's flip parity is unmatched.
	need := make([]byte, n)
	for x := 0; x < n; x++ {
		if start[x] != target[x] {
			need[x] = 1
		}
	}
	take := make([]bool, n-1)
	for i := len(order) - 1; i >= 1; i-- {
		node := order[i]
		if need[node] == 1 {
			// Children are done, so the parent edge is the only
			// remaining toggle touching this node: the choice is
			// forced, and the unmatched parity moves to the parent.
			take[parentEdge[node]] = true
			need[parent[node]] ^= 1
		}
	}
	// Whatever parity survives at the root cannot be fixed anywhere.
	if need[0] == 1 {
		return []int{-1}
	}
	// A final ascending scan emits the chosen indices in order.
	chosen := make([]int, 0, n-1)
	for index := 0; index < n-1; index++ {
		if take[index] {
			chosen = append(chosen, index)
		}
	}
	return chosen
}
