import "container/heap"

type spItem struct {
	x    int64
	u, c int
}
type spHeap []spItem

func (h spHeap) Len() int            { return len(h) }
func (h spHeap) Less(i, j int) bool  { return h[i].x < h[j].x }
func (h spHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *spHeap) Push(x interface{}) { *h = append(*h, x.(spItem)) }
func (h *spHeap) Pop() interface{}   { a := *h; x := a[len(a)-1]; *h = a[:len(a)-1]; return x }
func shortestPath(n int, edges [][]int, labels string, k int) int64 {
	g := make([][][2]int, n)
	for _, e := range edges {
		g[e[0]] = append(g[e[0]], [2]int{e[1], e[2]})
	}
	const inf int64 = 1 << 62
	d := make([][]int64, n)
	for i := range d {
		d[i] = make([]int64, k+1)
		for j := range d[i] {
			d[i][j] = inf
		}
	}
	d[0][1] = 0
	q := &spHeap{{0, 0, 1}}
	heap.Init(q)
	for q.Len() > 0 {
		a := heap.Pop(q).(spItem)
		if a.x != d[a.u][a.c] {
			continue
		}
		for _, e := range g[a.u] {
			v, nc := e[0], 1
			if labels[a.u] == labels[v] {
				nc = a.c + 1
			}
			z := a.x + int64(e[1])
			if nc <= k && z < d[v][nc] {
				d[v][nc] = z
				heap.Push(q, spItem{z, v, nc})
			}
		}
	}
	z := inf
	for _, x := range d[n-1] {
		if x < z {
			z = x
		}
	}
	if z == inf {
		return -1
	}
	return z
}
