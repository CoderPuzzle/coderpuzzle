func build(edges [][]int) [][]int {
	adj := make([][]int, len(edges)+1)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	return adj
}

func within(adj [][]int, start, limit int) int {
	if limit < 0 {
		return 0
	}
	seen := make([]bool, len(adj))
	seen[start] = true
	count := 1
	frontier := []int{start}
	for depth := 0; depth < limit && len(frontier) > 0; depth++ {
		next := []int{}
		for _, u := range frontier {
			for _, w := range adj[u] {
				if !seen[w] {
					seen[w] = true
					count++
					next = append(next, w)
				}
			}
		}
		frontier = next
	}
	return count
}

func maxTargetNodes(edges1 [][]int, edges2 [][]int, k int) []int {
	// answer[i] = (nodes within k of i in tree 1) + max over v of (nodes
	// within k - 1 of v in tree 2): the connecting edge spends one of the
	// k steps, and queries are independent (hints 1-2). With k = 0 the
	// k - 1 limit floors to zero second-tree nodes. Layer BFS is iterative
	// — a 1000-node path would overflow a recursive walk.
	adj1 := build(edges1)
	adj2 := build(edges2)
	best2 := 0
	for v := range adj2 {
		if c := within(adj2, v, k-1); c > best2 {
			best2 = c
		}
	}
	answer := make([]int, len(adj1))
	for u := range adj1 {
		answer[u] = within(adj1, u, k) + best2
	}
	return answer
}
