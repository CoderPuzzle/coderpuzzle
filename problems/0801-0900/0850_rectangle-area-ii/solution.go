import "sort"

func rectangleArea(rectangles [][]int) int {
	const MOD = 1000000007
	if len(rectangles) == 0 {
		return 0
	}
	// Coordinate compression: with at most 2R distinct values per
	// axis, cell boundaries are exactly the rectangle edges, so
	// coverage is constant within each cell.
	xsSet := map[int64]struct{}{}
	ysSet := map[int64]struct{}{}
	for _, rect := range rectangles {
		xsSet[int64(rect[0])] = struct{}{}
		xsSet[int64(rect[2])] = struct{}{}
		ysSet[int64(rect[1])] = struct{}{}
		ysSet[int64(rect[3])] = struct{}{}
	}
	xs := make([]int64, 0, len(xsSet))
	for x := range xsSet {
		xs = append(xs, x)
	}
	ys := make([]int64, 0, len(ysSet))
	for y := range ysSet {
		ys = append(ys, y)
	}
	sort.Slice(xs, func(a, b int) bool { return xs[a] < xs[b] })
	sort.Slice(ys, func(a, b int) bool { return ys[a] < ys[b] })
	xIndex := make(map[int64]int, len(xs))
	for i, x := range xs {
		xIndex[x] = i
	}
	yIndex := make(map[int64]int, len(ys))
	for i, y := range ys {
		yIndex[y] = i
	}
	nx := len(xs) - 1
	ny := len(ys) - 1
	grid := make([][]bool, nx)
	for i := range grid {
		grid[i] = make([]bool, ny)
	}
	// Mark the half-open compressed range: adjacent rectangles
	// share edge cells without overlap or gaps, and idempotent
	// marking counts overlaps once.
	for _, rect := range rectangles {
		x1 := xIndex[int64(rect[0])]
		x2 := xIndex[int64(rect[2])]
		y1 := yIndex[int64(rect[1])]
		y2 := yIndex[int64(rect[3])]
		for i := x1; i < x2; i++ {
			for j := y1; j < y2; j++ {
				grid[i][j] = true
			}
		}
	}
	// Sum the real areas of marked cells, reducing at each step.
	total := int64(0)
	for i := 0; i < nx; i++ {
		for j := 0; j < ny; j++ {
			if grid[i][j] {
				dx := (xs[i+1] - xs[i]) % MOD
				dy := (ys[j+1] - ys[j]) % MOD
				total = (total + dx*dy) % MOD
			}
		}
	}
	return int(total)
}
