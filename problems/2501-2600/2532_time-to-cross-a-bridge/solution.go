import (
	"container/heap"
)

type workerItem struct {
	negEff int
	negIdx int
}

type workerHeap []workerItem

func (h workerHeap) Len() int { return len(h) }
func (h workerHeap) Less(a, b int) bool {
	if h[a].negEff != h[b].negEff {
		return h[a].negEff < h[b].negEff
	}
	return h[a].negIdx < h[b].negIdx
}
func (h workerHeap) Swap(a, b int) { h[a], h[b] = h[b], h[a] }
func (h *workerHeap) Push(x interface{}) {
	*h = append(*h, x.(workerItem))
}
func (h *workerHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type pendingItem struct {
	ready int
	side  int // join-side: 1=right, 0=left
	i     int
}

type pendingHeap []pendingItem

func (h pendingHeap) Len() int           { return len(h) }
func (h pendingHeap) Less(a, b int) bool { return h[a].ready < h[b].ready }
func (h pendingHeap) Swap(a, b int)      { h[a], h[b] = h[b], h[a] }
func (h *pendingHeap) Push(x interface{}) {
	*h = append(*h, x.(pendingItem))
}
func (h *pendingHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func findCrossingTime(n int, k int, time [][]int) int {
	// Priority is static per worker: least efficient = larger left+right,
	// ties to the larger index. Encoded as min-key (-eff, -i).
	left := &workerHeap{}
	for i := 0; i < k; i++ {
		*left = append(*left, workerItem{-(time[i][0] + time[i][2]), -i})
	}
	heap.Init(left)
	right := &workerHeap{}    // boxed workers waiting on the right bank
	pending := &pendingHeap{} // completions keyed by ready time
	cur := 0                  // instant the bridge becomes free again
	sent := 0
	delivered := 0
	ans := 0
	for delivered < n {
		for pending.Len() > 0 && (*pending)[0].ready <= cur {
			done := heap.Pop(pending).(pendingItem)
			target := left
			if done.side == 1 {
				target = right
			}
			heap.Push(target, workerItem{-(time[done.i][0] + time[done.i][2]), -done.i})
		}
		if right.Len() > 0 {
			// A boxed worker on the right bank always has priority.
			i := -heap.Pop(right).(workerItem).negIdx
			cur += time[i][2]
			delivered++
			if cur > ans {
				ans = cur // box reaches the left bank here
			}
			if delivered == n {
				break // the final put never delays anything
			}
			heap.Push(pending, pendingItem{cur + time[i][3], 0, i})
		} else if left.Len() > 0 && sent < n {
			i := -heap.Pop(left).(workerItem).negIdx
			cur += time[i][0]
			sent++
			heap.Push(pending, pendingItem{cur + time[i][1], 1, i})
		} else {
			// Nobody can cross yet: jump to the next readiness instant.
			cur = (*pending)[0].ready
		}
	}
	return ans
}
