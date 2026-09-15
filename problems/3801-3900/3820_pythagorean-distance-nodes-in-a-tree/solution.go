func specialNodes(n int, edges [][]int, x, y, z int) int {
	adjacency := make([][]int, n)
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], edge[1])
		adjacency[edge[1]] = append(adjacency[edge[1]], edge[0])
	}

	dx := distances(adjacency, x, n)
	dy := distances(adjacency, y, n)
	dz := distances(adjacency, z, n)

	answer := 0
	for node := 0; node < n; node++ {
		a, b, c := dx[node], dy[node], dz[node]
		if a > b {
			a, b = b, a
		}
		if b > c {
			b, c = c, b
		}
		if a > b {
			a, b = b, a
		}
		// Distances reach 10^5, so squares reach 10^10: compare in int64.
		if int64(a)*int64(a)+int64(b)*int64(b) == int64(c)*int64(c) {
			answer++
		}
	}
	return answer
}

// Every tree edge has unit weight, so a breadth-first search from a target
// reaches nodes in increasing distance order. The explicit frontier slice
// keeps a 10^5-node path off the call stack.
func distances(adjacency [][]int, source, n int) []int {
	dist := make([]int, n)
	for node := range dist {
		dist[node] = -1
	}
	dist[source] = 0
	frontier := make([]int, 0, n)
	frontier = append(frontier, source)
	for index := 0; index < len(frontier); index++ {
		node := frontier[index]
		for _, neighbor := range adjacency[node] {
			if dist[neighbor] < 0 {
				dist[neighbor] = dist[node] + 1
				frontier = append(frontier, neighbor)
			}
		}
	}
	return dist
}
