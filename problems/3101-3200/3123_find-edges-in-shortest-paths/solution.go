import "container/heap"

func findAnswer(n int, edges [][]int) []bool {
	adj := make([][][2]int, n)
	for _, e := range edges {
		u, v, w := e[0], e[1], e[2]
		adj[u] = append(adj[u], [2]int{v, w})
		adj[v] = append(adj[v], [2]int{u, w})
	}

	const inf = int64(1) << 62

	dijkstra := func(src int) []int64 {
		dist := make([]int64, n)
		for i := range dist {
			dist[i] = inf
		}
		dist[src] = 0
		h := &minHeap{{0, int64(src)}}
		for h.Len() > 0 {
			top := heap.Pop(h).([2]int64)
			d, u := top[0], int(top[1])
			// stale entry: dist[u] was improved after this was pushed
			if d != dist[u] {
				continue
			}
			for _, e := range adj[u] {
				v, w := e[0], int64(e[1])
				nd := d + w
				if nd < dist[v] {
					dist[v] = nd
					heap.Push(h, [2]int64{nd, int64(v)})
				}
			}
		}
		return dist
	}

	dist0 := dijkstra(0)
	distN := dijkstra(n - 1)
	// reference length every shortest 0 -> n-1 path must match
	total := dist0[n-1]

	ans := make([]bool, len(edges))
	// unreachable: no edge lies on a shortest path
	if total == inf {
		return ans
	}
	for i, e := range edges {
		u, v, w := e[0], e[1], int64(e[2])
		// on a shortest path iff d0(one end) + w + dN(other end) == total,
		// tested both ways since the undirected edge may be crossed either way
		if dist0[u]+w+distN[v] == total || dist0[v]+w+distN[u] == total {
			ans[i] = true
		}
	}
	return ans
}

type minHeap [][2]int64

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.([2]int64)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}
