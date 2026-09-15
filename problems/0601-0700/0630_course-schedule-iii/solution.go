import (
	"container/heap"
	"sort"
)

type durationHeap []int

func (h durationHeap) Len() int            { return len(h) }
func (h durationHeap) Less(a, b int) bool  { return h[a] < h[b] }
func (h durationHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *durationHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *durationHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func scheduleCourse(courses [][]int) int {
	sort.Slice(courses, func(a, b int) bool { return courses[a][1] < courses[b][1] })
	h := &durationHeap{} // min-heap of negated durations == max-heap of durations
	total := 0
	for _, course := range courses {
		duration, lastDay := course[0], course[1]
		if total+duration <= lastDay {
			total += duration
			heap.Push(h, -duration)
		} else if h.Len() > 0 && -(*h)[0] > duration {
			total += duration + (*h)[0] // (*h)[0] is negative
			(*h)[0] = -duration
			heap.Fix(h, 0)
		}
	}
	return h.Len()
}
