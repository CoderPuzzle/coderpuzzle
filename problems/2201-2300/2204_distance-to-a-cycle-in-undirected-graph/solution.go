func distanceToCycle(n int, edges [][]int) []int {
	adj := make([][]int, n)
	degree := make([]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
		degree[a]++
		degree[b]++
	}

	// peel off degree-1 leaves; whatever remains is the unique cycle
	removed := make([]bool, n)
	queue := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if degree[i] == 1 {
			queue = append(queue, i)
		}
	}
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		removed[u] = true
		for _, v := range adj[u] {
			if !removed[v] {
				degree[v]--
				if degree[v] == 1 {
					queue = append(queue, v)
				}
			}
		}
	}

	// multi-source BFS from all cycle nodes
	dist := make([]int, n)
	visited := make([]bool, n)
	bfs := make([]int, 0, n)
	for u := 0; u < n; u++ {
		if !removed[u] {
			visited[u] = true
			bfs = append(bfs, u)
		}
	}
	for head := 0; head < len(bfs); head++ {
		u := bfs[head]
		for _, v := range adj[u] {
			if !visited[v] {
				visited[v] = true
				dist[v] = dist[u] + 1
				bfs = append(bfs, v)
			}
		}
	}
	return dist
}
