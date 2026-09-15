import (
	"container/heap"
	"sort"
)

type cellItem struct {
	val, r, c int
}

type cellHeap []cellItem

func (h cellHeap) Len() int { return len(h) }
func (h cellHeap) Less(i, j int) bool {
	if h[i].val != h[j].val {
		return h[i].val < h[j].val
	}
	if h[i].r != h[j].r {
		return h[i].r < h[j].r
	}
	return h[i].c < h[j].c
}
func (h cellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *cellHeap) Push(x interface{}) { *h = append(*h, x.(cellItem)) }
func (h *cellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func maxPoints(grid [][]int, queries []int) []int {
	m, n := len(grid), len(grid[0])
	qlen := len(queries)
	// A query q scores exactly the cells reachable from (0,0) through
	// values < q; that set only grows with q, so answer queries in
	// ascending order against one shared frontier.
	order := make([]int, qlen)
	for i := range order {
		order[i] = i
	}
	sort.SliceStable(order, func(a, b int) bool {
		return queries[order[a]] < queries[order[b]]
	})
	answer := make([]int, qlen)
	visited := make([][]bool, m)
	for i := range visited {
		visited[i] = make([]bool, n)
	}
	visited[0][0] = true
	// Min-heap frontier keyed by cell value; the start cell is marked
	// visited up front so it must be earned by the pop loop like any other.
	h := &cellHeap{{grid[0][0], 0, 0}}
	count := 0
	for _, idx := range order {
		q := queries[idx]
		// Pop while the cheapest frontier cell is strictly below q: this is
		// Dijkstra-like expansion in value order, one point per popped cell.
		for h.Len() > 0 && (*h)[0].val < q {
			top := heap.Pop(h).(cellItem)
			count++
			nb := [4][2]int{{top.r + 1, top.c}, {top.r - 1, top.c}, {top.r, top.c + 1}, {top.r, top.c - 1}}
			for _, d := range nb {
				nr, nc := d[0], d[1]
				if nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] {
					// Mark at push time: no duplicate entries, so each cell
					// enters and leaves the heap exactly once overall.
					visited[nr][nc] = true
					heap.Push(h, cellItem{grid[nr][nc], nr, nc})
				}
			}
		}
		// Heap min >= q (or empty): nothing further is reachable for this or
		// any smaller remaining query, so the running count answers it.
		answer[idx] = count
	}
	return answer
}
