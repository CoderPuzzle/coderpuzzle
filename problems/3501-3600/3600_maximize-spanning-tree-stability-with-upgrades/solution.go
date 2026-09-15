func maxStability(n int, edges [][]int, k int) int {
	parent := make([]int, n)
	size := make([]int, n)

	find := func(a int) int {
		for parent[a] != a {
			parent[a] = parent[parent[a]]
			a = parent[a]
		}
		return a
	}
	union := func(a, b int) bool {
		a = find(a)
		b = find(b)
		if a == b {
			return false
		}
		if size[a] < size[b] {
			a, b = b, a
		}
		parent[b] = a
		size[a] += size[b]
		return true
	}

	feasible := func(x int) bool {
		for i := 0; i < n; i++ {
			parent[i] = i
			size[i] = 1
		}
		for _, e := range edges {
			if e[3] == 1 {
				if e[2] < x {
					return false
				}
				if !union(e[0], e[1]) {
					return false
				}
			}
		}
		for _, e := range edges {
			if e[3] == 0 && e[2] >= x {
				union(e[0], e[1])
			}
		}
		upgrades := 0
		for _, e := range edges {
			if e[3] == 0 && e[2] < x && 2*e[2] >= x {
				if union(e[0], e[1]) {
					upgrades++
					if upgrades > k {
						return false
					}
				}
			}
		}
		root := find(0)
		for i := 1; i < n; i++ {
			if find(i) != root {
				return false
			}
		}
		return true
	}

	if !feasible(1) {
		return -1
	}
	lo, hi := 1, 200001 // si <= 1e5 so 2*si <= 2e5
	for lo+1 < hi {
		mid := (lo + hi) / 2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid
		}
	}
	return lo
}
