import (
	"container/heap"
)

type roomEntry struct {
	time int
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
	// Waiting inside a room is free, but a move into an adjacent room
	// takes exactly one second and cannot start before the target room
	// opens, so a cell settled at time t settles a neighbour at
	// max(t, moveTime[next]) + 1. That relaxation never lowers a settled
	// time, so this is shortest-path terrain for Dijkstra: pop cells
	// from a min-heap of arrival times, skip stale entries, and the
	// first settle of a cell is its final time.
	n, m := len(moveTime), len(moveTime[0])
	const infinity = int(^uint(0) >> 1)
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, m)
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
		for _, d := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
			ni, nj := cur.row+d[0], cur.col+d[1]
			if ni < 0 || ni >= n || nj < 0 || nj >= m {
				continue
			}
			nt := cur.time
			if moveTime[ni][nj] > nt {
				nt = moveTime[ni][nj]
			}
			nt++
			if nt < dist[ni][nj] {
				dist[ni][nj] = nt
				heap.Push(h, roomEntry{time: nt, row: ni, col: nj})
			}
		}
	}
	return dist[n-1][m-1]
}
