import (
	"container/heap"
)

type roomEntry struct {
	time int64
	row  int
	col  int
}

type roomHeap []roomEntry

func (h roomHeap) Len() int           { return len(h) }
func (h roomHeap) Less(a, b int) bool { return h[a].time < h[b].time }
func (h roomHeap) Swap(a, b int)      { h[a], h[b] = h[b], h[a] }
func (h *roomHeap) Push(value interface{}) {
	*h = append(*h, value.(roomEntry))
}
func (h *roomHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func minTimeToReach(moveTime [][]int) int {
	// Every move flips the parity of i + j, so a walk that has made k
	// moves always stands on a cell with the parity of k — the hint's
	// (cell, move-parity) states collapse onto the cells alone, and the
	// move leaving (i, j) costs 1 when (i + j) is even, else 2. That
	// fixes each cell's outgoing cost, so plain Dijkstra applies: a
	// cell settled at time t offers a neighbour arrival
	// max(t, moveTime[next]) + cost_out(cell), and the first settle is
	// final. Distances are carried in 64-bit ints — moveTime reaches
	// 1e9 and the move sums add ~3000.
	n, m := len(moveTime), len(moveTime[0])
	const infinity = int64(^uint64(0) >> 1)
	dist := make([][]int64, n)
	for i := range dist {
		dist[i] = make([]int64, m)
		for j := range dist[i] {
			dist[i][j] = infinity
		}
	}
	dist[0][0] = 0
	h := &roomHeap{}
	heap.Push(h, roomEntry{time: 0, row: 0, col: 0})
	for h.Len() > 0 {
		cur := heap.Pop(h).(roomEntry)
		if cur.time > dist[cur.row][cur.col] {
			continue
		}
		step := int64(2)
		if (cur.row+cur.col)%2 == 0 {
			step = 1
		}
		for _, d := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
			ni, nj := cur.row+d[0], cur.col+d[1]
			if ni < 0 || ni >= n || nj < 0 || nj >= m {
				continue
			}
			nt := cur.time
			if gate := int64(moveTime[ni][nj]); gate > nt {
				nt = gate
			}
			nt += step
			if nt < dist[ni][nj] {
				dist[ni][nj] = nt
				heap.Push(h, roomEntry{time: nt, row: ni, col: nj})
			}
		}
	}
	return int(dist[n-1][m-1])
}
