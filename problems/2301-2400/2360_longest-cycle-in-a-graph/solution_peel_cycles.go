func longestCycle(edges []int) int {
	n := len(edges)
	// Count in-edges first; a node nobody points at is a queue seed.
	// edges[i] == -1 points nowhere and counts for nothing.
	indeg := make([]int, n)
	for _, v := range edges {
		if v != -1 {
			indeg[v]++
		}
	}
	// Kahn-style peel: repeatedly remove in-degree-0 nodes, dropping the
	// in-edge their out-edge contributed to a successor. What survives
	// the queue is exactly the set of cycle nodes.
	queue := make([]int, 0, n)
	for u := 0; u < n; u++ {
		if indeg[u] == 0 {
			queue = append(queue, u)
		}
	}
	head := 0
	for head < len(queue) {
		u := queue[head]
		head++
		w := edges[u]
		if w != -1 {
			indeg[w]--
			if indeg[w] == 0 {
				queue = append(queue, w)
			}
		}
	}
	// Each survivor lies on a ring: walk it once, zeroing indeg as nodes
	// are counted so the walk stops exactly where it started.
	best := -1
	for start := 0; start < n; start++ {
		if indeg[start] == 0 {
			continue
		}
		ring := 0
		node := start
		for indeg[node] > 0 {
			indeg[node] = 0
			ring++
			node = edges[node]
		}
		if ring > best {
			best = ring
		}
	}
	return best
}
