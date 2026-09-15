import (
	"container/heap"
	"sort"
)

type distItem struct {
	d    int64
	node int
}

type distHeap []distItem

func (h distHeap) Len() int            { return len(h) }
func (h distHeap) Less(i, j int) bool  { return h[i].d < h[j].d }
func (h distHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *distHeap) Push(x interface{}) { *h = append(*h, x.(distItem)) }
func (h *distHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func countRestrictedPaths(n int, edges [][]int) int {
	// Dijkstra from node n fixes dist[x] = distanceToLastNode(x). A
	// restricted path strictly decreases that distance at every step, so
	// visiting nodes in increasing distance order makes every count final:
	// each strictly-closer neighbor of u was visited before u. Distances
	// reach ~2*10^9 (n-1 edges of weight 10^5), so they are int64.
	const MOD = 1000000007
	const INF = int64(1) << 62
	adj := make([][][2]int, n+1)
	for _, e := range edges {
		u, v, w := e[0], e[1], e[2]
		adj[u] = append(adj[u], [2]int{v, w})
		adj[v] = append(adj[v], [2]int{u, w})
	}
	dist := make([]int64, n+1)
	for i := range dist {
		dist[i] = INF
	}
	dist[n] = 0
	h := &distHeap{}
	heap.Push(h, distItem{0, n})
	for h.Len() > 0 {
		top := heap.Pop(h).(distItem)
		if top.d > dist[top.node] {
			continue
		}
		for _, e := range adj[top.node] {
			nd := top.d + int64(e[1])
			if nd < dist[e[0]] {
				dist[e[0]] = nd
				heap.Push(h, distItem{nd, e[0]})
			}
		}
	}
	order := make([]int, n)
	for i := range order {
		order[i] = i + 1
	}
	sort.Slice(order, func(a, b int) bool { return dist[order[a]] < dist[order[b]] })
	count := make([]int64, n+1)
	count[n] = 1
	for _, u := range order {
		if u == n {
			continue
		}
		var total int64
		for _, e := range adj[u] {
			if dist[u] > dist[e[0]] {
				total += count[e[0]]
			}
		}
		count[u] = total % MOD
	}
	return int(count[1])
}
