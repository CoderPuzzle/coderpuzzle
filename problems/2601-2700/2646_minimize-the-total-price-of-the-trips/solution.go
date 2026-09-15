func minimumTotalPrice(n int, edges [][]int, price []int, trips [][]int) int {
	adj := make([][]int, n)
	for i := range adj {
		adj[i] = []int{}
	}
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	freq := make([]int64, n)
	for _, t := range trips {
		start, end := t[0], t[1]
		parent := make([]int, n)
		for i := range parent {
			parent[i] = -1
		}
		visited := make([]bool, n)
		stack := []int{start}
		visited[start] = true
		for len(stack) > 0 {
			v := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if v == end {
				break
			}
			for _, u := range adj[v] {
				if !visited[u] {
					visited[u] = true
					parent[u] = v
					stack = append(stack, u)
				}
			}
		}
		cur := end
		for cur != -1 {
			freq[cur]++
			if cur == start {
				break
			}
			cur = parent[cur]
		}
	}

	min64 := func(a, b int64) int64 {
		if a < b {
			return a
		}
		return b
	}

	var dfs func(v, p int) (int64, int64)
	dfs = func(v, p int) (int64, int64) {
		dp0 := int64(price[v]) * freq[v]
		dp1 := (int64(price[v]) / 2) * freq[v]
		for _, u := range adj[v] {
			if u == p {
				continue
			}
			c0, c1 := dfs(u, v)
			dp0 += min64(c0, c1)
			dp1 += c0
		}
		return dp0, dp1
	}

	a, b := dfs(0, -1)
	return int(min64(a, b))
}
