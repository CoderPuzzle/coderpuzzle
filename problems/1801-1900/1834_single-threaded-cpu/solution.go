import (
	"container/heap"
	"sort"
)

// taskHeap is a min-heap of [processingTime, index] pairs.
type taskHeap [][2]int

func (h taskHeap) Len() int { return len(h) }
func (h taskHeap) Less(i, j int) bool {
	if h[i][0] != h[j][0] {
		return h[i][0] < h[j][0]
	}
	return h[i][1] < h[j][1]
}
func (h taskHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *taskHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *taskHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func getOrder(tasks [][]int) []int {
	n := len(tasks)
	byEnqueue := make([]int, n)
	for i := range byEnqueue {
		byEnqueue[i] = i
	}
	// Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
	sort.Slice(byEnqueue, func(a, b int) bool {
		ra, rb := byEnqueue[a], byEnqueue[b]
		if tasks[ra][0] != tasks[rb][0] {
			return tasks[ra][0] < tasks[rb][0]
		}
		return ra < rb
	})
	h := &taskHeap{}
	heap.Init(h)
	order := make([]int, 0, n)
	time := 0
	i := 0
	for i < n || h.Len() > 0 {
		if h.Len() == 0 {
			// CPU idle: jump straight to the next arrival instead of ticking.
			enq := tasks[byEnqueue[i]][0]
			if enq > time {
				time = enq
			}
		}
		// Enqueue everything available at this instant BEFORE popping, so all
		// contenders compete under the same (processingTime, index) order.
		for i < n && tasks[byEnqueue[i]][0] <= time {
			j := byEnqueue[i]
			heap.Push(h, [2]int{tasks[j][1], j})
			i++
		}
		top := heap.Pop(h).([2]int) // winner: shortest processing time, smallest index on ties
		order = append(order, top[1])
		time += top[0] // clock advances by exactly the winner's duration
	}
	return order
}
