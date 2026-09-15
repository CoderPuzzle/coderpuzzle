func possibleBipartition(n int, dislikes [][]int) bool {
	// Dislike is symmetric, so build an undirected adjacency list: a
	// valid two-group split is exactly a 2-coloring of this graph.
	adjacency := make([][]int, n+1)
	for _, d := range dislikes {
		a, b := d[0], d[1]
		adjacency[a] = append(adjacency[a], b)
		adjacency[b] = append(adjacency[b], a)
	}

	color := make([]int, n+1) // 0 = uncolored, 1 / -1 = the two groups
	// The stack drives a depth-first sweep: pop a person, then push every
	// uncolored neighbor with the opposite color (marking on push); a
	// neighbor already sharing the current color closes an odd cycle, so
	// no split exists. The slice is reused across components.
	stack := make([]int, 0, n)
	// The dislike graph may be disconnected, so the scan restarts the
	// DFS from every still-uncolored person; each run colors one
	// whole connected component.
	for start := 1; start <= n; start++ {
		if color[start] != 0 {
			continue
		}
		color[start] = 1
		stack = stack[:0]
		stack = append(stack, start)
		for len(stack) > 0 {
			person := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, neighbor := range adjacency[person] {
				if color[neighbor] == 0 {
					color[neighbor] = -color[person]
					stack = append(stack, neighbor)
				} else if color[neighbor] == color[person] {
					return false
				}
			}
		}
	}
	return true
}
