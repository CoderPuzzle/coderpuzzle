import "container/heap"

type dijkItem struct {
	dist int64
	node int
}

type dijkHeap []dijkItem

func (h dijkHeap) Len() int            { return len(h) }
func (h dijkHeap) Less(i, j int) bool  { return h[i].dist < h[j].dist }
func (h dijkHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *dijkHeap) Push(x interface{}) { *h = append(*h, x.(dijkItem)) }
func (h *dijkHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type edge2473 struct {
	to, w int
}

func minCost(n int, roads [][]int, appleCost []int, k int) []int {
	adj := make([][]edge2473, n+1)
	for _, r := range roads {
		adj[r[0]] = append(adj[r[0]], edge2473{r[1], r[2]})
		adj[r[1]] = append(adj[r[1]], edge2473{r[0], r[2]})
	}

	const inf = int64(1) << 62
	answer := make([]int, n)
	// A trip is: reach j, buy, retrace. Any cheaper return path would
	// also be a cheaper outbound path, so the total is
	// appleCost[j] + (k+1)*d(j) with d = shortest distance from start.
	for start := 1; start <= n; start++ {
		// Dijkstra needs the strictly positive road weights; a popped
		// entry older than dist[top.node] is stale (lazy deletion).
		dist := make([]int64, n+1)
		for i := range dist {
			dist[i] = inf
		}
		dist[start] = 0
		h := &dijkHeap{{0, start}}
		for h.Len() > 0 {
			top := heap.Pop(h).(dijkItem)
			if top.dist > dist[top.node] {
				continue
			}
			for _, e := range adj[top.node] {
				nd := top.dist + int64(e.w)
				if nd < dist[e.to] {
					dist[e.to] = nd
					heap.Push(h, dijkItem{nd, e.to})
				}
			}
		}
		// j = start contributes d = 0, so buying locally is always a
		// candidate.
		var best int64 = inf
		for j := 1; j <= n; j++ {
			total := int64(appleCost[j-1]) + int64(k+1)*dist[j]
			if total < best {
				best = total
			}
		}
		answer[start-1] = int(best)
	}
	return answer
}
