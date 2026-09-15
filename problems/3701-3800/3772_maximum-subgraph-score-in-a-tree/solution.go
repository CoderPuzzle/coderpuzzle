func maxSubgraphScore(n int, edges [][]int, good []int) []int {
	const NEG = int64(-1) << 60
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// Iterative DFS (explicit stack): safe on deep trees; records parent,
	// children, and an order where every parent precedes its children.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	children := make([][]int, n)
	order := []int{}
	stack := []int{0}
	parent[0] = -2
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			parent[v] = u
			children[u] = append(children[u], v)
			stack = append(stack, v)
		}
	}

	// +1 for good, -1 for bad: a connected subgraph's score is its weight sum,
	// so the task is the max-weight connected subgraph through each node.
	weight := make([]int, n)
	for i, g := range good {
		if g != 0 {
			weight[i] = 1
		} else {
			weight[i] = -1
		}
	}

	// down[u]: best score of a connected subgraph confined to u's subtree:
	// weight[u] plus each child's down only when positive, pruning harmful
	// branches. Reverse order computes children before parents.
	down := make([]int64, n)
	for i := len(order) - 1; i >= 0; i-- {
		u := order[i]
		s := int64(weight[u])
		for _, c := range children[u] {
			if down[c] > 0 {
				s += down[c]
			}
		}
		down[u] = s
	}

	// up[u]: best connected piece reaching u only through its parent side
	// (u's own subtree excluded); the NEG sentinel gives the root none.
	up := make([]int64, n)
	up[0] = NEG
	result := make([]int, n)
	// Reroot in one preorder pass: each child inherits the parent plus u's
	// other worthwhile branches plus what the rest of the tree gave u;
	// dropping the child's own positive part keeps the two sides disjoint.
	for _, u := range order {
		var totalPos int64
		for _, c := range children[u] {
			if down[c] > 0 {
				totalPos += down[c]
			}
		}
		for _, c := range children[u] {
			dc := down[c]
			if dc < 0 {
				dc = 0
			}
			uu := up[u]
			if uu < 0 {
				uu = 0
			}
			up[c] = int64(weight[u]) + (totalPos - dc) + uu
		}
		uu := up[u]
		if uu < 0 {
			uu = 0
		}
		// Answer for u: its weight, its positive child branches, and the
		// optional parent-side piece.
		result[u] = weight[u] + int(totalPos) + int(uu)
	}
	return result
}
