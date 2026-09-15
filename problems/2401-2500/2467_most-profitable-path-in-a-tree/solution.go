func mostProfitablePath(edges [][]int, bob int, amount []int) int {
	n := len(amount)
	adj := make([][]int, n)
	for i := range adj {
		adj[i] = make([]int, 0, 4)
	}
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// One BFS from the root orients the tree: depth[u] is Alice's
	// arrival time, and order lists every node after its parent.
	parent := make([]int, n)
	depth := make([]int, n)
	seen := make([]bool, n)
	for i := range parent {
		parent[i] = -1
	}
	seen[0] = true
	order := make([]int, 0, n)
	queue := []int{0}
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		order = append(order, u)
		for _, v := range adj[u] {
			if !seen[v] {
				seen[v] = true
				parent[v] = u
				depth[v] = depth[u] + 1
				queue = append(queue, v)
			}
		}
	}

	// Bob has no choices: walk his unique path to the root, recording
	// his arrival time at each node along it.
	bobTime := make(map[int]int)
	t := 0
	node := bob
	for node != -1 {
		bobTime[node] = t
		t++
		node = parent[node]
	}

	// BFS order makes income[parent] final before u, so each root-to-node
	// path sum builds in one sweep. gain compares arrivals: Bob later or
	// absent -> full amount; simultaneous -> half (exact: amounts are
	// even); Bob earlier -> gate already open, 0.
	income := make([]int, n)
	hasBest := false
	best := 0
	for _, u := range order {
		d := depth[u]
		bt, ok := bobTime[u]
		var gain int
		if !ok || bt > d {
			gain = amount[u]
		} else if bt == d {
			// Floor division (Python semantics) for negative amounts.
			gain = amount[u] / 2
			if amount[u] < 0 && amount[u]%2 != 0 {
				gain--
			}
		} else {
			gain = 0
		}
		if u != 0 {
			income[u] = income[parent[u]] + gain
		} else {
			income[u] = gain
		}
		// Alice must keep moving, so she stops at a leaf: a non-root
		// node with exactly one neighbor.
		if u != 0 && len(adj[u]) == 1 {
			if !hasBest || income[u] > best {
				best = income[u]
				hasBest = true
			}
		}
	}
	return best
}
