// Every exposed face belongs to some tower: an occupied cell owns a top and
// a bottom face, and each of its four walls shows exactly the strip rising
// above the neighboring cell (empty ground or the grid's edge is a neighbor
// of height 0).
func surfaceArea(grid [][]int) int {
	n := len(grid)
	total := 0
	dirs := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			v := grid[i][j]
			if v > 0 {
				total += 2
				for _, d := range dirs {
					ni, nj := i+d[0], j+d[1]
					neighbor := 0
					if ni >= 0 && ni < n && nj >= 0 && nj < n {
						neighbor = grid[ni][nj]
					}
					if v > neighbor {
						total += v - neighbor
					}
				}
			}
		}
	}
	return total
}
