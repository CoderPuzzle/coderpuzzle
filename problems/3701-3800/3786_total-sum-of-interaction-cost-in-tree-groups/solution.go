func interactionCosts(n int, edges [][]int, group []int) int64 {
	// One slot per group label; labels are 1..20.
	const labels = 21

	adjacency := make([][]int, n)
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], edge[1])
		adjacency[edge[1]] = append(adjacency[edge[1]], edge[0])
	}

	total := make([]int64, labels)
	for _, label := range group {
		total[label]++
	}

	// Breadth-first discovery from node 0 records each node's parent;
	// an explicit queue keeps deep trees off the call stack.
	parent := make([]int, n)
	parent[0] = -1
	order := make([]int, 0, n)
	order = append(order, 0)
	for index := 0; index < len(order); index++ {
		node := order[index]
		for _, neighbor := range adjacency[node] {
			if neighbor != parent[node] {
				parent[neighbor] = node
				order = append(order, neighbor)
			}
		}
	}

	// counts[node*labels+label] = same-label nodes inside node's subtree.
	// Reverse discovery order visits children before parents, so each
	// node's block is complete when its turn comes.
	counts := make([]int64, n*labels)
	var answer int64
	for index := len(order) - 1; index >= 1; index-- {
		node := order[index]
		base := node * labels
		counts[base+group[node]]++
		parentBase := parent[node] * labels
		for label := 1; label < labels; label++ {
			inside := counts[base+label]
			if inside > 0 {
				// Every same-group pair split by the parent edge pays
				// exactly one unit on this edge.
				answer += inside * (total[label] - inside)
				counts[parentBase+label] += inside
			}
		}
	}
	return answer
}
