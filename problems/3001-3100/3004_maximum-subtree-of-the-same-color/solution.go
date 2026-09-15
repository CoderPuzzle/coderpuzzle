// Breadth-first order from the root, then a reverse pass: parents are
// always recorded before their children in the forward walk, so reading
// that order backwards visits every child before its parent -- an
// iterative post-order that never touches the call stack.
func maximumSubtreeSize(edges [][]int, colors []int) int {
	n := len(colors)
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

	// mono[v] says every node in v's subtree so far shares v's color;
	// size[v] is how many nodes that monochrome run holds. A mixed
	// subtree poisons the parent outright; a clean one poisons it on a
	// color mismatch, otherwise it joins the parent's count.
	mono := make([]bool, n)
	for i := range mono {
		mono[i] = true
	}
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	best := 1

	// Reverse breadth-first order folds children into parents only after
	// every one of their own descendants has already folded in.
	for idx := n - 1; idx >= 0; idx-- {
		u := order[idx]
		if mono[u] && size[u] > best {
			best = size[u]
		}
		p := parent[u]
		if p != -1 {
			if !mono[u] || colors[u] != colors[p] {
				mono[p] = false
			} else {
				size[p] += size[u]
			}
		}
	}
	return best
}
