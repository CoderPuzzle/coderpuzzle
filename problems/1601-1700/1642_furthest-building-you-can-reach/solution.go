import "container/heap"

type intHeap []int

func (h intHeap) Len() int            { return len(h) }
func (h intHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *intHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func furthestBuilding(heights []int, bricks int, ladders int) int {
	// Min-heap of the climbs covered by ladders
	ladderClimbs := &intHeap{}
	for i := 0; i < len(heights)-1; i++ {
		climb := heights[i+1] - heights[i]
		if climb <= 0 {
			continue
		}
		heap.Push(ladderClimbs, climb)
		if ladderClimbs.Len() > ladders {
			bricks -= heap.Pop(ladderClimbs).(int)
			if bricks < 0 {
				return i
			}
		}
	}
	return len(heights) - 1
}
