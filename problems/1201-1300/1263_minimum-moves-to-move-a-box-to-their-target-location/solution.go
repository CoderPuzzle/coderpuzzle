func minPushBox(grid [][]string) int {
	m, n := len(grid), len(grid[0])
	boxR, boxC, playR, playC, targR, targC := 0, 0, 0, 0, 0, 0
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			switch grid[r][c] {
			case "B":
				boxR, boxC = r, c
			case "S":
				playR, playC = r, c
			case "T":
				targR, targC = r, c
			}
		}
	}
	free := func(r, c int) bool {
		return r >= 0 && r < m && c >= 0 && c < n && grid[r][c] != "#"
	}
	// Flood the player's reachable floor with the box as an obstacle.
	reachable := func(br, bc, sr, sc int, seen [][]bool) {
		queue := [][2]int{{sr, sc}}
		seen[sr][sc] = true
		for len(queue) > 0 {
			cur := queue[0]
			queue = queue[1:]
			for _, d := range deltas1263 {
				nr, nc := cur[0]+d[0], cur[1]+d[1]
				if nr < 0 || nr >= m || nc < 0 || nc >= n {
					continue
				}
				if (nr == br && nc == bc) || seen[nr][nc] || grid[nr][nc] == "#" {
					continue
				}
				seen[nr][nc] = true
				queue = append(queue, [2]int{nr, nc})
			}
		}
	}

	// State: (box cell, side of the player). After a push along
	// deltas1263[i] the player ends up standing on side i of the new box
	// cell. Each edge is one push, so BFS yields minimal pushes.
	type item struct{ br, bc, side, pushes int }
	visited := make(map[int]bool)
	key := func(br, bc, side int) int { return (br*n+bc)<<2 | side }
	queue := []item{}
	around := make([][]bool, m)
	for i := range around {
		around[i] = make([]bool, n)
	}
	reachable(boxR, boxC, playR, playC, around)
	for i := 0; i < 4; i++ {
		standR, standC := boxR+deltas1263[i][0], boxC+deltas1263[i][1]
		destR, destC := boxR-deltas1263[i][0], boxC-deltas1263[i][1]
		if !free(standR, standC) || !free(destR, destC) || !around[standR][standC] {
			continue
		}
		visited[key(destR, destC, i)] = true
		queue = append(queue, item{destR, destC, i, 1})
	}
	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		if cur.br == targR && cur.bc == targC {
			return cur.pushes
		}
		seen := make([][]bool, m)
		for i := range seen {
			seen[i] = make([]bool, n)
		}
		reachable(cur.br, cur.bc, cur.br+deltas1263[cur.side][0],
			cur.bc+deltas1263[cur.side][1], seen)
		for i := 0; i < 4; i++ {
			standR, standC := cur.br+deltas1263[i][0], cur.bc+deltas1263[i][1]
			destR, destC := cur.br-deltas1263[i][0], cur.bc-deltas1263[i][1]
			if !free(standR, standC) || !free(destR, destC) || !seen[standR][standC] {
				continue
			}
			if visited[key(destR, destC, i)] {
				continue
			}
			visited[key(destR, destC, i)] = true
			queue = append(queue, item{destR, destC, i, cur.pushes + 1})
		}
	}
	return -1
}

var deltas1263 = [4][2]int{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}
