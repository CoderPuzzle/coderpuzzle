import "container/heap"

type appleItem3928 struct {
	distance int64
	node     int
}

type appleHeap3928 []appleItem3928

func (h appleHeap3928) Len() int           { return len(h) }
func (h appleHeap3928) Less(i, j int) bool { return h[i].distance < h[j].distance }
func (h appleHeap3928) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *appleHeap3928) Push(x any)        { *h = append(*h, x.(appleItem3928)) }
func (h *appleHeap3928) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func minCost(n int, prices []int, roads [][]int) []int64 {
	type edge struct {
		to     int
		empty  int64
		loaded int64
	}
	graph := make([][]edge, n)
	for _, road := range roads {
		loaded := int64(road[2]) * int64(road[3])
		graph[road[0]] = append(graph[road[0]], edge{road[1], int64(road[2]), loaded})
		graph[road[1]] = append(graph[road[1]], edge{road[0], int64(road[2]), loaded})
	}
	dijkstra := func(start int, carrying bool) []int64 {
		const inf int64 = 1 << 62
		distance := make([]int64, n)
		for i := range distance {
			distance[i] = inf
		}
		distance[start] = 0
		queue := &appleHeap3928{{0, start}}
		heap.Init(queue)
		for queue.Len() > 0 {
			item := heap.Pop(queue).(appleItem3928)
			if item.distance != distance[item.node] {
				continue
			}
			for _, road := range graph[item.node] {
				weight := road.empty
				if carrying {
					weight = road.loaded
				}
				candidate := item.distance + weight
				if candidate < distance[road.to] {
					distance[road.to] = candidate
					heap.Push(queue, appleItem3928{candidate, road.to})
				}
			}
		}
		return distance
	}
	answer := make([]int64, n)
	for start := 0; start < n; start++ {
		emptyDistance := dijkstra(start, false)
		loadedDistance := dijkstra(start, true)
		answer[start] = 1 << 62
		for shop := 0; shop < n; shop++ {
			if emptyDistance[shop] == 1<<62 {
				continue
			}
			candidate := int64(prices[shop]) + emptyDistance[shop] + loadedDistance[shop]
			if candidate < answer[start] {
				answer[start] = candidate
			}
		}
	}
	return answer
}
