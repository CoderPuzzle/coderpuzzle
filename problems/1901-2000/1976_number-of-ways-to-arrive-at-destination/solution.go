func countPaths(n int, roads [][]int) int {
	const MOD = 1000000007
	adj := make([][][2]int, n)
	for _, r := range roads {
		u, v, t := r[0], r[1], r[2]
		adj[u] = append(adj[u], [2]int{v, t})
		adj[v] = append(adj[v], [2]int{u, t})
	}
	const INF = int64(1) << 60
	dist := make([]int64, n)
	ways := make([]int64, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[0] = 0
	ways[0] = 1 // exactly one way to be at the source: the empty path
	// min-heap of (dist, node)
	heap := make([][2]int64, 0, n)
	hpush := func(v [2]int64) {
		heap = append(heap, v)
		i := len(heap) - 1
		for i > 0 {
			p := (i - 1) / 2
			if heap[p][0] < heap[i][0] || (heap[p][0] == heap[i][0] && heap[p][1] <= heap[i][1]) {
				break
			}
			heap[p], heap[i] = heap[i], heap[p]
			i = p
		}
	}
	hpop := func() [2]int64 {
		top := heap[0]
		last := heap[len(heap)-1]
		heap = heap[:len(heap)-1]
		if len(heap) > 0 {
			heap[0] = last
			i := 0
			for {
				l := 2*i + 1
				r := l + 1
				s := i
				for _, c := range [2]int{l, r} {
					if c < len(heap) && (heap[c][0] < heap[s][0] || (heap[c][0] == heap[s][0] && heap[c][1] < heap[s][1])) {
						s = c
					}
				}
				if s == i {
					break
				}
				heap[s], heap[i] = heap[i], heap[s]
				i = s
			}
		}
		return top
	}
	hpush([2]int64{0, 0})
	for len(heap) > 0 {
		top := hpop()
		d, u := top[0], int(top[1])
		// Positive weights => u is finalized only after every shortest path into
		// it was relaxed, so ways[u] is complete at pop time; d > dist[u] just
		// discards a stale heap entry.
		if d > dist[u] {
			continue
		}
		for _, e := range adj[u] {
			v, t := e[0], int64(e[1])
			nd := d + t
			if nd < dist[v] {
				// Strictly shorter route: old path counts are obsolete, reset.
				dist[v] = nd
				ways[v] = ways[u]
				hpush([2]int64{nd, int64(v)})
			} else if nd == dist[v] {
				// Equally short route: extend the count, not the distance.
				ways[v] = (ways[v] + ways[u]) % MOD
			}
		}
	}
	return int(ways[n-1] % MOD)
}
