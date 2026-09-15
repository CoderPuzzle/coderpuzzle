import (
	"container/heap"
)

// Live maximum over the array served by an explicit binary max-heap of
// int64 replacements; the ceil division is the standard (v + 2) / 3.
type maxHeap []int64

func (h *maxHeap) Len() int           { return len(*h) }
func (h *maxHeap) Less(i, j int) bool { return (*h)[i] > (*h)[j] }
func (h *maxHeap) Swap(i, j int)      { (*h)[i], (*h)[j] = (*h)[j], (*h)[i] }
func (h *maxHeap) Push(x any)         { *h = append(*h, x.(int64)) }

func (h *maxHeap) Pop() any {
	old := *h
	n := len(old)
	value := old[n-1]
	*h = old[:n-1]
	return value
}

// Greedy on the live maximum: picking anything other than the largest
// element both gains less now and leaves that giant intact, so swapping
// the order never helps. Score fits 64 bits at k*10^9.
func maxKelements(nums []int, k int) int64 {
	pq := &maxHeap{}
	for _, v := range nums {
		*pq = append(*pq, int64(v))
	}
	heap.Init(pq)
	score := int64(0)
	for op := 0; op < k; op++ {
		value := heap.Pop(pq).(int64)
		score += value
		heap.Push(pq, (value+2)/3)
	}
	return score
}
