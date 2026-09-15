func minimumFuelCost(roads [][]int, seats int) int {
	n := len(roads) + 1
	if n == 1 {
		return 0
	}
	adj := make([][]int, n)
	for i := range adj {
		adj[i] = make([]int, 0, 4)
	}
	for _, r := range roads {
		adj[r[0]] = append(adj[r[0]], r[1])
		adj[r[1]] = append(adj[r[1]], r[0])
	}

	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	seen := make([]bool, n)
	seen[0] = true
	order := make([]int, 0, n)
	queue := make([]int, 0, n)
	queue = append(queue, 0)
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		order = append(order, u)
		for _, v := range adj[u] {
			if !seen[v] {
				seen[v] = true
				parent[v] = u
				queue = append(queue, v)
			}
		}
	}

	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	fuel := 0
	for i := len(order) - 1; i >= 0; i-- { // children before parents
		u := order[i]
		if u == 0 {
			continue
		}
		size[parent[u]] += size[u]
		fuel += (size[u] + seats - 1) / seats
	}
	return fuel
}
