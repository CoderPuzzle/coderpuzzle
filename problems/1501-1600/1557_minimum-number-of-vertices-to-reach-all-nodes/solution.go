func findSmallestSetOfVertices(n int, edges [][]int) []int {
	// A node with no incoming edge can only ever be reached by itself, so
	// it must be a starting vertex. Every other node has at least one
	// incoming edge and is therefore reachable from wherever that edge
	// originates, so the in-degree-zero nodes are also sufficient.
	inDegree := make([]int, n)
	for _, edge := range edges {
		inDegree[edge[1]]++
	}
	result := []int{}
	for node := 0; node < n; node++ {
		if inDegree[node] == 0 {
			result = append(result, node)
		}
	}
	return result
}
