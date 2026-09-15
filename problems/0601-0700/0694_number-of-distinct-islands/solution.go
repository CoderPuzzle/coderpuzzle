import (
	"sort"
	"strconv"
	"strings"
)

// Flood-fill each island with an explicit queue. The shape is the sorted set
// of cells relative to the first cell the row-major scan meets, so translated
// copies produce one identical signature.
func numDistinctIslands(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	shapes := make(map[string]bool)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] != 1 || seen[i][j] {
				continue
			}
			seen[i][j] = true
			queue := [][2]int{{i, j}}
			cells := [][2]int{}
			for head := 0; head < len(queue); head++ {
				r, c := queue[head][0], queue[head][1]
				cells = append(cells, [2]int{r - i, c - j})
				for _, d := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
					nr, nc := r+d[0], c+d[1]
					if nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1 && !seen[nr][nc] {
						seen[nr][nc] = true
						queue = append(queue, [2]int{nr, nc})
					}
				}
			}
			sort.Slice(cells, func(a, b int) bool {
				if cells[a][0] != cells[b][0] {
					return cells[a][0] < cells[b][0]
				}
				return cells[a][1] < cells[b][1]
			})
			parts := make([]string, len(cells))
			for k, cell := range cells {
				parts[k] = strconv.Itoa(cell[0]) + "," + strconv.Itoa(cell[1])
			}
			shapes[strings.Join(parts, ";")] = true
		}
	}
	return len(shapes)
}
