import "container/heap"

type heapItem struct {
	distance int64
	node     int
}

// minHeap orders (distance, node) pairs by ascending distance.
type minHeap []heapItem

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i].distance < h[j].distance }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(heapItem)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type link struct {
	node      int
	edgeIndex int
}

func modifiedGraphEdges(n int, edges [][]int, source int, destination int, target int) [][]int {
	count := len(edges)
	const infinity = int64(1) << 60

	// Weights <= 0 are skipped, so passing the raw list treats every -1
	// edge as absent, while passing the working copy gives the current
	// assignment.
	dijkstra := func(weights []int64, start int) []int64 {
		graph := make([][]link, n)
		for index := 0; index < count; index++ {
			if weights[index] <= 0 {
				continue
			}
			a, b := edges[index][0], edges[index][1]
			graph[a] = append(graph[a], link{b, index})
			graph[b] = append(graph[b], link{a, index})
		}

		distance := make([]int64, n)
		for node := range distance {
			distance[node] = infinity
		}
		distance[start] = 0

		pending := &minHeap{{0, start}}
		for pending.Len() > 0 {
			top := heap.Pop(pending).(heapItem)
			dist, node := top.distance, top.node
			if dist > distance[node] {
				continue
			}
			for _, candidate := range graph[node] {
				next := dist + weights[candidate.edgeIndex]
				if next < distance[candidate.node] {
					distance[candidate.node] = next
					heap.Push(pending, heapItem{next, candidate.node})
				}
			}
		}
		return distance
	}

	untouched := make([]int64, count)
	for index := 0; index < count; index++ {
		untouched[index] = int64(edges[index][2])
	}
	if dijkstra(untouched, source)[destination] < int64(target) {
		return [][]int{}
	}

	weights := make([]int64, count)
	for index := 0; index < count; index++ {
		if untouched[index] > 0 {
			weights[index] = untouched[index]
		} else {
			weights[index] = 1
		}
	}
	if dijkstra(weights, source)[destination] > int64(target) {
		return [][]int{}
	}

	for {
		distances := dijkstra(weights, source)
		current := distances[destination]
		if current == int64(target) {
			break
		}

		reverse := dijkstra(weights, destination)
		deficit := int64(target) - current
		bestIndex, bestKey := -1, infinity
		for index := 0; index < count; index++ {
			if untouched[index] != -1 {
				continue
			}
			u, v := edges[index][0], edges[index][1]
			forward := distances[u]+weights[index]+reverse[v] == current
			backward := distances[v]+weights[index]+reverse[u] == current
			if !forward && !backward {
				continue
			}
			key := distances[u]
			if backward && (!forward || distances[v] < key) {
				key = distances[v]
			}
			if key < bestKey {
				bestKey = key
				bestIndex = index
			}
		}
		weights[bestIndex] += deficit
	}

	answer := make([][]int, count)
	for index := 0; index < count; index++ {
		answer[index] = []int{edges[index][0], edges[index][1], int(weights[index])}
	}
	return answer
}
