import "container/heap"

type minHeap []int

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func findKthLargest(nums []int, k int) int {
	// A min-heap of size k holds the k largest values seen so far; its
	// root is the smallest of them — the current kth largest.
	h := &minHeap{}
	for i := 0; i < k; i++ {
		*h = append(*h, nums[i])
	}
	heap.Init(h)
	for i := k; i < len(nums); i++ {
		// Peek first: only values strictly greater than the root earn
		// a pop-and-push, keeping the pass O(n log k).
		if nums[i] > (*h)[0] {
			heap.Pop(h)
			heap.Push(h, nums[i])
		}
	}
	// When the scan ends the root is the smallest of the top k — the
	// kth largest by rank, duplicates counted.
	return (*h)[0]
}
