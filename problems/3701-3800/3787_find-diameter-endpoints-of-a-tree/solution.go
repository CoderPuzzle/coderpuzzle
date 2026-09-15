func findSpecialNodes(n int, edges [][]int) string {
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// Classic property: every node tying as farthest from src is the endpoint
	// of some diameter path, so the sweep marks the whole farthest set.
	bfs := func(src int) []bool {
		dist := make([]int, n)
		for i := range dist {
			dist[i] = -1
		}
		dist[src] = 0
		queue := make([]int, 0, n)
		queue = append(queue, src)
		far := 0
		for head := 0; head < len(queue); head++ {
			u := queue[head]
			for _, v := range adj[u] {
				if dist[v] == -1 {
					dist[v] = dist[u] + 1
					if dist[v] > far {
						far = dist[v]
					}
					queue = append(queue, v)
				}
			}
		}
		res := make([]bool, n)
		for i := 0; i < n; i++ {
			res[i] = dist[i] == far
		}
		return res
	}

	// First sweep from node 0: one side's diameter endpoints. Any member of
	// that set is itself an endpoint, so the second sweep's farthest nodes
	// are the opposite endpoints.
	oneEnd := bfs(0)
	first := 0
	for i := 0; i < n; i++ {
		if oneEnd[i] {
			first = i
			break
		}
	}
	otherEnd := bfs(first)

	// The union of the two endpoint sets is exactly the special nodes.
	out := make([]byte, n)
	for i := 0; i < n; i++ {
		if oneEnd[i] || otherEnd[i] {
			out[i] = '1'
		} else {
			out[i] = '0'
		}
	}
	return string(out)
}
