import "container/heap"

type minHeap []int64

func (h minHeap) Len() int           { return len(h) }
func (h minHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(value any)    { *h = append(*h, value.(int64)) }
func (h *minHeap) Pop() any {
	old := *h
	value := old[len(old)-1]
	*h = old[:len(old)-1]
	return value
}

func maximumProduct(nums []int, k int) int {
	minHeap := &minHeap{}
	for _, value := range nums {
		*minHeap = append(*minHeap, int64(value))
	}
	heap.Init(minHeap)
	for i := 0; i < k; i++ {
		(*minHeap)[0]++
		heap.Fix(minHeap, 0)
	}
	product := int64(1)
	for _, value := range *minHeap {
		product = product * value % 1_000_000_007
	}
	return int(product)
}
