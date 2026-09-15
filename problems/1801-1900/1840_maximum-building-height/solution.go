import "sort"

// Only restricted points (plus building 1 at height 0) matter. Sort by
// id; two passes make each cap consistent with reachability from its
// neighbors; between consecutive pinned points the best peak is the floor
// of (lh + rh + gap) / 2, and past the last pin the height simply ramps
// to its cap + distance.
func maxBuilding(n int, restrictions [][]int) int {
	type point struct {
		id  int
		cap int64
	}
	points := make([]point, 0, len(restrictions)+1)
	points = append(points, point{1, 0})
	for _, r := range restrictions {
		points = append(points, point{r[0], int64(r[1])})
	}
	sort.Slice(points, func(a, b int) bool { return points[a].id < points[b].id })
	for k := 1; k < len(points); k++ {
		if reach := points[k-1].cap + int64(points[k].id-points[k-1].id); reach < points[k].cap {
			points[k].cap = reach
		}
	}
	for k := len(points) - 2; k >= 0; k-- {
		if reach := points[k+1].cap + int64(points[k+1].id-points[k].id); reach < points[k].cap {
			points[k].cap = reach
		}
	}
	var best int64
	for k := 1; k < len(points); k++ {
		gap := int64(points[k].id - points[k-1].id)
		if cand := (points[k-1].cap + points[k].cap + gap) / 2; cand > best {
			best = cand
		}
	}
	if tail := points[len(points)-1].cap + int64(n-points[len(points)-1].id); tail > best {
		best = tail
	}
	return int(best)
}
