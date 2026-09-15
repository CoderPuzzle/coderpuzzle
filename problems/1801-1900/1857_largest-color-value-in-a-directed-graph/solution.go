func largestPathValue(colors string, edges [][]int) int {
	n := len(colors)
	graph := make([][]int, n)
	indeg := make([]int, n)
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], e[1])
		indeg[e[1]]++
	}

	// dp[u][c] = max number of color-c nodes on any path ending at u.
	// Kahn's order guarantees every predecessor of u is finalized before
	// u is processed, so the row pushed out of u is final.
	dp := make([][26]int, n)

	queue := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if indeg[i] == 0 {
			queue = append(queue, i)
		}
	}
	head, visited, ans := 0, 0, 0
	for head < len(queue) {
		u := queue[head]
		head++
		visited++
		// u extends every incoming path, so count its own color.
		dp[u][colors[u]-'a']++
		// A valid path may end at any node — the row's best entry is a
		// candidate (this is what lets single-node paths count).
		for c := 0; c < 26; c++ {
			if dp[u][c] > ans {
				ans = dp[u][c]
			}
		}
		for _, v := range graph[u] {
			// Element-wise max-merge into the neighbor's row.
			for c := 0; c < 26; c++ {
				if dp[u][c] > dp[v][c] {
					dp[v][c] = dp[u][c]
				}
			}
			indeg[v]--
			if indeg[v] == 0 {
				queue = append(queue, v)
			}
		}
	}
	// Nodes on or downstream of a cycle never reach indegree zero.
	if visited != n {
		return -1
	}
	return ans
}
