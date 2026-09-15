// Marking spreads one BFS layer per second, so the last marked node for a
// start i is a farthest node from i, and a farthest node from any node is
// always an endpoint of a diameter. Two sweeps find the diameter endpoints
// u and v; the distance arrays from both then answer every i at once --
// the farther endpoint is a last-marked node, and on a tie either endpoint
// qualifies.
func lastMarkedNodes(edges [][]int) []int {
	n := len(edges) + 1
	adj := make([][]int, n)
	for i := range adj {
		adj[i] = []int{}
	}
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	bfs := func(src int) ([]int, int) {
		dist := make([]int, n)
		for i := range dist {
			dist[i] = -1
		}
		dist[src] = 0
		queue := make([]int, 0, n)
		queue = append(queue, src)
		far := src
		for head := 0; head < len(queue); head++ {
			node := queue[head]
			for _, nxt := range adj[node] {
				if dist[nxt] == -1 {
					dist[nxt] = dist[node] + 1
					if dist[nxt] > dist[far] {
						far = nxt
					}
					queue = append(queue, nxt)
				}
			}
		}
		return dist, far
	}

	_, u := bfs(0)
	distU, v := bfs(u)
	distV, _ := bfs(v)
	ans := make([]int, n)
	for i := 0; i < n; i++ {
		if distU[i] > distV[i] {
			ans[i] = u
		} else {
			ans[i] = v
		}
	}
	return ans
}
