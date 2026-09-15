func numberOfEdgesAdded(n int, edges [][]int) int {
	parent := make([]int, n)
	size := make([]int, n)
	color := make([]int, n)     // absolute color of each node within its component
	members := make([][]int, n) // per-root member lists, for the flip
	for i := range parent {
		parent[i] = i
		size[i] = 1
		members[i] = []int{i}
	}

	// membership only: path halving, no parity bookkeeping
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	added := 0
	for _, e := range edges {
		u, v, w := e[0], e[1], e[2]
		ru, rv := find(u), find(v)
		if ru == rv {
			// the standing path parity is color[u] ^ color[v]: an O(1) verdict
			if color[u]^color[v] == w {
				added++
			}
		} else {
			if size[ru] < size[rv] {
				ru, rv = rv, ru // ru is now the larger root
			}
			if color[u]^color[v] != w {
				// recolor the smaller component: every relation inside it
				// survives a uniform flip, while the new edge's demand flips
				for _, m := range members[rv] {
					color[m] ^= 1
				}
			}
			parent[rv] = ru
			size[ru] += size[rv]
			members[ru] = append(members[ru], members[rv]...)
			added++
		}
	}
	return added
}
