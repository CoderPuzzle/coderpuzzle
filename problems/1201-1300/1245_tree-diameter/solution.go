func treeDiameter(edges [][]int) int {
	// No edges: a single-node tree, diameter 0.
	if len(edges) == 0 {
		return 0
	}
	n := len(edges) + 1
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	bfs := func(src int) (int, int) {
		// -1 doubles as the visited marker; a tree has one path between
		// any two nodes, so BFS distances are true path lengths.
		dist := make([]int, n)
		for i := range dist {
			dist[i] = -1
		}
		dist[src] = 0
		queue := []int{src}
		far := src
		for head := 0; head < len(queue); head++ {
			u := queue[head]
			for _, v := range adj[u] {
				if dist[v] < 0 {
					dist[v] = dist[u] + 1
					queue = append(queue, v)
					// Track the farthest node on the fly.
					if dist[v] > dist[far] {
						far = v
					}
				}
			}
		}
		return far, dist[far]
	}

	// Double BFS: the farthest node B from any start is an endpoint of a
	// longest path, so B's eccentricity (second pass) is the diameter.
	far, _ := bfs(0)
	_, diameter := bfs(far)
	return diameter
}
