func magnificentSets(n int, edges [][]int) int {
	graph := make([][]int, n+1)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], e[1])
		graph[e[1]] = append(graph[e[1]], e[0])
	}

	visited := make([]bool, n+1)
	total := 0

	for start := 1; start <= n; start++ {
		if visited[start] {
			continue
		}
		// collect the connected component
		component := []int{}
		stack := []int{start}
		visited[start] = true
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			component = append(component, u)
			for _, v := range graph[u] {
				if !visited[v] {
					visited[v] = true
					stack = append(stack, v)
				}
			}
		}

		best := 0
		dist := make([]int, n+1)
		for _, source := range component {
			for i := range dist {
				dist[i] = -1
			}
			dist[source] = 0
			queue := []int{source}
			maxDepth := 0
			bipartite := true
			for head := 0; head < len(queue); head++ {
				u := queue[head]
				for _, v := range graph[u] {
					if dist[v] != -1 {
						if dist[v] == dist[u] {
							bipartite = false
						}
					} else {
						dist[v] = dist[u] + 1
						if dist[v] > maxDepth {
							maxDepth = dist[v]
						}
						queue = append(queue, v)
					}
				}
			}
			if !bipartite {
				return -1
			}
			if maxDepth > best {
				best = maxDepth
			}
		}
		total += best + 1
	}

	return total
}
