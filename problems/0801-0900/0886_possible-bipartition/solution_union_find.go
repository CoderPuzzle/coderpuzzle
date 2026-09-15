func possibleBipartition(n int, dislikes [][]int) bool {
	// Dislike is symmetric, so build an undirected adjacency list: the
	// unions below need, for every person, everyone that person avoids.
	adjacency := make([][]int, n+1)
	for _, d := range dislikes {
		a, b := d[0], d[1]
		adjacency[a] = append(adjacency[a], b)
		adjacency[b] = append(adjacency[b], a)
	}

	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}

	// Path-halving: splice every other node directly under its
	// grandparent, flattening the tree while walking to the root.
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	// Everyone a person dislikes must land in one set (the opposite
	// group), so union them all onto that person's first enemy.
	for person := 1; person <= n; person++ {
		for i := 1; i < len(adjacency[person]); i++ {
			ra, rb := find(adjacency[person][0]), find(adjacency[person][i])
			if ra != rb {
				parent[ra] = rb
			}
		}
	}

	// The split works exactly when no dislike pair ended up merged.
	for _, d := range dislikes {
		if find(d[0]) == find(d[1]) {
			return false
		}
	}
	return true
}
