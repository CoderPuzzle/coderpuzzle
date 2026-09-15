// Canvas of "next possibly-unpainted cell" pointers: painting a cell points
// it one past itself and find compresses the skips, so every unit of the
// painting is walked exactly once across all n days.
func amountPainted(paint [][]int) []int {
	limit := 50001
	next := make([]int, limit+1)
	for cell := range next {
		next[cell] = cell
	}
	var find func(int) int
	find = func(cell int) int {
		root := cell
		for next[root] != root {
			root = next[root]
		}
		for next[cell] != root {
			// path compression
			forward := next[cell]
			next[cell] = root
			cell = forward
		}
		return root
	}
	worklog := make([]int, 0, len(paint))
	for _, day := range paint {
		area := 0
		cell := find(day[0])
		for cell < day[1] {
			area++
			next[cell] = cell + 1
			cell = find(cell + 1)
		}
		worklog = append(worklog, area)
	}
	return worklog
}
