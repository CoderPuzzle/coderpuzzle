func buildMatrix(k int, rowConditions [][]int, colConditions [][]int) [][]int {
	rowOrder, ok := topoOrder(k, rowConditions)
	if !ok {
		return [][]int{}
	}
	colOrder, ok := topoOrder(k, colConditions)
	if !ok {
		return [][]int{}
	}
	// The two orders are independent; distinct vertices of a topo order
	// get distinct positions, so every required pair stays strictly
	// ordered when v is placed at (rowPos[v], colPos[v]).
	rowPos := make([]int, k+1)
	colPos := make([]int, k+1)
	for i, v := range rowOrder {
		rowPos[v] = i
	}
	for i, v := range colOrder {
		colPos[v] = i
	}
	matrix := make([][]int, k)
	for i := range matrix {
		matrix[i] = make([]int, k)
	}
	for v := 1; v <= k; v++ {
		matrix[rowPos[v]][colPos[v]] = v
	}
	return matrix
}

// Kahn's algorithm over the condition graph. Duplicate conditions only
// add parallel edges and matching indegrees — harmless.
func topoOrder(k int, conditions [][]int) ([]int, bool) {
	adj := make([][]int, k+1)
	indeg := make([]int, k+1)
	for _, c := range conditions {
		adj[c[0]] = append(adj[c[0]], c[1])
		indeg[c[1]]++
	}
	queue := make([]int, 0, k)
	for v := 1; v <= k; v++ {
		if indeg[v] == 0 {
			queue = append(queue, v)
		}
	}
	order := make([]int, 0, k)
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		order = append(order, u)
		for _, w := range adj[u] {
			indeg[w]--
			if indeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	// Fewer than k vertices peeled means a cycle: no valid order.
	if len(order) != k {
		return nil, false
	}
	return order, true
}
