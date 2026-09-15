// Each column's ball walks alone: the board d under it deflects it into the
// gap between columns c and c + d, and it drops through only if the board on
// the far side of that gap points the same way — a facing pair forms a V that
// closes the gap, a missing neighbour means the gap opens into a wall, and
// both mean stuck.
func findBall(grid [][]int) []int {
	m, n := len(grid), len(grid[0])
	answer := make([]int, n)
	for ball := 0; ball < n; ball++ {
		c := ball
		for r := 0; r < m; r++ {
			d := grid[r][c]
			next := c + d
			if next < 0 || next >= n || grid[r][next] != d {
				c = -1
				break
			}
			c = next
		}
		answer[ball] = c
	}
	return answer
}
