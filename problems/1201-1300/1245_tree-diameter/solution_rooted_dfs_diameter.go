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

	// Iterative DFS from root 0 with an explicit stack. Each node is
	// recorded as it is popped, and entered only from the neighbor it
	// came from, so `order` meets parents before children.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range adj[u] {
			if v != parent[u] {
				parent[v] = u
				stack = append(stack, v)
			}
		}
	}

	// Reversed, `order` is a bottom-up order: children settle before
	// parents. At each node the two deepest child heights combine:
	// their sum is the widest path turning there, the deeper one
	// alone is the node's own height for its parent.
	height := make([]int, n)
	diameter := 0
	for i := n - 1; i >= 0; i-- {
		u := order[i]
		first, second := 0, 0
		for _, v := range adj[u] {
			if v != parent[u] {
				child := height[v] + 1
				if child > first {
					first, second = child, first
				} else if child > second {
					second = child
				}
			}
		}
		height[u] = first
		if first+second > diameter {
			diameter = first + second
		}
	}
	return diameter
}
