import (
	"container/heap"
	"math"
)

// Live maximum over the piles, served by an explicit binary max-heap of
// int64 values; the replacement is floor(sqrt(value)) with the float
// guess corrected by exact integer squares.
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

// Live-maximum simulation: each second the richest pile shrinks to
// floor(sqrt(value)), which only ever lowers it; ties change nothing
// because any pick order yields the same multiset. The answer is bounded
// by 10^3 piles * 10^9 gifts = 10^12, so it needs 64 bits.
func pickGifts(gifts []int, k int) int64 {
	pq := &maxHeap{}
	for _, v := range gifts {
		*pq = append(*pq, int64(v))
	}
	heap.Init(pq)
	for s := 0; s < k; s++ {
		value := heap.Pop(pq).(int64)
		root := int64(math.Sqrt(float64(value)))
		for root*root > value {
			root--
		}
		for (root+1)*(root+1) <= value {
			root++
		}
		heap.Push(pq, root)
	}
	total := int64(0)
	for _, v := range *pq {
		total += v
	}
	return total
}
