import "container/heap"

type maxHeap [][2]int

func (h maxHeap) Len() int            { return len(h) }
func (h maxHeap) Less(i, j int) bool  { return h[i][0] > h[j][0] }
func (h maxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *maxHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *maxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func maxSlidingWindow(nums []int, k int) []int {
	h := &maxHeap{}
	result := make([]int, 0, len(nums)-k+1)
	for i, value := range nums {
		heap.Push(h, [2]int{value, i})
		// Lazy deletion: pop records whose index has slid out of the window.
		for (*h)[0][1] <= i-k {
			heap.Pop(h)
		}
		// The top is now the largest value still inside the window.
		if i >= k-1 {
			result = append(result, (*h)[0][0])
		}
	}
	return result
}
