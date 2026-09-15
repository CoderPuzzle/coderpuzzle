import "container/heap"

type mazeItem struct {
	d    int
	path string
	r, c int
}

type mazeHeap []mazeItem

func (h mazeHeap) Len() int { return len(h) }
func (h mazeHeap) Less(i, j int) bool {
	return h[i].d < h[j].d || (h[i].d == h[j].d && h[i].path < h[j].path)
}
func (h mazeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *mazeHeap) Push(x interface{}) { *h = append(*h, x.(mazeItem)) }
func (h *mazeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func findShortestWay(maze [][]int, ball []int, hole []int) string {
	m := len(maze)
	n := len(maze[0])
	hr, hc := hole[0], hole[1]
	dist := make([][]int, m)
	path := make([][]string, m)
	for i := range dist {
		dist[i] = make([]int, n)
		path[i] = make([]string, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	// Dijkstra over stopping cells, but the hole is a terminal that
	// captures the ball mid-roll. States carry (distance, instructions)
	// and the heap orders by distance first, string second, so the first
	// time the hole pops, its pair is distance-minimal and, among those,
	// lexicographically minimal.
	h := &mazeHeap{}
	dist[ball[0]][ball[1]] = 0
	path[ball[0]][ball[1]] = ""
	heap.Push(h, mazeItem{0, "", ball[0], ball[1]})
	dr := [4]int{1, 0, 0, -1}
	dc := [4]int{0, -1, 1, 0}
	letters := [4]string{"d", "l", "r", "u"}
	for h.Len() > 0 {
		top := heap.Pop(h).(mazeItem)
		d, p, r, c := top.d, top.path, top.r, top.c
		// Dijkstra settles cells in (distance, instructions) order: hole
		// popped => its pair is final.
		if r == hr && c == hc {
			return p
		}
		// Stale heap entry (cell was already relaxed smaller): skip.
		if d > dist[r][c] || (d == dist[r][c] && p > path[r][c]) {
			continue
		}
		// The "next direction must differ from the last" rule needs no
		// code: the ball stopped against a wall in that direction, so
		// re-choosing it rolls zero cells.
		for dir := 0; dir < 4; dir++ {
			// Roll until the next cell is a wall/border — but stepping
			// onto the hole ends the roll right there: the ball drops in
			// instead of rolling on.
			nr, nc, steps := r, c, 0
			for nr+dr[dir] >= 0 && nr+dr[dir] < m && nc+dc[dir] >= 0 && nc+dc[dir] < n &&
				maze[nr+dr[dir]][nc+dc[dir]] == 0 {
				nr += dr[dir]
				nc += dc[dir]
				steps++
				if nr == hr && nc == hc {
					break
				}
			}
			if steps > 0 {
				nd := d + steps
				np := p + letters[dir]
				// Relax on the (distance, instructions) pair.
				if dist[nr][nc] == -1 || nd < dist[nr][nc] || (nd == dist[nr][nc] && np < path[nr][nc]) {
					dist[nr][nc] = nd
					path[nr][nc] = np
					heap.Push(h, mazeItem{nd, np, nr, nc})
				}
			}
		}
	}
	// Heap exhausted: the ball can never reach the hole.
	return "impossible"
}
