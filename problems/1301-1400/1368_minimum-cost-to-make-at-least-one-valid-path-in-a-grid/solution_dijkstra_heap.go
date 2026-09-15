import "container/heap"

type distHeap [][3]int

func (h distHeap) Len() int            { return len(h) }
func (h distHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h distHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *distHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *distHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minCost(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	di := [4]int{0, 0, 1, -1}
	dj := [4]int{1, -1, 0, 0}
	const inf = int(^uint(0) >> 1)
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = inf
		}
	}
	dist[0][0] = 0
	// Shortest path over cells: following the sign costs 0, any other move
	// costs 1 (the price of rewriting it). Plain Dijkstra: a binary heap
	// yields the smallest tentative distance on every pop, whatever the
	// weights are.
	h := &distHeap{}
	heap.Push(h, [3]int{0, 0, 0})
	for h.Len() > 0 {
		top := heap.Pop(h).([3]int)
		d, i, j := top[0], top[1], top[2]
		// The first pop of a cell settles its distance for good.
		if i == m-1 && j == n-1 {
			return d
		}
		// Stale-entry guard: skip outdated heap records.
		if d > dist[i][j] {
			continue
		}
		for s := 1; s <= 4; s++ {
			ni := i + di[s-1]
			nj := j + dj[s-1]
			// Bounds check drops signs pointing off the grid.
			if ni >= 0 && ni < m && nj >= 0 && nj < n {
				cost := 0
				if grid[i][j] != s {
					cost = 1
				}
				// Relax only when the rewrite price strictly improves.
				if d+cost < dist[ni][nj] {
					dist[ni][nj] = d + cost
					heap.Push(h, [3]int{d + cost, ni, nj})
				}
			}
		}
	}
	return dist[m-1][n-1]
}
