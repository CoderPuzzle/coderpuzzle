func countComponents(n int, edges [][]int) int {
	// Both directions per edge: the graph is undirected, so each
	// endpoint must list the other among its neighbors.
	adjacency := make([][]int, n)
	for _, e := range edges {
		adjacency[e[0]] = append(adjacency[e[0]], e[1])
		adjacency[e[1]] = append(adjacency[e[1]], e[0])
	}
	visited := make([]bool, n)
	components := 0
	stack := make([]int, 0, n)
	for start := 0; start < n; start++ {
		if visited[start] {
			continue
		}
		// An unvisited node during the sweep starts a new component;
		// this one traversal absorbs exactly one component.
		components++
		visited[start] = true
		stack = append(stack, start)
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, other := range adjacency[node] {
				if !visited[other] {
					// Mark at push time so no node is stacked twice;
					// membership is by visitation, so a node shared by
					// many edges is still discovered exactly once.
					visited[other] = true
					stack = append(stack, other)
				}
			}
		}
	}
	return components
}
