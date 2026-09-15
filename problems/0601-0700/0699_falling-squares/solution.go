import "sort"

// Coordinate compression: every left and right edge becomes a cell boundary,
// so each square's footprint is a run of compressed cells and touching edges
// share no cell — exactly the brushing rule. Heights stay in int range: at
// most 1000 * 10^6 = 10^9 < 2^31.
func fallingSquares(positions [][]int) []int {
	coords := make([]int, 0, 2*len(positions))
	for _, square := range positions {
		coords = append(coords, square[0], square[0]+square[1])
	}
	sort.Ints(coords)
	deduped := coords[:0]
	for _, x := range coords {
		if len(deduped) == 0 || x != deduped[len(deduped)-1] {
			deduped = append(deduped, x)
		}
	}
	coords = deduped
	index := make(map[int]int, len(coords))
	for i, x := range coords {
		index[x] = i
	}
	// heights[k] is the top height over the cell [coords[k], coords[k+1]).
	heights := make([]int, len(coords))
	ans := make([]int, 0, len(positions))
	best := 0
	for _, square := range positions {
		lo, hi := index[square[0]], index[square[0]+square[1]]
		// The square lands on the tallest top among the cells it covers.
		top := square[1]
		for cell := lo; cell < hi; cell++ {
			if square[1]+heights[cell] > top {
				top = square[1] + heights[cell]
			}
		}
		for cell := lo; cell < hi; cell++ {
			heights[cell] = top
		}
		if top > best {
			best = top
		}
		ans = append(ans, best)
	}
	return ans
}
