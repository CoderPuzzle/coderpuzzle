func shortestDistanceAfterQueries(n int, queries [][]int) []int {
	// Every added road can only shorten paths, so nothing computed for
	// an earlier query stays reusable except the road set itself. Keep
	// an adjacency list, append each new road, then run one unweighted
	// BFS from city 0 that stops as soon as city n - 1 is settled.
	// With n, q <= 500 this recomputation per query is cheap and exact.
	roads := make([][]int, n)
	for i := 0; i+1 < n; i++ {
		roads[i] = append(roads[i], i+1)
	}
	answer := make([]int, len(queries))
	for qi, query := range queries {
		u, v := query[0], query[1]
		roads[u] = append(roads[u], v)
		dist := make([]int, n)
		for i := range dist {
			dist[i] = -1
		}
		queue := []int{0}
		dist[0] = 0
		for head := 0; head < len(queue); head++ {
			node := queue[head]
			if node == n-1 {
				break
			}
			for _, nxt := range roads[node] {
				if dist[nxt] == -1 {
					dist[nxt] = dist[node] + 1
					queue = append(queue, nxt)
				}
			}
		}
		answer[qi] = dist[n-1]
	}
	return answer
}
