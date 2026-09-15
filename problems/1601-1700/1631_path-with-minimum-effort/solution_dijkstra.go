import "container/heap"

type effortHeap [][3]int

func (h effortHeap) Len() int            { return len(h) }
func (h effortHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h effortHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *effortHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *effortHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minimumEffortPath(heights [][]int) int {
	rows := len(heights)
	cols := len(heights[0])
	const inf = int(^uint(0) >> 1)
	// Bottleneck shortest path: Dijkstra with max in place of addition — a
	// path's effort is the largest height difference along it, and the
	// smallest tentative effort popped is already final.
	dist := make([][]int, rows)
	for i := range dist {
		dist[i] = make([]int, cols)
		for j := range dist[i] {
			dist[i][j] = inf
		}
	}
	dist[0][0] = 0
	h := &effortHeap{}
	heap.Push(h, [3]int{0, 0, 0})
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for h.Len() > 0 {
		top := heap.Pop(h).([3]int)
		d, r, c := top[0], top[1], top[2]
		// The first time the goal is popped its effort is optimal.
		if r == rows-1 && c == cols-1 {
			return d
		}
		// Stale-entry guard: skip outdated heap records.
		if d > dist[r][c] {
			continue
		}
		for _, dir := range dirs {
			nr, nc := r+dir[0], c+dir[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols {
				nd := d
				diff := heights[nr][nc] - heights[r][c]
				if diff < 0 {
					diff = -diff
				}
				if diff > nd {
					nd = diff
				}
				// Relax only when the bottleneck effort strictly improves.
				if nd < dist[nr][nc] {
					dist[nr][nc] = nd
					heap.Push(h, [3]int{nd, nr, nc})
				}
			}
		}
	}
	return 0
}
