import "sort"

func maximumScore(scores []int, edges [][]int) int {
	n := len(scores)
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	// keep only the 3 highest-scoring neighbours of each node
	// (stable sort matches Python's sorted stability on ties)
	top3 := make([][]int, n)
	for u := 0; u < n; u++ {
		nbrs := make([]int, len(adj[u]))
		copy(nbrs, adj[u])
		sort.SliceStable(nbrs, func(i, j int) bool {
			return scores[nbrs[i]] > scores[nbrs[j]]
		})
		if len(nbrs) > 3 {
			nbrs = nbrs[:3]
		}
		top3[u] = nbrs
	}

	best := -1
	for _, e := range edges {
		a, b := e[0], e[1]
		base := scores[a] + scores[b]
		for _, x := range top3[a] {
			if x == b {
				continue
			}
			for _, y := range top3[b] {
				if y == a || x == y {
					continue
				}
				total := base + scores[x] + scores[y]
				if total > best {
					best = total
				}
			}
		}
	}
	return best
}
