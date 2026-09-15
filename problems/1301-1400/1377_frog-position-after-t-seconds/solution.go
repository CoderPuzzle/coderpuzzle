func frogPosition(n int, edges [][]int, t int, target int) float64 {
	if n == 1 {
		return 1.0
	}
	neighbors := make([][]int, n+1)
	for _, e := range edges {
		neighbors[e[0]] = append(neighbors[e[0]], e[1])
		neighbors[e[1]] = append(neighbors[e[1]], e[0])
	}

	// BFS from vertex 1; probability splits equally among unvisited children.
	// A leaf keeps its probability: the frog stays there forever.
	prob := make([]float64, n+1)
	depth := make([]int, n+1)
	childCount := make([]int, n+1)
	visited := make([]bool, n+1)
	queue := []int{1}
	prob[1] = 1.0
	visited[1] = true
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		children := 0
		for _, nxt := range neighbors[node] {
			if !visited[nxt] {
				children++
			}
		}
		childCount[node] = children
		if children > 0 {
			for _, nxt := range neighbors[node] {
				if visited[nxt] {
					continue
				}
				visited[nxt] = true
				depth[nxt] = depth[node] + 1
				prob[nxt] = prob[node] / float64(children)
				queue = append(queue, nxt)
			}
		}
	}

	if depth[target] == t {
		return prob[target]
	}
	if depth[target] < t && childCount[target] == 0 {
		return prob[target]
	}
	return 0.0
}
