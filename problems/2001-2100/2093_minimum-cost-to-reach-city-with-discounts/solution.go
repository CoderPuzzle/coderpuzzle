import "container/heap"

type discountState struct {
	cost int64
	city int
	used int
}

type discountHeap []discountState

func (h discountHeap) Len() int           { return len(h) }
func (h discountHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h discountHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *discountHeap) Push(value interface{}) {
	*h = append(*h, value.(discountState))
}
func (h *discountHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func minimumCost(n int, highways [][]int, discounts int) int {
	type edge struct {
		city int
		toll int
	}
	graph := make([][]edge, n)
	for _, highway := range highways {
		graph[highway[0]] = append(graph[highway[0]], edge{highway[1], highway[2]})
		graph[highway[1]] = append(graph[highway[1]], edge{highway[0], highway[2]})
	}

	const infinity int64 = 1 << 62
	distances := make([][]int64, n)
	for city := range distances {
		distances[city] = make([]int64, discounts+1)
		for used := range distances[city] {
			distances[city][used] = infinity
		}
	}
	distances[0][0] = 0
	queue := &discountHeap{{0, 0, 0}}
	heap.Init(queue)
	for queue.Len() > 0 {
		state := heap.Pop(queue).(discountState)
		if state.cost != distances[state.city][state.used] {
			continue
		}
		if state.city == n-1 {
			return int(state.cost)
		}
		for _, next := range graph[state.city] {
			fullCost := state.cost + int64(next.toll)
			if fullCost < distances[next.city][state.used] {
				distances[next.city][state.used] = fullCost
				heap.Push(queue, discountState{fullCost, next.city, state.used})
			}
			if state.used < discounts {
				discountedCost := state.cost + int64(next.toll/2)
				if discountedCost < distances[next.city][state.used+1] {
					distances[next.city][state.used+1] = discountedCost
					heap.Push(queue, discountState{discountedCost, next.city, state.used + 1})
				}
			}
		}
	}
	return -1
}
