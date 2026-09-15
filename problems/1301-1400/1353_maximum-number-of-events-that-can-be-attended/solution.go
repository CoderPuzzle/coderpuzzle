import (
	"container/heap"
	"sort"
)

type minHeap []int

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func maxEvents(events [][]int) int {
	// Day sweep over events sorted by start day; a min-heap of end days
	// holds the events available today.
	sort.Slice(events, func(a, b int) bool {
		if events[a][0] != events[b][0] {
			return events[a][0] < events[b][0]
		}
		return events[a][1] < events[b][1]
	})
	n := len(events)
	i := 0
	day := 1
	attended := 0
	openEnds := &minHeap{}
	for i < n || openEnds.Len() > 0 {
		// Heap empty: skip idle days by jumping the clock straight to
		// the next event's start day.
		if openEnds.Len() == 0 {
			if events[i][0] > day {
				day = events[i][0]
			}
		}
		// Every event that has started becomes available today.
		for i < n && events[i][0] <= day {
			heap.Push(openEnds, events[i][1])
			i++
		}
		// Discard events whose end day already passed — lost regardless.
		for openEnds.Len() > 0 && (*openEnds)[0] < day {
			heap.Pop(openEnds)
		}
		// Attend the soonest-ending (most perishable) event; an exchange
		// argument shows swapping it in never breaks feasibility.
		if openEnds.Len() > 0 {
			heap.Pop(openEnds)
			attended++
		}
		day++
	}
	return attended
}
