import "container/heap"

// Dijkstra from node 0 with one extra rule: arriving at or after a node's
// disappearance instant means it was never visited, so such a settlement
// propagates nothing onward either. Every settled distance is < 10^5 and
// every pushed candidate < 2 * 10^5, so ints carry everything.
type item struct{ d, u int }

type minHeap []item

func (h minHeap) Len() int { return len(h) }
func (h minHeap) Less(i, j int) bool {
	if h[i].d != h[j].d {
		return h[i].d < h[j].d
	}
	return h[i].u < h[j].u
}
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(item)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	it := old[n-1]
	*h = old[:n-1]
	return it
}

func minimumTime(n int, edges [][]int, disappear []int) []int {
	adj := make([][][2]int, n)
	for _, e := range edges {
		u, v, w := e[0], e[1], e[2]
		adj[u] = append(adj[u], [2]int{v, w})
		adj[v] = append(adj[v], [2]int{u, w})
	}
	const big = 1 << 29
	dist := make([]int, n)
	for i := range dist {
		dist[i] = big
	}
	h := &minHeap{}
	heap.Init(h)
	dist[0] = 0
	heap.Push(h, item{0, 0})
	for h.Len() > 0 {
		top := heap.Pop(h).(item)
		d, u := top.d, top.u
		if d != dist[u] {
			continue // stale entry
		}
		if d >= disappear[u] {
			continue // gone on arrival; cannot be visited
		}
		for _, vw := range adj[u] {
			if d+vw[1] < dist[vw[0]] {
				dist[vw[0]] = d + vw[1]
				heap.Push(h, item{d + vw[1], vw[0]})
			}
		}
	}
	answer := make([]int, n)
	for i := range answer {
		if dist[i] < disappear[i] {
			answer[i] = dist[i]
		} else {
			answer[i] = -1
		}
	}
	return answer
}
