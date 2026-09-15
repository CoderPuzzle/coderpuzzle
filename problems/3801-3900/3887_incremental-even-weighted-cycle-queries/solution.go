func numberOfEdgesAdded(n int, edges [][]int) int {
	parent := make([]int, n)
	rank := make([]int, n)
	par := make([]int, n) // xor distance from node to its parent
	for i := range parent {
		parent[i] = i
	}

	// returns root and xor distance from x to root
	var find func(x int) (int, int)
	find = func(x int) (int, int) {
		path := make([]int, 0, 8)
		cur := x
		for parent[cur] != cur {
			path = append(path, cur)
			cur = parent[cur]
		}
		root := cur
		xr := 0
		for i := len(path) - 1; i >= 0; i-- {
			node := path[i]
			xr ^= par[node]
			parent[node] = root
			par[node] = xr
		}
		return root, xr
	}

	added := 0
	for _, e := range edges {
		u, v, w := e[0], e[1], e[2]
		ru, xu := find(u)
		rv, xv := find(v)
		if ru == rv {
			if xu^xv == w {
				added++
			}
		} else {
			rel := xu ^ xv ^ w
			if rank[ru] < rank[rv] {
				parent[ru] = rv
				par[ru] = rel
			} else if rank[ru] > rank[rv] {
				parent[rv] = ru
				par[rv] = rel
			} else {
				parent[ru] = rv
				par[ru] = rel
				rank[rv]++
			}
			added++
		}
	}
	return added
}
