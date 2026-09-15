import "container/heap"

type queueEntry struct {
	distance int64
	node     int
}

type minHeap []queueEntry

func (h minHeap) Len() int           { return len(h) }
func (h minHeap) Less(i, j int) bool { return h[i].distance < h[j].distance }
func (h minHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(value interface{}) {
	*h = append(*h, value.(queueEntry))
}
func (h *minHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func minimumDistance(n int, edges [][]int, s int, marked []int) int64 {
	type edge struct {
		to     int
		weight int
	}
	// Adjacency lists over DIRECTED edges: u -> v only, never the reverse.
	// Parallel edges both enter the list; relaxation keeps the cheaper one.
	graph := make([][]edge, n)
	for _, link := range edges {
		graph[link[0]] = append(graph[link[0]], edge{link[1], link[2]})
	}

	// Dijkstra from s; weights are positive, so each pop finalizes its node.
	const infinity int64 = 1 << 62
	distances := make([]int64, n)
	for node := range distances {
		distances[node] = infinity
	}
	distances[s] = 0
	queue := &minHeap{{0, s}}
	heap.Init(queue)
	for queue.Len() > 0 {
		current := heap.Pop(queue).(queueEntry)
		if current.distance != distances[current.node] {
			continue // stale entry; the node was finalized earlier
		}
		for _, next := range graph[current.node] {
			if candidate := current.distance + int64(next.weight); candidate < distances[next.to] {
				distances[next.to] = candidate
				heap.Push(queue, queueEntry{candidate, next.to})
			}
		}
	}

	// The answer is the closest marked node; unreachable ones stay at infinity.
	best := infinity
	for _, node := range marked {
		if distances[node] < best {
			best = distances[node]
		}
	}
	if best == infinity {
		return -1
	}
	return best
}
