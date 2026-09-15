func shortestAlternatingPaths(n int, redEdges [][]int, blueEdges [][]int) []int {
	// adjacency[c][u] lists endpoints of color-c edges from u.
	adjacency := [2][][]int{}
	for c := 0; c < 2; c++ {
		adjacency[c] = make([][]int, n)
	}
	for _, edge := range redEdges {
		adjacency[0][edge[0]] = append(adjacency[0][edge[0]], edge[1])
	}
	for _, edge := range blueEdges {
		adjacency[1][edge[0]] = append(adjacency[1][edge[0]], edge[1])
	}

	// State = (node, color of the edge used to enter it): the same node can
	// be worth visiting once per incoming color, so BFS runs over the 2n
	// states of this expanded graph.
	const INF = 1 << 40
	dist := make([][2]int, n)
	for i := range dist {
		dist[i][0] = INF
		dist[i][1] = INF
	}
	// Node 0 has no incoming edge: seed both colors at distance 0 so
	// whichever color the first real edge alternates from is covered.
	dist[0][0] = 0 // arrived at 0 via a red edge (virtual start)
	dist[0][1] = 0
	answer := make([]int, n)
	for i := range answer {
		answer[i] = -1
	}
	answer[0] = 0
	queue := make([][2]int, 0, 2*n)
	queue = append(queue, [2]int{0, 0}, [2]int{0, 1})
	for head := 0; head < len(queue); head++ {
		node, color := queue[head][0], queue[head][1]
		// Only edges of the opposite color may leave this state; INF doubles
		// as the visited test (BFS first arrival is minimal).
		for _, nxt := range adjacency[1-color][node] {
			if dist[nxt][1-color] == INF {
				dist[nxt][1-color] = dist[node][color] + 1
				value := dist[nxt][1-color]
				if answer[nxt] == -1 || value < answer[nxt] {
					answer[nxt] = value
				}
				queue = append(queue, [2]int{nxt, 1 - color})
			}
		}
	}
	return answer
}
