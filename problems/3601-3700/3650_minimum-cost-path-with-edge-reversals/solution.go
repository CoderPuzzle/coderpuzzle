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

func minCost(n int, edges [][]int) int {
	type arc struct {
		to     int
		weight int
	}
	// Every edge (u, v, w) also contributes the single-move reversal v -> u
	// at 2 * w: standing at v, flip v's unused switch on the incoming edge
	// u -> v. Weights are positive, so an optimal trip is a simple path and
	// flips at most one switch per node anyway.
	graph := make([][]arc, n)
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], arc{edge[1], edge[2]})
		graph[edge[1]] = append(graph[edge[1]], arc{edge[0], 2 * edge[2]})
	}

	// Dijkstra from node 0; weights are positive, so each pop finalizes.
	const infinity int64 = 1 << 62
	distances := make([]int64, n)
	for node := range distances {
		distances[node] = infinity
	}
	distances[0] = 0
	queue := &minHeap{{0, 0}}
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

	// An unreached target keeps the infinity sentinel.
	if distances[n-1] == infinity {
		return -1
	}
	return int(distances[n-1])
}
