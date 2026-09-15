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

func minStoneSum(piles []int, k int) int {
	// Max-heap. The removal floor(p/2) is non-decreasing in p, so always
	// halving the current max is optimal: any operation on a smaller pile
	// could be swapped to the larger one without worsening the total.
	h := make(maxHeap, len(piles))
	copy(h, piles)
	heap.Init(&h)
	for i := 0; i < k; i++ {
		top := h[0]
		if top == 1 {
			break // floor(1/2) removes nothing: remaining ops are no-ops
		}
		// Replace the root with the half that remains and re-sift in place.
		h[0] = top - top/2
		heap.Fix(&h, 0)
	}
	total := 0
	for _, p := range h {
		total += p
	}
	return total
}
