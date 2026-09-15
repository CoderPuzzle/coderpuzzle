func minimumDiameterAfterMerge(edges1 [][]int, edges2 [][]int) int {
	// Whatever the attachment pair, the merged diameter is the max of
	// three candidates: each original diameter, and the path that crosses
	// the new edge -- deepest leg of tree 1 from its attachment node,
	// plus deepest leg of tree 2, plus 1. Only the third term depends on
	// the choice, and the minimum over attachment nodes of the deepest
	// leg is the radius ceil(d / 2). So connect the two centers: answer
	// = max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1). Each diameter comes
	// from two strictly iterative BFS sweeps (slice-backed queues with a
	// read head); with 1e5 nodes recursion is not an option.
	d1 := diameter(edges1)
	d2 := diameter(edges2)
	cross := (d1+1)/2 + (d2+1)/2 + 1
	return max(d1, max(d2, cross))
}

type sweepResult struct {
	far  int
	best int
}

func sweep(adj [][]int, src int) sweepResult {
	n := len(adj)
	dist := make([]int, n)
	for i := range dist {
		dist[i] = -1
	}
	dist[src] = 0
	queue := make([]int, 0, n)
	queue = append(queue, src)
	head := 0
	far, best := src, 0
	for head < len(queue) {
		u := queue[head]
		head++
		for _, v := range adj[u] {
			if dist[v] < 0 {
				dist[v] = dist[u] + 1
				if dist[v] > best {
					far, best = v, dist[v]
				}
				queue = append(queue, v)
			}
		}
	}
	return sweepResult{far: far, best: best}
}

func diameter(edges [][]int) int {
	n := len(edges) + 1
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	return sweep(adj, sweep(adj, 0).far).best
}
