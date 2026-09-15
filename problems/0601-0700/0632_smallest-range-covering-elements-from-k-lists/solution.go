import (
	"container/heap"
)

type srItem struct {
	v int
	i int
	j int
}

type srHeap []srItem

func (h srHeap) Len() int { return len(h) }
func (h srHeap) Less(a, b int) bool {
	if h[a].v != h[b].v {
		return h[a].v < h[b].v
	}
	if h[a].i != h[b].i {
		return h[a].i < h[b].i
	}
	return h[a].j < h[b].j
}
func (h srHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *srHeap) Push(x interface{}) { *h = append(*h, x.(srItem)) }
func (h *srHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func smallestRange(nums [][]int) []int {
	// Seed the heap with every list's head; the k-way merge sweeps candidate
	// ranges in order as the selection's minimum advances.
	h := &srHeap{}
	curMax := nums[0][0]
	for i := 0; i < len(nums); i++ {
		*h = append(*h, srItem{nums[i][0], i, 0})
		if nums[i][0] > curMax {
			curMax = nums[i][0]
		}
	}
	heap.Init(h)
	bestLo, bestHi := 0, 0
	have := false
	for {
		top := heap.Pop(h).(srItem)
		lo, i, j := top.v, top.i, top.j
		// [lo, curMax] covers all k lists: prefer smaller width, then
		// the smaller left endpoint on ties.
		if !have || curMax-lo < bestHi-bestLo ||
			(curMax-lo == bestHi-bestLo && lo < bestLo) {
			bestLo = lo
			bestHi = curMax
			have = true
		}
		if j+1 == len(nums[i]) {
			// The popped list is exhausted: no later selection can still
			// include it, so every further candidate would be worse.
			return []int{bestLo, bestHi}
		}
		nxt := nums[i][j+1]
		// The next element may raise the tracked maximum.
		if nxt > curMax {
			curMax = nxt
		}
		heap.Push(h, srItem{nxt, i, j + 1})
	}
}
