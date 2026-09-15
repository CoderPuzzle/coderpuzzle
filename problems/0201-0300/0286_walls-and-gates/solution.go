func wallsAndGates(rooms [][]int) [][]int {
	m := len(rooms)
	n := len(rooms[0])
	const INF = 2147483647
	type cell struct{ r, c int }
	// Invert the search: enqueue every gate at once and run one BFS outward,
	// rather than searching from each empty room.
	queue := []cell{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if rooms[r][c] == 0 {
				queue = append(queue, cell{r, c})
			}
		}
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	dist := 0
	for len(queue) > 0 {
		// Expand one whole layer per step: every distance-d cell is found
		// before any d+1 cell is labeled, which is what keeps distances
		// minimal (first reach = shortest path from a gate).
		dist++
		next := []cell{}
		for _, cur := range queue {
			for _, d := range dirs {
				nr, nc := cur.r+d[0], cur.c+d[1]
				// Still INF means unvisited; writing the distance doubles as
				// the visited mark, and walls/gates never match INF so they
				// are never entered or overwritten.
				if nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == INF {
					rooms[nr][nc] = dist
					next = append(next, cell{nr, nc})
				}
			}
		}
		queue = next
	}
	return rooms
}
