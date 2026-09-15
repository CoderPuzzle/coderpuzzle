func countCompleteComponents(n int, edges [][]int) int {
	parent := make([]int, n)
	size := make([]int, n)
	for v := range parent {
		parent[v] = v
		size[v] = 1
	}
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	for _, edge := range edges {
		ra, rb := find(edge[0]), find(edge[1])
		if ra != rb {
			if size[ra] < size[rb] {
				ra, rb = rb, ra
			}
			parent[rb] = ra
			size[ra] += size[rb]
		}
	}
	edgeCount := make([]int, n)
	for _, edge := range edges {
		edgeCount[find(edge[0])]++
	}
	complete := 0
	for v := 0; v < n; v++ {
		if find(v) == v && edgeCount[v] == size[v]*(size[v]-1)/2 {
			complete++
		}
	}
	return complete
}
