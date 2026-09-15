import (
	"sort"
	"strconv"
	"strings"
)

// Flood-fill each island with an explicit stack, then name the shape by the
// smallest normalized cell serialization among its eight rotations and
// reflections, so islands equal under the statement's rule — and only those —
// produce one identical signature.
func numDistinctIslands2(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	shapes := make(map[string]bool)
	sign := [2]int{1, -1}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] != 1 || seen[i][j] {
				continue
			}
			seen[i][j] = true
			stack := [][2]int{{i, j}}
			cells := [][2]int{}
			for len(stack) > 0 {
				cell := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				r, c := cell[0], cell[1]
				cells = append(cells, cell)
				for _, d := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
					nr, nc := r+d[0], c+d[1]
					if nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1 && !seen[nr][nc] {
						seen[nr][nc] = true
						stack = append(stack, [2]int{nr, nc})
					}
				}
			}
			best := ""
			for t := 0; t < 8; t++ {
				a, b, swap := sign[t&1], sign[(t>>1)&1], t&4 != 0
				moved := make([][2]int, len(cells))
				r0, c0 := 0, 0
				for k, cell := range cells {
					r, c := cell[0], cell[1]
					nr, nc := a*r, b*c
					if swap {
						nr, nc = a*c, b*r
					}
					moved[k] = [2]int{nr, nc}
					if k == 0 || nr < r0 {
						r0 = nr
					}
					if k == 0 || nc < c0 {
						c0 = nc
					}
				}
				for k := range moved {
					moved[k][0] -= r0
					moved[k][1] -= c0
				}
				sort.Slice(moved, func(x, y int) bool {
					if moved[x][0] != moved[y][0] {
						return moved[x][0] < moved[y][0]
					}
					return moved[x][1] < moved[y][1]
				})
				parts := make([]string, len(moved))
				for k, cell := range moved {
					parts[k] = strconv.Itoa(cell[0]) + "," + strconv.Itoa(cell[1])
				}
				key := strings.Join(parts, ";")
				if best == "" || key < best {
					best = key
				}
			}
			shapes[best] = true
		}
	}
	return len(shapes)
}
