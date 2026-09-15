// Flood exactly the pixels 4-directionally connected to the seed that
// still carry the seed's ORIGINAL color. Iterating with an explicit queue
// is the point — a serpentine component at the bound chains thousands of
// cells deep, far past any call stack a submission is granted.
func floodFill(image [][]int, sr int, sc int, color int) [][]int {
	m, n := len(image), len(image[0])
	original := image[sr][sc]
	if original == color {
		// Recoloring to the color already there changes nothing, and it
		// would erase the distinction the loop below relies on.
		return image
	}
	// Cells packed as r*n + c in one flat queue; writing the new color as
	// a cell enters it is both the fill and the seen-mark.
	queue := make([]int, m*n)
	head, tail := 0, 0
	image[sr][sc] = color
	queue[tail] = sr*n + sc
	tail++
	for head < tail {
		cell := queue[head]
		head++
		r, c := cell/n, cell%n
		if r > 0 && image[r-1][c] == original {
			image[r-1][c] = color
			queue[tail] = cell - n
			tail++
		}
		if r+1 < m && image[r+1][c] == original {
			image[r+1][c] = color
			queue[tail] = cell + n
			tail++
		}
		if c > 0 && image[r][c-1] == original {
			image[r][c-1] = color
			queue[tail] = cell - 1
			tail++
		}
		if c+1 < n && image[r][c+1] == original {
			image[r][c+1] = color
			queue[tail] = cell + 1
			tail++
		}
	}
	return image
}
