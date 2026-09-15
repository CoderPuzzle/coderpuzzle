func minEdgeReversals(n int, edges [][]int) []int {
	type pair struct {
		y, cost int
	}
	graph := make([][]pair, n)
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], pair{e[1], 0}) // traversing u -> v costs 0
		graph[e[1]] = append(graph[e[1]], pair{e[0], 1}) // traversing v -> u costs 1 (reversal)
	}
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	order = append(order, 0)
	for i := 0; i < len(order); i++ {
		x := order[i]
		for _, p := range graph[x] {
			if p.y != parent[x] {
				parent[p.y] = x
				order = append(order, p.y)
			}
		}
	}

	dp := make([]int, n)
	for i := n - 1; i >= 0; i-- {
		x := order[i]
		for _, p := range graph[x] {
			if parent[p.y] == x {
				dp[x] += dp[p.y] + p.cost
			}
		}
	}

	ans := make([]int, n)
	ans[0] = dp[0]
	for i := 0; i < n; i++ {
		x := order[i]
		for _, p := range graph[x] {
			if parent[p.y] == x {
				if p.cost == 0 {
					ans[p.y] = ans[x] + 1
				} else {
					ans[p.y] = ans[x] - 1
				}
			}
		}
	}
	return ans
}
