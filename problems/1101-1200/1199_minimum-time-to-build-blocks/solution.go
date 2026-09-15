import "container/heap"

type intHeap []int

func (h intHeap) Len() int            { return len(h) }
func (h intHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *intHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func minBuildTime(blocks []int, split int) int {
	pile := make(intHeap, len(blocks))
	copy(pile, blocks)
	heap.Init(&pile)
	for pile.Len() > 1 {
		// Mount the two cheapest subtrees under one new split; heavier
		// work stays shallower, where the fan-out runs in parallel.
		first := heap.Pop(&pile).(int)
		second := heap.Pop(&pile).(int)
		heap.Push(&pile, max(first, second)+split)
	}
	return pile[0]
}
