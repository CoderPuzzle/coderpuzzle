import "container/heap"

func secondMinimum(n int, edges [][]int, time int, change int) int {
	graph := make([][]int, n+1)
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		graph[edge[1]] = append(graph[edge[1]], edge[0])
	}

	const infinity = int(^uint(0) >> 1)
	first := make([]int, n+1)
	second := make([]int, n+1)
	for vertex := 1; vertex <= n; vertex++ {
		first[vertex] = infinity
		second[vertex] = infinity
	}
	first[1] = 0
	pending := &minHeap{{0, 1}}

	for pending.Len() > 0 {
		top := heap.Pop(pending).([2]int)
		vertex := top[1]
		// stale entry: both slots improved after this was pushed
		if top[0] > second[vertex] {
			continue
		}
		nextDistance := top[0] + 1
		for _, neighbor := range graph[vertex] {
			if nextDistance < first[neighbor] {
				second[neighbor] = first[neighbor]
				first[neighbor] = nextDistance
				heap.Push(pending, [2]int{nextDistance, neighbor})
			} else if first[neighbor] < nextDistance && nextDistance < second[neighbor] {
				second[neighbor] = nextDistance
				heap.Push(pending, [2]int{nextDistance, neighbor})
			}
		}
	}

	elapsed := int64(0)
	edgeTime := int64(time)
	signalChange := int64(change)
	for step := 0; step < second[n]; step++ {
		if (elapsed/signalChange)%2 == 1 {
			elapsed = (elapsed/signalChange + 1) * signalChange
		}
		elapsed += edgeTime
	}
	return int(elapsed)
}

type minHeap [][2]int

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}
