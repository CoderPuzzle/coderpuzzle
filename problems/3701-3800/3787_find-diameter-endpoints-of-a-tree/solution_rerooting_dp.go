func findSpecialNodes(n int, edges [][]int) string {
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// Root at node 0 and sweep once for a BFS order plus parents: children
	// always sit after their parent in the order, and both passes lean on it.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		u := order[head]
		for _, v := range adj[u] {
			if v != parent[u] {
				parent[v] = u
				order = append(order, v)
			}
		}
	}

	// Down pass, over the order reversed so each child is final before its
	// parent reads it: down[v] is the height of v's subtree. The top two
	// child chains ride along because the up pass must route around a
	// parent's best arm when the path re-enters through that arm.
	down := make([]int, n)
	second := make([]int, n)
	bestChild := make([]int, n)
	for i := range bestChild {
		bestChild[i] = -1
	}
	for i := len(order) - 1; i >= 0; i-- {
		v := order[i]
		p := parent[v]
		if p >= 0 {
			chain := down[v] + 1
			if chain > down[p] {
				second[p] = down[p]
				down[p] = chain
				bestChild[p] = v
			} else if chain > second[p] {
				second[p] = chain
			}
		}
	}

	// Up pass, forward over the order: up[v] is the longest path leaving
	// v's subtree through its parent, and max(down[v], up[v]) is v's
	// eccentricity. A sibling arm stands in for the parent's best arm
	// exactly when v owns that arm, which is why second was kept.
	up := make([]int, n)
	diameter := 0
	for _, v := range order {
		p := parent[v]
		if p >= 0 {
			arm := down[p]
			if v == bestChild[p] {
				arm = second[p]
			}
			if up[p] >= arm {
				up[v] = up[p] + 1
			} else {
				up[v] = arm + 1
			}
		}
		if down[v] > diameter {
			diameter = down[v]
		}
		if up[v] > diameter {
			diameter = up[v]
		}
	}

	// A node terminates a diameter exactly when its eccentricity equals
	// the tree's widest path, so compare and print.
	out := make([]byte, n)
	for i := 0; i < n; i++ {
		ecc := down[i]
		if up[i] > ecc {
			ecc = up[i]
		}
		if ecc == diameter {
			out[i] = '1'
		} else {
			out[i] = '0'
		}
	}
	return string(out)
}
