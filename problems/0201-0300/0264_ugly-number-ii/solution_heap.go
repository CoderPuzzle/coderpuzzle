import (
	"container/heap"
)

// A min-heap of int64: the frontier of the ugly-number generation process.
type uglyHeap []int64

func (h uglyHeap) Len() int           { return len(h) }
func (h uglyHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h uglyHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *uglyHeap) Push(x any) { *h = append(*h, x.(int64)) }

func (h *uglyHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func nthUglyNumber(n int) int {
	// Seeded with 1, the heap top is always the smallest not-yet-emitted
	// ugly number. 64-bit elements: pushed multiples can overshoot int32.
	h := &uglyHeap{1}
	// The heap is a frontier, not a set: pushing every successor would
	// enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
	seen := map[int64]bool{1: true}
	for i := 1; i < n; i++ {
		value := heap.Pop(h).(int64)
		for _, factor := range []int64{2, 3, 5} {
			multiple := value * factor
			if !seen[multiple] {
				seen[multiple] = true
				heap.Push(h, multiple)
			}
		}
	}
	// After n-1 pops the heap top is the n-th ugly number in order.
	return int((*h)[0])
}
