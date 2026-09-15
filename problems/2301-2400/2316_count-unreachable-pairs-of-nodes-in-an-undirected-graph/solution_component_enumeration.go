func countPairs(n int, edges [][]int) int64 {
	// components answer the question: all C(n, 2) pairs minus the pairs
	// inside one component, so enumerate each component exactly once
	adj := make([][]int, n)
	for _, e := range edges {
		// an undirected edge is walkable both ways, so each endpoint
		// records the other as a neighbour
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	visited := make([]bool, n)
	// a flat slice with a read cursor serves as the queue: append is the
	// push, the advancing cursor the pop. The walk is iterative end to end
	// -- no recursion depth to reason about on one long component
	queue := make([]int, 0, n)
	reachable := int64(0)
	for seed := 0; seed < n; seed++ {
		if visited[seed] {
			continue
		}
		visited[seed] = true
		// reusing the backing array: queue[:0] empties it, capacity stays
		queue = append(queue[:0], seed)
		// marking a node when it is enqueued, not when it is dequeued,
		// keeps every node in the queue exactly once
		for head := 0; head < len(queue); head++ {
			for _, v := range adj[queue[head]] {
				if !visited[v] {
					visited[v] = true
					queue = append(queue, v)
				}
			}
		}
		// the queue now holds precisely this component: its size*(size-1)/2
		// internal pairs are exactly the reachable pairs it contributes
		size := int64(len(queue))
		reachable += size * (size - 1) / 2
	}
	// whatever remains of C(n, 2) counts each unreachable pair once
	totalPairs := int64(n) * int64(n-1) / 2
	return totalPairs - reachable
}
