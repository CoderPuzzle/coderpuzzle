func numberOfPaths(n int, corridors [][]int) int {
	degree := make([]int, n+1)
	for _, corridor := range corridors {
		degree[corridor[0]]++
		degree[corridor[1]]++
	}

	forward := make([]map[int]struct{}, n+1)
	for i := range forward {
		forward[i] = make(map[int]struct{})
	}
	for _, corridor := range corridors {
		u, v := corridor[0], corridor[1]
		if degree[u] > degree[v] || degree[u] == degree[v] && u > v {
			u, v = v, u
		}
		forward[u][v] = struct{}{}
	}

	triangles := 0
	for u := 1; u <= n; u++ {
		for v := range forward[u] {
			for w := range forward[u] {
				if _, exists := forward[v][w]; exists {
					triangles++
				}
			}
		}
	}
	return triangles
}
