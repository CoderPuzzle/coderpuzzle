import "container/heap"

type cellHeap [][3]int

func (h cellHeap) Len() int            { return len(h) }
func (h cellHeap) Less(i, j int) bool  { return h[i][0] > h[j][0] }
func (h cellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *cellHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *cellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func maximumMinimumPath(grid [][]int) int {
	rows := len(grid)
	cols := len(grid[0])
	// Max-heap on the cell value. Best-first on the highest-valued frontier
	// cell: taking the largest candidate can never lower the running minimum,
	// so the first arrival at the goal carries the maximum bottleneck
	// (Dijkstra with max).
	h := &cellHeap{}
	heap.Init(h)
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	visited[0][0] = true
	heap.Push(h, [3]int{grid[0][0], 0, 0})
	best := grid[0][0]
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for h.Len() > 0 {
		top := heap.Pop(h).([3]int)
		value, r, c := top[0], top[1], top[2]
		// best is the bottleneck (running minimum) of the walk so far.
		if value < best {
			best = value
		}
		if r == rows-1 && c == cols-1 {
			return best
		}
		for _, dir := range dirs {
			nr := r + dir[0]
			nc := c + dir[1]
			// Mark visited on push so each cell enters the heap at most once.
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] {
				visited[nr][nc] = true
				heap.Push(h, [3]int{grid[nr][nc], nr, nc})
			}
		}
	}
	return best
}
