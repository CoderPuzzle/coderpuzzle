// Gravity first: in each original row stones slide right until an obstacle
// or the wall. Then a 90-degree clockwise rotation maps new[r][c] to
// old[m-1-c][r].
func rotateTheBox(boxGrid [][]string) [][]string {
	m, n := len(boxGrid), len(boxGrid[0])
	rows := make([][]string, m)
	for r := 0; r < m; r++ {
		cells := make([]string, n)
		copy(cells, boxGrid[r])
		write := n - 1
		for c := n - 1; c >= 0; c-- {
			if cells[c] == "*" {
				write = c - 1
			} else if cells[c] == "#" {
				cells[c], cells[write] = cells[write], cells[c]
				write--
			}
		}
		rows[r] = cells
	}
	out := make([][]string, n)
	for r := range out {
		out[r] = make([]string, m)
		for c := 0; c < m; c++ {
			out[r][c] = rows[m-1-c][r]
		}
	}
	return out
}
