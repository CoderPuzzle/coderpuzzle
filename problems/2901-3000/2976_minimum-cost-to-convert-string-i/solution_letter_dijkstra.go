import "container/heap"

type distHeap [][2]int64

func (h distHeap) Len() int            { return len(h) }
func (h distHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h distHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *distHeap) Push(x interface{}) { *h = append(*h, x.([2]int64)) }
func (h *distHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minimumCost(source string, target string, original []string, changed []string, cost []int) int64 {
	// A conversion rule is a directed edge in the 26-letter cost graph;
	// the cheapest a->b conversion is the shortest path a->b.
	adj := make([][][2]int64, 26)
	for e := range original {
		a := int(original[e][0]) - 'a'
		b := int(changed[e][0]) - 'a'
		// Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
		adj[a] = append(adj[a], [2]int64{int64(b), int64(cost[e])})
	}
	const INF = int64(1) << 60
	var dist [26][26]int64
	for i := 0; i < 26; i++ {
		for j := 0; j < 26; j++ {
			dist[i][j] = INF
		}
	}
	h := &distHeap{}
	for src := 0; src < 26; src++ {
		// Dijkstra from src: with positive costs the smallest tentative pop
		// is already final, so every letter settles exactly once.
		row := &dist[src]
		row[src] = 0
		heap.Push(h, [2]int64{0, int64(src)})
		for h.Len() > 0 {
			top := heap.Pop(h).([2]int64)
			d, u := top[0], top[1]
			// Stale-entry guard: skip outdated heap records.
			if d > row[u] {
				continue
			}
			for _, e := range adj[u] {
				v, w := e[0], e[1]
				// Relax only when the route strictly improves.
				if nd := d + w; nd < row[v] {
					row[v] = nd
					heap.Push(h, [2]int64{nd, v})
				}
			}
		}
	}
	// Matching characters convert for free; one unreachable pair fails all.
	total := int64(0)
	for p := 0; p < len(source); p++ {
		s := int(source[p]) - 'a'
		t := int(target[p]) - 'a'
		if s == t {
			continue
		}
		d := dist[s][t]
		if d == INF {
			return -1
		}
		total += d
	}
	return total
}
