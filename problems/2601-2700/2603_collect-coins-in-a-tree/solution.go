func collectTheCoins(coins []int, edges [][]int) int {
	n := len(coins)
	adj := make([]map[int]struct{}, n)
	for i := range adj {
		adj[i] = make(map[int]struct{})
	}
	for _, e := range edges {
		adj[e[0]][e[1]] = struct{}{}
		adj[e[1]][e[0]] = struct{}{}
	}

	// Phase 1: repeatedly remove leaves that carry no coin.
	leaves := []int{}
	for i := 0; i < n; i++ {
		if len(adj[i]) == 1 && coins[i] == 0 {
			leaves = append(leaves, i)
		}
	}
	for len(leaves) > 0 {
		nxt := []int{}
		for _, u := range leaves {
			if len(adj[u]) > 0 {
				v := 0
				for k := range adj[u] {
					v = k
				}
				delete(adj[v], u)
				if len(adj[v]) == 1 && coins[v] == 0 {
					nxt = append(nxt, v)
				}
			}
			adj[u] = map[int]struct{}{}
		}
		leaves = nxt
	}

	// Phase 2: drop two more layers of leaves (distance-2 collection).
	for round := 0; round < 2; round++ {
		leaves = []int{}
		for i := 0; i < n; i++ {
			if len(adj[i]) == 1 {
				leaves = append(leaves, i)
			}
		}
		for _, u := range leaves {
			if len(adj[u]) > 0 {
				v := 0
				for k := range adj[u] {
					v = k
				}
				delete(adj[v], u)
			}
			adj[u] = map[int]struct{}{}
		}
	}

	remaining := 0
	for i := 0; i < n; i++ {
		if len(adj[i]) > 0 {
			remaining++
		}
	}
	if remaining <= 1 {
		return 0
	}
	return (remaining - 1) * 2
}
