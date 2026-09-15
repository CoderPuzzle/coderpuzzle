import "container/heap"

type stoneHeap []int

func (h stoneHeap) Len() int            { return len(h) }
func (h stoneHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h stoneHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *stoneHeap) Push(v interface{}) { *h = append(*h, v.(int)) }
func (h *stoneHeap) Pop() interface{} {
	old := *h
	n := len(old)
	v := old[n-1]
	*h = old[:n-1]
	return v
}

func lastStoneWeight(stones []int) int {
	// The game is deterministic: only fast access to the current maximum is
	// needed, which this max-heap provides.
	h := stoneHeap(stones)
	heap.Init(&h)
	for h.Len() > 1 {
		// The two heaviest stones; equal ones annihilate (nothing pushed).
		y := heap.Pop(&h).(int)
		x := heap.Pop(&h).(int)
		if x != y {
			heap.Push(&h, y-x)
		}
	}
	// Empty heap means every stone paired off into equal smashings.
	if h.Len() == 0 {
		return 0
	}
	return h[0]
}
