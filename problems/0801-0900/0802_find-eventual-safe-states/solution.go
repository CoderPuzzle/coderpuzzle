func eventualSafeNodes(graph [][]int) []int {
	n := len(graph)
	// Kahn's peel on the reversed graph: a node is safe exactly
	// when every path from it terminates.
	outdeg := make([]int, n)
	radj := make([][]int, n)
	for u := 0; u < n; u++ {
		radj[u] = []int{}
	}
	for u := 0; u < n; u++ {
		outdeg[u] = len(graph[u])
		for _, v := range graph[u] {
			radj[v] = append(radj[v], u)
		}
	}
	// Terminal nodes (out-degree 0) are trivially safe seeds.
	queue := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if outdeg[i] == 0 {
			queue = append(queue, i)
		}
	}
	safe := make([]bool, n)
	head := 0
	for head < len(queue) {
		u := queue[head]
		head++
		safe[u] = true
		// A predecessor queues only once every outgoing neighbor
		// is proven safe — the definition of a safe node.
		for _, v := range radj[u] {
			outdeg[v]--
			if outdeg[v] == 0 {
				queue = append(queue, v)
			}
		}
	}
	// Unpeeled nodes are exactly those on, or reaching, a cycle;
	// the ascending scan yields the required sorted order.
	result := []int{}
	for i := 0; i < n; i++ {
		if safe[i] {
			result = append(result, i)
		}
	}
	return result
}
