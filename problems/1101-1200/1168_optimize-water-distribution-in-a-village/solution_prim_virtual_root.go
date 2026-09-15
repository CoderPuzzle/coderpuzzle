import "container/heap"

type costHeap [][2]int

func (h costHeap) Len() int            { return len(h) }
func (h costHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h costHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *costHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *costHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minCostToSupplyWater(n int, wells []int, pipes [][]int) int {
	// Prim over sites 1..n plus a virtual node 0 (source edges): grow the
	// tree outward from node 0, always settling the cheapest frontier
	// edge; an edge must beat the site's recorded best to be pushed.
	adj := make([][][2]int, n+1)
	for i := 0; i < n; i++ {
		adj[0] = append(adj[0], [2]int{wells[i], i + 1})
		adj[i+1] = append(adj[i+1], [2]int{wells[i], 0})
	}
	for _, pipe := range pipes {
		adj[pipe[0]] = append(adj[pipe[0]], [2]int{pipe[2], pipe[1]})
		adj[pipe[1]] = append(adj[pipe[1]], [2]int{pipe[2], pipe[0]})
	}

	const inf = int(^uint(0) >> 1)
	best := make([]int, n+1)
	for i := range best {
		best[i] = inf
	}
	best[0] = 0
	visited := make([]bool, n+1)
	h := &costHeap{}
	heap.Push(h, [2]int{0, 0})
	total := 0
	taken := 0
	for h.Len() > 0 {
		top := heap.Pop(h).([2]int)
		cost, site := top[0], top[1]
		// Stale-entry guard: the site already joined the tree earlier.
		if visited[site] {
			continue
		}
		visited[site] = true
		total += cost
		taken++
		if taken == n+1 {
			break
		}
		for _, e := range adj[site] {
			w, v := e[0], e[1]
			// Relax only when the link strictly improves the site's best.
			if !visited[v] && w < best[v] {
				best[v] = w
				heap.Push(h, [2]int{w, v})
			}
		}
	}
	return total
}
