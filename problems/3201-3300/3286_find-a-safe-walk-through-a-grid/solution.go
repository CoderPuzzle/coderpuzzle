import "container/list"

type cell struct {
	r, c, d int
}

func findSafeWalk(grid [][]int, health int) bool {
	// A path's cost is the number of unsafe cells it enters, and both
	// endpoints are entered — so grid[0][0] charges immediately. The
	// walk is safe iff some path costs at most health - 1.
	budget := health - 1
	m, n := len(grid), len(grid[0])
	const inf = 50*50 + 1
	dist := make([][]int, m)
	for r := range dist {
		dist[r] = make([]int, n)
		for c := range dist[r] {
			dist[r][c] = inf
		}
	}
	dist[0][0] = grid[0][0]
	queue := list.New()
	queue.PushBack(cell{0, 0, dist[0][0]})
	for queue.Len() > 0 {
		front := queue.Front()
		queue.Remove(front)
		cur := front.Value.(cell)
		if cur.d > budget {
			continue
		}
		if cur.r == m-1 && cur.c == n-1 {
			return true
		}
		for _, step := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
			nr, nc := cur.r+step[0], cur.c+step[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			nd := cur.d + grid[nr][nc]
			if nd < dist[nr][nc] && nd <= budget {
				dist[nr][nc] = nd
				// Free move joins the current layer; a paid move goes to
				// the back so layers stay ordered.
				if grid[nr][nc] == 1 {
					queue.PushBack(cell{nr, nc, nd})
				} else {
					queue.PushFront(cell{nr, nc, nd})
				}
			}
		}
	}
	return false
}
