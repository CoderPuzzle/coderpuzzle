import (
	"math"
	"sort"
)

func findMinArrowShots(points [][]int) int {
	ordered := make([][]int, len(points))
	copy(ordered, points)
	sort.Slice(ordered, func(i, j int) bool { return ordered[i][1] < ordered[j][1] })
	// Point-cover greedy: sort by right endpoint and shoot at the right end
	// of the first unburst balloon — among points covering it, the right
	// endpoint covers every interval any earlier point could.
	arrows := 0
	// Sentinel below any coordinate (coordinates span signed 32-bit).
	lastArrow := int64(math.MinInt64)
	for _, p := range ordered {
		// Strict >: intervals are closed, so start == lastArrow is already
		// burst; otherwise shoot at the earliest end remaining.
		if int64(p[0]) > lastArrow {
			arrows++
			lastArrow = int64(p[1])
		}
	}
	return arrows
}
