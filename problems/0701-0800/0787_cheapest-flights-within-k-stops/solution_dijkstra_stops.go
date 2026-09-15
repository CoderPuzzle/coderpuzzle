import "container/heap"

type stopHeap [][3]int

func (h stopHeap) Len() int            { return len(h) }
func (h stopHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h stopHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *stopHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *stopHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	graph := make([][][2]int, n)
	for _, flight := range flights {
		graph[flight[0]] = append(graph[flight[0]], [2]int{flight[1], flight[2]})
	}
	const inf = int(^uint(0) >> 1)
	// State = (cost, node, flights taken). Carrying the count in the state
	// is what enforces the limit: a state that already used its k+1 flights
	// is never allowed to board another.
	h := &stopHeap{}
	heap.Push(h, [3]int{0, src, 0})
	best := make([]int, n)
	for i := range best {
		best[i] = inf
	}
	for h.Len() > 0 {
		top := heap.Pop(h).([3]int)
		cost, node, edges := top[0], top[1], top[2]
		// The heap pops in cost order, so the first dst pop is final.
		if node == dst {
			return cost
		}
		// Dominance prune: a cheaper state that used no more flights was
		// already expanded here, so this one cannot lead anywhere new.
		if edges > best[node] {
			continue
		}
		best[node] = edges
		if edges < k+1 {
			for _, e := range graph[node] {
				heap.Push(h, [3]int{cost + e[1], e[0], edges + 1})
			}
		}
	}
	return -1
}
