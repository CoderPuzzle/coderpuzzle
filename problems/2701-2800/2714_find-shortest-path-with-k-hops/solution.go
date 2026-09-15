import "container/heap"

type hopState struct {
	dist int
	node int
	hops int
}

type edgeEnd struct {
	node   int
	weight int
}

// hopHeap is a min-heap of states ordered by distance, smallest first.
type hopHeap []hopState

func (h hopHeap) Len() int            { return len(h) }
func (h hopHeap) Less(i, j int) bool  { return h[i].dist < h[j].dist }
func (h hopHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *hopHeap) Push(x interface{}) { *h = append(*h, x.(hopState)) }
func (h *hopHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func shortestPathWithHops(n int, edges [][]int, s int, d int, k int) int {
	// Dijkstra over states (node, hops used): staying in a layer pays the
	// edge weight, a hop crosses into the next layer for free; node d pops
	// at the minimum over every way of spending at most k free edges.
	adjacency := make([][]edgeEnd, n)
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], edgeEnd{edge[1], edge[2]})
		adjacency[edge[1]] = append(adjacency[edge[1]], edgeEnd{edge[0], edge[2]})
	}
	inf := int(^uint(0) >> 1)
	best := make([][]int, n)
	for v := range best {
		best[v] = make([]int, k+1)
		for c := range best[v] {
			best[v][c] = inf
		}
	}
	best[s][0] = 0

	h := &hopHeap{{0, s, 0}}
	for h.Len() > 0 {
		top := heap.Pop(h).(hopState)
		if top.dist > best[top.node][top.hops] {
			continue
		}
		if top.node == d {
			return top.dist
		}
		for _, end := range adjacency[top.node] {
			candidate := top.dist + end.weight
			if candidate < best[end.node][top.hops] {
				best[end.node][top.hops] = candidate
				heap.Push(h, hopState{candidate, end.node, top.hops})
			}
			if top.hops < k && top.dist < best[end.node][top.hops+1] {
				best[end.node][top.hops+1] = top.dist
				heap.Push(h, hopState{top.dist, end.node, top.hops + 1})
			}
		}
	}
	panic("unreachable: the graph is connected")
}
