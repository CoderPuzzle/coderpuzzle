func validTree(n int, edges [][]int) bool {
	// A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
	// more cannot stay acyclic — any other count fails immediately.
	if len(edges) != n-1 {
		return false
	}
	adjacency := make([][]int, n)
	for _, e := range edges {
		adjacency[e[0]] = append(adjacency[e[0]], e[1])
		adjacency[e[1]] = append(adjacency[e[1]], e[0])
	}
	// With n - 1 edges on the table, connectivity is the only open
	// question: connected + n - 1 edges forces the graph to be a tree.
	seen := make([]bool, n)
	queue := []int{0}
	seen[0] = true
	visited := 1
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		for _, v := range adjacency[u] {
			if !seen[v] {
				seen[v] = true
				visited++
				queue = append(queue, v)
			}
		}
	}
	return visited == n
}
