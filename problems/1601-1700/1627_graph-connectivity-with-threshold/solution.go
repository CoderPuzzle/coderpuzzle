func areConnected(n int, threshold int, queries [][]int) []bool {
	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}

	for z := threshold + 1; z <= n; z++ {
		if z > 1 && find(z) != z {
			continue
		}
		for multiple := 2 * z; multiple <= n; multiple += z {
			union(z, multiple)
		}
	}

	result := make([]bool, len(queries))
	for i, q := range queries {
		result[i] = find(q[0]) == find(q[1])
	}
	return result
}
