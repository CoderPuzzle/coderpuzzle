import "container/heap"

type cellHeap [][3]int

func (h cellHeap) Len() int            { return len(h) }
func (h cellHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h cellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *cellHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *cellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func findSafeWalk(grid [][]int, health int) bool {
	// A path's cost is the number of unsafe cells it enters, and both
	// endpoints are entered — so grid[0][0] charges immediately. The
	// walk is safe iff some path costs at most health - 1.
	budget := health - 1
	m, n := len(grid), len(grid[0])
	const inf = 50*50 + 1
	dist := make([][]int, m)
	for r := range dist {
		dist[r] = make([]int, n)
		for c := range dist[r] {
			dist[r][c] = inf
		}
	}
	dist[0][0] = grid[0][0]
	h := &cellHeap{}
	heap.Push(h, [3]int{grid[0][0], 0, 0})
	for h.Len() > 0 {
		top := heap.Pop(h).([3]int)
		d, r, c := top[0], top[1], top[2]
		// The first time the goal is popped its cost is optimal.
		if r == m-1 && c == n-1 {
			return d <= budget
		}
		// Stale-entry guard: skip outdated heap records.
		if d > dist[r][c] {
			continue
		}
		for _, step := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
			nr, nc := r+step[0], c+step[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			nd := d + grid[nr][nc]
			// Relax only when the unsafe count strictly improves.
			if nd < dist[nr][nc] {
				dist[nr][nc] = nd
				heap.Push(h, [3]int{nd, nr, nc})
			}
		}
	}
	return false
}
