func networkDelayTime(times [][]int, n int, k int) int {
	const inf = 100000000
	dist := make([]int, n+1)
	for i := range dist {
		dist[i] = inf
	}
	dist[k] = 0
	// Each round extends shortest paths by one edge, so n-1 rounds suffice.
	for round := 0; round < n-1; round++ {
		changed := false
		for _, t := range times {
			// The dist[u] finite guard keeps inf + w from overflowing.
			if dist[t[0]] < inf && dist[t[0]]+t[2] < dist[t[1]] {
				dist[t[1]] = dist[t[0]] + t[2]
				changed = true
			}
		}
		// A round that relaxes nothing means the distances are final.
		if !changed {
			break
		}
	}
	best := -1
	for i := 1; i <= n; i++ {
		// Anything still at inf is unreachable from k.
		if dist[i] >= inf {
			return -1
		}
		if dist[i] > best {
			best = dist[i]
		}
	}
	return best
}
