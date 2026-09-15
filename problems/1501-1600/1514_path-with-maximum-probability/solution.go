import "container/heap"

type probEdge struct {
	node        int
	probability float64
}

// probHeap is a max-heap of (probability, node) pairs, highest probability first.
type probHeap []probEdge

func (h probHeap) Len() int            { return len(h) }
func (h probHeap) Less(i, j int) bool  { return h[i].probability > h[j].probability }
func (h probHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *probHeap) Push(x interface{}) { *h = append(*h, x.(probEdge)) }
func (h *probHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
	adjacency := make([][]probEdge, n)
	for i, edge := range edges {
		a, b := edge[0], edge[1]
		probability := succProb[i]
		adjacency[a] = append(adjacency[a], probEdge{b, probability})
		adjacency[b] = append(adjacency[b], probEdge{a, probability})
	}

	best := make([]float64, n)
	best[start_node] = 1.0
	visited := make([]bool, n)

	h := &probHeap{{start_node, 1.0}}
	for h.Len() > 0 {
		top := heap.Pop(h).(probEdge)
		node, probability := top.node, top.probability
		if visited[node] {
			continue
		}
		visited[node] = true
		if node == end_node {
			return probability
		}
		for _, edge := range adjacency[node] {
			candidate := probability * edge.probability
			if candidate > best[edge.node] {
				best[edge.node] = candidate
				heap.Push(h, probEdge{edge.node, candidate})
			}
		}
	}
	return best[end_node]
}
