import "container/heap"

type mcItem struct {
	cost   int64
	cell   int
	parity int
}

type mcHeap []mcItem

func (h mcHeap) Len() int { return len(h) }
func (h mcHeap) Less(a, b int) bool {
	if h[a].cost != h[b].cost {
		return h[a].cost < h[b].cost
	}
	if h[a].cell != h[b].cell {
		return h[a].cell < h[b].cell
	}
	return h[a].parity < h[b].parity
}
func (h mcHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *mcHeap) Push(x interface{}) { *h = append(*h, x.(mcItem)) }
func (h *mcHeap) Pop() interface{} {
	old := *h
	n := len(old)
	it := old[n-1]
	*h = old[:n-1]
	return it
}

func minCost(m int, n int, penalty [][]int) int64 {
	const INF = int64(1) << 62
	size := m * n
	dist := make([][2]int64, size)
	for c := range dist {
		dist[c] = [2]int64{INF, INF}
	}
	dist[0][0] = 1 // entrance cost of (0, 0); next action is odd

	pq := &mcHeap{{1, 0, 0}}
	heap.Init(pq)
	target := size - 1
	di := [4]int{1, -1, 0, 0}
	dj := [4]int{0, 0, 1, -1}
	for pq.Len() > 0 {
		it := heap.Pop(pq).(mcItem)
		cost, cell, parity := it.cost, it.cell, it.parity
		if cost > dist[cell][parity] {
			continue
		}
		if cell == target {
			continue
		}
		i, j := cell/n, cell%n
		isOdd := parity == 0
		for t := 0; t < 4; t++ {
			ni, nj := i+di[t], j+dj[t]
			if ni < 0 || ni >= m || nj < 0 || nj >= n {
				continue
			}
			follows := (isOdd && di[t]+dj[t] > 0) || (!isOdd && di[t]+dj[t] < 0)
			w := int64(ni+1) * int64(nj+1)
			if !follows {
				w += int64(penalty[i][j])
			}
			ncell := ni*n + nj
			nparity := 1 - parity
			nc := cost + w
			if nc < dist[ncell][nparity] {
				dist[ncell][nparity] = nc
				heap.Push(pq, mcItem{nc, ncell, nparity})
			}
		}
		// wait flips parity at cost penalty[i][j]
		w := int64(penalty[i][j])
		nparity := 1 - parity
		nc := cost + w
		if nc < dist[cell][nparity] {
			dist[cell][nparity] = nc
			heap.Push(pq, mcItem{nc, cell, nparity})
		}
	}
	if dist[target][0] < dist[target][1] {
		return dist[target][0]
	}
	return dist[target][1]
}
