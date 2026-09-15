import "container/heap"

type cellItem struct {
	t, r, c int
}

type cellHeap []cellItem

func (h cellHeap) Len() int            { return len(h) }
func (h cellHeap) Less(i, j int) bool  { return h[i].t < h[j].t }
func (h cellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *cellHeap) Push(x interface{}) { *h = append(*h, x.(cellItem)) }
func (h *cellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minimumTime(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	if m == 1 && n == 1 {
		return 0
	}
	// If both neighbours of the start cell demand more than 1s we can never
	// leave the start (no adjacent cell to wait on).
	canRight := n > 1 && grid[0][1] <= 1
	canDown := m > 1 && grid[1][0] <= 1
	if !canRight && !canDown {
		return -1
	}

	const INF = int(^uint(0) >> 1)
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = INF
		}
	}
	dist[0][0] = 0
	h := &cellHeap{{0, 0, 0}}
	heap.Init(h)
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for h.Len() > 0 {
		top := heap.Pop(h).(cellItem)
		t, r, c := top.t, top.r, top.c
		if t != dist[r][c] {
			continue
		}
		if r == m-1 && c == n-1 {
			return t
		}
		for d := 0; d < 4; d++ {
			nr, nc := r+dr[d], c+dc[d]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			nt := t + 1
			if nt < grid[nr][nc] {
				if (grid[nr][nc]-nt)%2 == 0 {
					nt = grid[nr][nc]
				} else {
					nt = grid[nr][nc] + 1
				}
			}
			if nt < dist[nr][nc] {
				dist[nr][nc] = nt
				heap.Push(h, cellItem{nt, nr, nc})
			}
		}
	}
	return -1
}
