func getFood(grid [][]string) int {
	m, n := len(grid), len(grid[0])
	sr, sc := -1, -1
outer:
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == "*" {
				sr, sc = i, j
				break outer
			}
		}
	}
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	dist[sr][sc] = 0
	q := [][2]int{{sr, sc}}
	for head := 0; head < len(q); head++ {
		i, j := q[head][0], q[head][1]
		if grid[i][j] == "#" {
			return dist[i][j]
		}
		for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			ni, nj := i+d[0], j+d[1]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != "X" && dist[ni][nj] == -1 {
				dist[ni][nj] = dist[i][j] + 1
				q = append(q, [2]int{ni, nj})
			}
		}
	}
	return -1
}
