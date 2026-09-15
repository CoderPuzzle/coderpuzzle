func gardenNoAdj(n int, paths [][]int) []int {
	adj := make([][]int, n+1)
	for _, path := range paths {
		x, y := path[0], path[1]
		adj[x] = append(adj[x], y)
		adj[y] = append(adj[y], x)
	}

	color := make([]int, n+1)
	for i := 1; i <= n; i++ {
		var used [5]bool
		for _, neighbor := range adj[i] {
			if color[neighbor] != 0 {
				used[color[neighbor]] = true
			}
		}
		for c := 1; c <= 4; c++ {
			if !used[c] {
				color[i] = c
				break
			}
		}
	}

	return color[1:]
}
