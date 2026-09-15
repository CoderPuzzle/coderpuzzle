import "container/heap"

type mpItem struct {
	x    int64
	u, p int
}
type mpHeap []mpItem

func (h mpHeap) Len() int            { return len(h) }
func (h mpHeap) Less(i, j int) bool  { return h[i].x < h[j].x }
func (h mpHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *mpHeap) Push(x interface{}) { *h = append(*h, x.(mpItem)) }
func (h *mpHeap) Pop() interface{}   { a := *h; x := a[len(a)-1]; *h = a[:len(a)-1]; return x }
func minTimeMaxPower(n int, edges [][]int, power int, cost []int, source int, target int) []int64 {
	g := make([][][2]int, n)
	for _, e := range edges {
		g[e[0]] = append(g[e[0]], [2]int{e[1], e[2]})
	}
	const I int64 = 1 << 62
	d := make([][]int64, n)
	for i := range d {
		d[i] = make([]int64, power+1)
		for j := range d[i] {
			d[i][j] = I
		}
	}
	d[source][power] = 0
	q := &mpHeap{{0, source, power}}
	heap.Init(q)
	for q.Len() > 0 {
		a := heap.Pop(q).(mpItem)
		if a.x != d[a.u][a.p] {
			continue
		}
		if a.p >= cost[a.u] {
			np := a.p - cost[a.u]
			for _, e := range g[a.u] {
				z := a.x + int64(e[1])
				if z < d[e[0]][np] {
					d[e[0]][np] = z
					heap.Push(q, mpItem{z, e[0], np})
				}
			}
		}
	}
	z := I
	for _, x := range d[target] {
		if x < z {
			z = x
		}
	}
	if z == I {
		return []int64{-1, -1}
	}
	for p := power; p >= 0; p-- {
		if d[target][p] == z {
			return []int64{z, int64(p)}
		}
	}
	return []int64{-1, -1}
}
