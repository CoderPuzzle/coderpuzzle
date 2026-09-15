func maxKDivisibleComponents(n int, edges [][]int, values []int, k int) int {
	adj := make([][]int, n)
	for _, edge := range edges {
		a, b := edge[0], edge[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	// Iterative DFS from root 0 to get a processing order (parents first).
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	stack := make([]int, 0, n)
	visited := make([]bool, n)
	visited[0] = true
	stack = append(stack, 0)
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range adj[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				stack = append(stack, v)
			}
		}
	}

	// Process children before parents; cut an edge whenever the finished
	// subtree sum is divisible by k.
	subtree := make([]int64, n)
	for i, v := range values {
		subtree[i] = int64(v)
	}
	components := 0
	for i := n - 1; i >= 0; i-- {
		u := order[i]
		if u != 0 {
			if subtree[u]%int64(k) == 0 {
				components++
			} else {
				subtree[parent[u]] += subtree[u]
			}
		}
	}
	return components + 1
}
