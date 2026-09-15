import "container/heap"

type minHeap []int64

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(int64)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func minOperations(nums []int, k int) int {
	h := &minHeap{}
	for _, x := range nums {
		*h = append(*h, int64(x))
	}
	heap.Init(h)
	operations := 0
	// Each operation must consume the two smallest values, so the process
	// is fully deterministic once the array sits in a min-heap.
	// Done when the minimum reaches k (then every element has) or fewer
	// than two elements remain.
	for h.Len() >= 2 && (*h)[0] < int64(k) {
		x := heap.Pop(h).(int64)
		y := heap.Pop(h).(int64)
		// x is the smaller pop by heap order, so this is min*2 + max.
		heap.Push(h, x*2+y)
		operations++
	}
	return operations
}
