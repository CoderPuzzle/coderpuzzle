import "container/heap"

type offerHeap [][2]int

func (h offerHeap) Len() int            { return len(h) }
func (h offerHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h offerHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *offerHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *offerHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func minimumCost(n int, connections [][]int) int {
	// adjacency over n+1 slots (index 0 unused; nodes are 1-based);
	// each link is filed once per direction
	adj := make([][][2]int, n+1)
	for _, l := range connections {
		adj[l[0]] = append(adj[l[0]], [2]int{l[2], l[1]})
		adj[l[1]] = append(adj[l[1]], [2]int{l[2], l[0]})
	}

	visited := make([]bool, n+1)
	total := 0
	settled := 0
	// Prim: grow one tree outward from node 1; the cheapest offer
	// leaving the tree is always safe to buy
	h := &offerHeap{}
	heap.Push(h, [2]int{0, 1})
	for h.Len() > 0 && settled < n {
		top := heap.Pop(h).([2]int)
		cost, v := top[0], top[1]
		// stale-entry guard: v already joined via an offer at most
		// this cheap
		if visited[v] {
			continue
		}
		visited[v] = true
		total += cost
		settled++
		for _, entry := range adj[v] {
			if !visited[entry[1]] {
				heap.Push(h, entry)
			}
		}
	}
	// queue drained before every node joined: the catalogue cannot
	// connect all n nodes
	if settled == n {
		return total
	}
	return -1
}
