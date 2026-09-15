import "container/heap"

type distHeap [][2]int

func (h distHeap) Len() int            { return len(h) }
func (h distHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h distHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *distHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *distHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func findTheCity(n int, edges [][]int, distanceThreshold int) int {
	// Mirror each undirected edge both ways, so every node can run its own
	// Dijkstra over the adjacency list and pay only for real edges.
	adj := make([][][2]int, n)
	for _, e := range edges {
		a, b, w := e[0], e[1], e[2]
		adj[a] = append(adj[a], [2]int{b, w})
		adj[b] = append(adj[b], [2]int{a, w})
	}
	const inf = 1 << 30
	counts := make([]int, n)
	h := &distHeap{}
	for src := 0; src < n; src++ {
		// Dijkstra from src: with positive weights the smallest tentative pop
		// is already final, so every node settles exactly once.
		dist := make([]int, n)
		for i := range dist {
			dist[i] = inf
		}
		dist[src] = 0
		heap.Push(h, [2]int{0, src})
		for h.Len() > 0 {
			top := heap.Pop(h).([2]int)
			d, u := top[0], top[1]
			// Stale-entry guard: skip outdated heap records.
			if d > dist[u] {
				continue
			}
			for _, e := range adj[u] {
				v, w := e[0], e[1]
				// Relax only when the route strictly improves.
				if d+w < dist[v] {
					dist[v] = d + w
					heap.Push(h, [2]int{d + w, v})
				}
			}
		}
		count := 0
		for v := 0; v < n; v++ {
			if v != src && dist[v] <= distanceThreshold {
				count++
			}
		}
		counts[src] = count
	}
	// Ascending scan with a strictly-smaller count (or equal count at a
	// larger index) implements the tie-break: greatest city number wins.
	bestCity, bestCount := -1, inf
	for i := 0; i < n; i++ {
		count := counts[i]
		if count < bestCount || (count == bestCount && i > bestCity) {
			bestCity, bestCount = i, count
		}
	}
	return bestCity
}
