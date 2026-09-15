import "container/heap"

type maxHeap []int

func (h maxHeap) Len() int            { return len(h) }
func (h maxHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h maxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *maxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *maxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type coolRun struct {
	free  int
	count int
}

func leastInterval(tasks []string, n int) int {
	counts := make(map[string]int)
	for _, t := range tasks {
		counts[t]++
	}
	// Max-heap of remaining counts for labels free to run right now; only the
	// counts matter, because the cooldown rule treats every label alike.
	ready := &maxHeap{}
	for _, c := range counts {
		*ready = append(*ready, c)
	}
	heap.Init(ready)
	// FIFO of runs still cooling. Free slots arrive in order, so popping from
	// the front suffices.
	var cooling []coolRun
	time := 0
	for ready.Len() > 0 || len(cooling) > 0 {
		// Release everything whose cooldown has expired by now.
		for len(cooling) > 0 && cooling[0].free <= time {
			heap.Push(ready, cooling[0].count)
			cooling = cooling[1:]
		}
		if ready.Len() == 0 {
			// Nothing can run: jump the clock straight to the next release
			// instead of counting idle slots one by one.
			time = cooling[0].free
			continue
		}
		// Run one job of the largest remaining count.
		top := heap.Pop(ready).(int)
		if top > 1 {
			cooling = append(cooling, coolRun{time + n + 1, top - 1})
		}
		time++
	}
	return time
}
