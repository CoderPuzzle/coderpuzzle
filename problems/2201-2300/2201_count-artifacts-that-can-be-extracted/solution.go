// Mark every excavated cell once in a boolean grid, then each rectangle test
// is a constant-time lookup per cell — dig is never rescanned.
func digArtifacts(n int, artifacts [][]int, dig [][]int) int {
	dug := make([][]bool, n)
	for r := range dug {
		dug[r] = make([]bool, n)
	}
	for _, cell := range dig {
		dug[cell[0]][cell[1]] = true
	}
	extracted := 0
	for _, rect := range artifacts {
		complete := true
		for r := rect[0]; r <= rect[2] && complete; r++ {
			for c := rect[1]; c <= rect[3]; c++ {
				if !dug[r][c] {
					complete = false
					break
				}
			}
		}
		if complete {
			extracted++
		}
	}
	return extracted
}
