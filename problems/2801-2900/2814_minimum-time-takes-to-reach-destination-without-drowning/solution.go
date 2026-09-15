func minimumSeconds(land [][]string) int {
	m, n := len(land), len(land[0])
	const inf = 10001 // larger than any reachable second
	sr, sc, dr, dc := 0, 0, 0, 0
	// Water BFS: arrival time of every empty cell. Only "." floods, so
	// "S", "D" and "X" stay dry (the statement guarantees it for "D").
	flood := make([][]int, m)
	for i := range flood {
		flood[i] = make([]int, n)
		for j := range flood[i] {
			flood[i][j] = inf
		}
	}
	water := [][2]int{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			switch land[r][c] {
			case "*":
				flood[r][c] = 0
				water = append(water, [2]int{r, c})
			case "S":
				sr, sc = r, c
			case "D":
				dr, dc = r, c
			}
		}
	}
	for head := 0; head < len(water); head++ {
		cur := water[head]
		step := flood[cur[0]][cur[1]] + 1
		for _, d := range deltas2814 {
			nr, nc := cur[0]+d[0], cur[1]+d[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			if land[nr][nc] != "." || flood[nr][nc] != inf {
				continue
			}
			flood[nr][nc] = step
			water = append(water, [2]int{nr, nc})
		}
	}
	// Person BFS: enter "."/"D" strictly before the water does; the
	// same-second landing ban is the strict '<'.
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	type item struct{ r, c, t int }
	queue := []item{{sr, sc, 0}}
	seen[sr][sc] = true
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		if cur.r == dr && cur.c == dc {
			return cur.t
		}
		for _, d := range deltas2814 {
			nr, nc := cur.r+d[0], cur.c+d[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			if seen[nr][nc] {
				continue
			}
			walk := land[nr][nc] == "." || land[nr][nc] == "D"
			if !walk || cur.t+1 >= flood[nr][nc] {
				continue
			}
			seen[nr][nc] = true
			queue = append(queue, item{nr, nc, cur.t + 1})
		}
	}
	return -1
}

var deltas2814 = [4][2]int{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}
