func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	const INF = 1 << 30
	// After r full rounds, dist[v] is the cheapest fare using at
	// most r edges; k stops allow k+1 flights, so run k+1 rounds.
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0
	for i := 0; i < k+1; i++ {
		// Relax from a frozen copy: writing in place would chain
		// several edges inside one round and exceed the stop limit.
		ndist := make([]int, n)
		copy(ndist, dist)
		changed := false
		for _, flight := range flights {
			f, t, price := flight[0], flight[1], flight[2]
			if dist[f]+price < ndist[t] {
				ndist[t] = dist[f] + price
				changed = true
			}
		}
		dist = ndist
		// A round that changed nothing never improves later rounds.
		if !changed {
			break
		}
	}
	// A surviving infinity means the destination is unreachable
	// within the allowance.
	if dist[dst] >= INF {
		return -1
	}
	return dist[dst]
}
