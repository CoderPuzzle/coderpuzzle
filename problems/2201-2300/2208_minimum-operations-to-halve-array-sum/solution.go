import "container/heap"

type maxHeap []float64

func (h maxHeap) Len() int           { return len(h) }
func (h maxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h maxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *maxHeap) Push(x any)        { *h = append(*h, x.(float64)) }
func (h *maxHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func halveArray(nums []int) int {
	h := &maxHeap{}
	total := 0.0
	for _, x := range nums {
		*h = append(*h, float64(x))
		total += float64(x)
	}
	heap.Init(h)
	// track the remaining reduction needed instead of re-summing each step
	target := total / 2
	ops := 0
	for target > 0 {
		// greedy: halving the current maximum removes the most sum per op
		largest := heap.Pop(h).(float64)
		half := largest / 2
		target -= half
		// the half may still be the max and get halved again
		heap.Push(h, half)
		ops++
	}
	return ops
}
