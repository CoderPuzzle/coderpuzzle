import "container/heap"

type mazeItem struct{ d, r, c int }

type mazeHeap []mazeItem

func (h mazeHeap) Len() int            { return len(h) }
func (h mazeHeap) Less(i, j int) bool  { return h[i].d < h[j].d }
func (h mazeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *mazeHeap) Push(x interface{}) { *h = append(*h, x.(mazeItem)) }
func (h *mazeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func shortestDistance(maze [][]int, start []int, destination []int) int {
	m := len(maze)
	n := len(maze[0])
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	// Dijkstra over stopping cells — positions where the ball halts
	// against a wall/border. Roll distances vary, so BFS won't do.
	h := &mazeHeap{}
	dist[start[0]][start[1]] = 0
	heap.Push(h, mazeItem{0, start[0], start[1]})
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for h.Len() > 0 {
		top := heap.Pop(h).(mazeItem)
		d, r, c := top.d, top.r, top.c
		// Dijkstra settles cells in distance order: destination popped =>
		// its distance is final.
		if r == destination[0] && c == destination[1] {
			return d
		}
		// Stale heap entry (cell was already relaxed lower): skip.
		if d > dist[r][c] {
			continue
		}
		for dir := 0; dir < 4; dir++ {
			// Roll step by step until the next cell is a wall or out of
			// bounds; the landing cell is the neighbor, steps the edge
			// weight. Passing over a cell doesn't create a node — only
			// stopping on it does.
			nr, nc, steps := r, c, 0
			for nr+dr[dir] >= 0 && nr+dr[dir] < m && nc+dc[dir] >= 0 && nc+dc[dir] < n &&
				maze[nr+dr[dir]][nc+dc[dir]] == 0 {
				nr += dr[dir]
				nc += dc[dir]
				steps++
			}
			if steps > 0 {
				nd := d + steps
				// Relax only when the roll improves the landing cell.
				if dist[nr][nc] == -1 || nd < dist[nr][nc] {
					dist[nr][nc] = nd
					heap.Push(h, mazeItem{nd, nr, nc})
				}
			}
		}
	}
	// Heap exhausted: the ball can never stop on the destination.
	return -1
}
