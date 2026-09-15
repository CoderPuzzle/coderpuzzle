import "container/heap"

type nodeHeap [][2]int

func (h nodeHeap) Len() int            { return len(h) }
func (h nodeHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h nodeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *nodeHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *nodeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func networkDelayTime(times [][]int, n int, k int) int {
	graph := make([][][2]int, n+1)
	for _, t := range times {
		graph[t[0]] = append(graph[t[0]], [2]int{t[1], t[2]})
	}

	dist := make([]int, n+1) // -1 marks nodes not settled yet
	for i := range dist {
		dist[i] = -1
	}
	h := &nodeHeap{}
	heap.Push(h, [2]int{0, k})
	for h.Len() > 0 {
		top := heap.Pop(h).([2]int)
		d, u := top[0], top[1]
		// Lazy stale-entry handling: skip nodes settled by an earlier pop.
		if dist[u] != -1 {
			continue
		}
		// Non-negative weights make the first pop the true shortest
		// distance, so u is final now and never revisited.
		dist[u] = d
		for _, e := range graph[u] {
			if dist[e[0]] == -1 {
				heap.Push(h, [2]int{d + e[1], e[0]})
			}
		}
	}

	// Any node still unsettled is unreachable from k; otherwise the last
	// node to hear the signal sets the answer.
	best := -1
	for i := 1; i <= n; i++ {
		if dist[i] == -1 {
			return -1
		}
		if dist[i] > best {
			best = dist[i]
		}
	}
	return best
}
