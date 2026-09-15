import "container/heap"

type timeItem struct {
	t    int64
	node int
}

type timeHeap []timeItem

func (h timeHeap) Len() int            { return len(h) }
func (h timeHeap) Less(i, j int) bool  { return h[i].t < h[j].t }
func (h timeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *timeHeap) Push(x interface{}) { *h = append(*h, x.(timeItem)) }
func (h *timeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func minTime(n int, edges [][]int) int {
	// Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
	// standing on u. Waiting is always allowed, so an edge leaving u at
	// time t departs at max(t, start) — never later, because a later
	// departure only arrives later — provided that moment still lies
	// inside the edge's window. Times are held as int64.
	const INF = int64(1) << 62
	type edge struct {
		v, start, end int
	}
	adj := make([][]edge, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], edge{e[1], e[2], e[3]})
	}
	dist := make([]int64, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[0] = 0
	h := &timeHeap{}
	heap.Push(h, timeItem{0, 0})
	for h.Len() > 0 {
		top := heap.Pop(h).(timeItem)
		if top.t > dist[top.node] {
			continue
		}
		for _, e := range adj[top.node] {
			depart := top.t
			if int64(e.start) > depart {
				depart = int64(e.start)
			}
			if depart <= int64(e.end) {
				arrive := depart + 1
				if arrive < dist[e.v] {
					dist[e.v] = arrive
					heap.Push(h, timeItem{arrive, e.v})
				}
			}
		}
	}
	if dist[n-1] == INF {
		return -1
	}
	return int(dist[n-1])
}
