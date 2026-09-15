func longestCycle(edges []int) int {
	n := len(edges)
	// Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
	color := make([]int, n)
	step := make([]int, n)
	timer := 1
	best := -1
	for start := 0; start < n; start++ {
		if color[start] != 0 {
			continue
		}
		node := start
		var path []int
		// Out-degree <= 1 means rho shapes: walk until dead-end (-1),
		// a finished node, or a node on the current walk (a cycle).
		for node != -1 && color[node] == 0 {
			color[node] = 1
			step[node] = timer
			timer++
			path = append(path, node)
			node = edges[node]
		}
		// Landing on color 1 means we looped back into this walk; the
		// cycle length is the steps taken since that node was stamped.
		if node != -1 && color[node] == 1 {
			if l := timer - step[node]; l > best {
				best = l
			}
		}
		// Mark the whole walk finished so later starts never re-walk it.
		for _, v := range path {
			color[v] = 2
		}
	}
	return best
}
