import "strings"

func createGrid(m int, n int) []string {
	grid := make([]string, m)
	grid[0] = strings.Repeat(".", n)
	rest := strings.Repeat("#", n-1) + "."
	for i := 1; i < m; i++ {
		grid[i] = rest
	}
	return grid
}
