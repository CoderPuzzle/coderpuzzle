import "sort"

// Removing a run of t consecutive bars merges t+1 lines of cells into
// one span, so each axis contributes side = longest run + 1 and the
// square is limited by the smaller side. Only the bar lists matter —
// n and m only bound where bars may sit. The area is at most 101^2,
// well inside int.
func maximizeSquareHoleArea(n int, m int, hBars []int, vBars []int) int {
	longestRun := func(bars []int) int {
		sort.Ints(bars)
		best, cur := 1, 1
		for i := 1; i < len(bars); i++ {
			if bars[i] == bars[i-1]+1 {
				cur++
			} else {
				cur = 1
			}
			if cur > best {
				best = cur
			}
		}
		return best
	}
	side := longestRun(hBars)
	if v := longestRun(vBars); v < side {
		side = v
	}
	return (side + 1) * (side + 1)
}
