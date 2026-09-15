// Iterative BFS per unvisited farmland cell: flood the component and track
// the min/max row and column, which for a rectangular group is exactly its
// top-left and bottom-right corner.
func findFarmland(land [][]int) [][]int {
	m, n := len(land), len(land[0])
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	groups := [][]int{}
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if land[r][c] != 1 || seen[r][c] {
				continue
			}
			seen[r][c] = true
			q := [][2]int{{r, c}}
			minR, maxR, minC, maxC := r, r, c, c
			for len(q) > 0 {
				cell := q[0]
				q = q[1:]
				cr, cc := cell[0], cell[1]
				if cr < minR {
					minR = cr
				}
				if cr > maxR {
					maxR = cr
				}
				if cc < minC {
					minC = cc
				}
				if cc > maxC {
					maxC = cc
				}
				for d := 0; d < 4; d++ {
					nr, nc := cr+dr[d], cc+dc[d]
					if 0 <= nr && nr < m && 0 <= nc && nc < n &&
						land[nr][nc] == 1 && !seen[nr][nc] {
						seen[nr][nc] = true
						q = append(q, [2]int{nr, nc})
					}
				}
			}
			groups = append(groups, []int{minR, minC, maxR, maxC})
		}
	}
	return groups
}
