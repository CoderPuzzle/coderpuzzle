import (
	"container/heap"
	"math"
)

type mvcEntry struct {
	dis    int
	branch int
}

type mvcHeap []mvcEntry

func (h mvcHeap) Len() int           { return len(h) }
func (h mvcHeap) Less(a, b int) bool { return h[a].dis < h[b].dis }
func (h mvcHeap) Swap(a, b int)      { h[a], h[b] = h[b], h[a] }
func (h *mvcHeap) Push(value interface{}) {
	*h = append(*h, value.(mvcEntry))
}
func (h *mvcHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func minimumVisitedCells(grid [][]int) int {
	// Every move goes strictly right or down, so row-major order is a
	// topological order: when a cell is reached its distance is final.
	// Two lazy min-heaps answer "nearest predecessor" in O(log n):
	// rows[i] holds {dis, k} for cells settled in row i and cols[j]
	// likewise down column j. Entries whose reach no longer covers the
	// current index pop forever — the scan index only ever grows — so
	// the surviving root is the best available source from that side.
	m := len(grid)
	n := len(grid[0])
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 1
	rows := make([]mvcHeap, m)
	cols := make([]mvcHeap, n)
	heap.Push(&rows[0], mvcEntry{dis: 1, branch: 0})
	heap.Push(&cols[0], mvcEntry{dis: 1, branch: 0})
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			rowHeap := &rows[i]
			for rowHeap.Len() > 0 &&
				grid[i][rowHeap.top().branch]+rowHeap.top().branch < j {
				heap.Pop(rowHeap)
			}
			colHeap := &cols[j]
			for colHeap.Len() > 0 &&
				grid[colHeap.top().branch][j]+colHeap.top().branch < i {
				heap.Pop(colHeap)
			}
			best := math.MaxInt
			if rowHeap.Len() > 0 && rowHeap.top().dis < best {
				best = rowHeap.top().dis
			}
			if colHeap.Len() > 0 && colHeap.top().dis < best {
				best = colHeap.top().dis
			}
			if best != math.MaxInt {
				dis[i][j] = best + 1
				heap.Push(rowHeap, mvcEntry{dis: best + 1, branch: j})
				heap.Push(colHeap, mvcEntry{dis: best + 1, branch: i})
			}
		}
	}
	if dis[m-1][n-1] == math.MaxInt {
		return -1
	}
	return dis[m-1][n-1]
}

func (h *mvcHeap) top() mvcEntry { return (*h)[0] }
