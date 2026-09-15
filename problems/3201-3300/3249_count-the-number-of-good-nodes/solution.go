// Breadth-first order from the root, then a reverse pass: parents are
// always recorded before their children in the forward walk, so reading
// that order backwards visits every child before its parent -- an
// iterative post-order that never touches the call stack.
func countGoodNodes(edges [][]int) int {
	n := len(edges) + 1
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	order := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	visited := make([]bool, n)
	visited[0] = true
	head, tail := 0, 1
	for head < tail {
		u := order[head]
		head++
		for _, v := range adj[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				order[tail] = v
				tail++
			}
		}
	}

	// Reverse breadth-first order folds subtree sizes bottom-up: once the
	// fold reaches a node, every one of its descendants has already been
	// folded in, so size[i] ends as the number of nodes in i's subtree.
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	for idx := n - 1; idx > 0; idx-- {
		size[parent[order[idx]]] += size[order[idx]]
	}

	// A node is good when its children's subtree sizes all agree.
	good := make([]bool, n)
	for i := range good {
		good[i] = true
	}
	seenChild := make([]bool, n)
	firstSize := make([]int, n)
	for idx := 1; idx < n; idx++ {
		v := order[idx]
		p := parent[v]
		if !seenChild[p] {
			seenChild[p] = true
			firstSize[p] = size[v]
		} else if size[v] != firstSize[p] {
			good[p] = false
		}
	}

	ans := 0
	for _, g := range good {
		if g {
			ans++
		}
	}
	return ans
}
