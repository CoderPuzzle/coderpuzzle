func countCompleteComponents(n int, edges [][]int) int {
	// Both directions per edge: the graph is undirected, so each
	// endpoint must list the other among its neighbors.
	adjacency := make([][]int, n)
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], edge[1])
		adjacency[edge[1]] = append(adjacency[edge[1]], edge[0])
	}
	visited := make([]bool, n)
	stack := make([]int, 0, n)
	component := make([]int, 0, n)
	complete := 0
	for start := 0; start < n; start++ {
		if visited[start] {
			continue
		}
		// An unclaimed vertex opens a fresh component; one flood
		// collects exactly that component and nothing else.
		stack = stack[:0]
		component = component[:0]
		visited[start] = true
		stack = append(stack, start)
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			component = append(component, node)
			for _, other := range adjacency[node] {
				if !visited[other] {
					// Mark at push time so no vertex is stacked twice.
					visited[other] = true
					stack = append(stack, other)
				}
			}
		}
		// A component of k vertices is fully wired exactly when every
		// member is adjacent to all k - 1 others.
		k := len(component)
		wired := true
		for _, node := range component {
			if len(adjacency[node]) != k-1 {
				wired = false
				break
			}
		}
		if wired {
			complete++
		}
	}
	return complete
}
