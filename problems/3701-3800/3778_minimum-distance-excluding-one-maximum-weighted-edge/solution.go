import "container/heap"

type excludeState struct {
	dist int64
	node int
	used int
}

// excludeHeap is a min-heap of states ordered by distance, smallest first.
type excludeHeap []excludeState

func (h excludeHeap) Len() int            { return len(h) }
func (h excludeHeap) Less(i, j int) bool  { return h[i].dist < h[j].dist }
func (h excludeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *excludeHeap) Push(x interface{}) { *h = append(*h, x.(excludeState)) }
func (h *excludeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minCostExcludingMax(n int, edges [][]int) int64 {
	// Excluding the first maximum-weight edge of a path equals excluding
	// any one designated edge (both give sum - maxweight), so Dijkstra
	// runs over states (node, excluded): staying in a layer pays the edge
	// weight, crossing layers excludes exactly one edge for free. A path
	// cost can reach (n - 1) * 5 * 10^4 ~ 2.5 * 10^9, past 32 bits, so
	// distances ride in int64.
	const inf int64 = 1 << 62
	adjacency := make([][]struct {
		node   int
		weight int64
	}, n)
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], struct {
			node   int
			weight int64
		}{edge[1], int64(edge[2])})
		adjacency[edge[1]] = append(adjacency[edge[1]], struct {
			node   int
			weight int64
		}{edge[0], int64(edge[2])})
	}
	best := make([][2]int64, n)
	for v := range best {
		best[v][0] = inf
		best[v][1] = inf
	}
	best[0][0] = 0

	h := &excludeHeap{{0, 0, 0}}
	for h.Len() > 0 {
		top := heap.Pop(h).(excludeState)
		if top.dist > best[top.node][top.used] {
			continue
		}
		if top.node == n-1 && top.used == 1 {
			return top.dist
		}
		for _, end := range adjacency[top.node] {
			if candidate := top.dist + end.weight; candidate < best[end.node][top.used] {
				best[end.node][top.used] = candidate
				heap.Push(h, excludeState{candidate, end.node, top.used})
			}
			if top.used == 0 && top.dist < best[end.node][1] {
				best[end.node][1] = top.dist
				heap.Push(h, excludeState{top.dist, end.node, 1})
			}
		}
	}
	panic("unreachable: the graph is connected")
}
