import "sort"

func outerTrees(trees [][]int) [][]int {
	sorted := make([][]int, len(trees))
	copy(sorted, trees)
	sort.Slice(sorted, func(i, j int) bool {
		if sorted[i][0] != sorted[j][0] {
			return sorted[i][0] < sorted[j][0]
		}
		return sorted[i][1] < sorted[j][1]
	})
	points := [][]int{}
	for _, p := range sorted {
		if len(points) > 0 {
			last := points[len(points)-1]
			if last[0] == p[0] && last[1] == p[1] {
				continue
			}
		}
		points = append(points, p)
	}
	if len(points) <= 1 {
		out := make([][]int, len(points))
		for i, p := range points {
			out[i] = []int{p[0], p[1]}
		}
		return out
	}

	cross := func(o, a, b []int) int {
		return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])
	}

	// Strict convex hull vertices (cross <= 0 pops collinear interior points).
	lower := [][]int{}
	for _, p := range points {
		for len(lower) >= 2 && cross(lower[len(lower)-2], lower[len(lower)-1], p) <= 0 {
			lower = lower[:len(lower)-1]
		}
		lower = append(lower, p)
	}
	upper := [][]int{}
	for i := len(points) - 1; i >= 0; i-- {
		p := points[i]
		for len(upper) >= 2 && cross(upper[len(upper)-2], upper[len(upper)-1], p) <= 0 {
			upper = upper[:len(upper)-1]
		}
		upper = append(upper, p)
	}
	hull := append(append([][]int{}, lower[:len(lower)-1]...), upper[:len(upper)-1]...)

	result := make([][]int, 0, len(points))
	for _, p := range hull {
		result = append(result, []int{p[0], p[1]})
	}
	n := len(hull)
	if n < 2 {
		out := make([][]int, len(points))
		for i, p := range points {
			out[i] = []int{p[0], p[1]}
		}
		return out
	}

	inResult := map[[2]int]bool{}
	for _, p := range hull {
		inResult[[2]int{p[0], p[1]}] = true
	}
	// Add collinear points lying on hull edges (boundary points not at vertices).
	for i := 0; i < n; i++ {
		a := hull[i]
		b := hull[(i+1)%n]
		for _, p := range points {
			if inResult[[2]int{p[0], p[1]}] {
				continue
			}
			if cross(a, b, p) == 0 {
				if min(a[0], b[0]) <= p[0] && p[0] <= max(a[0], b[0]) &&
					min(a[1], b[1]) <= p[1] && p[1] <= max(a[1], b[1]) {
					result = append(result, []int{p[0], p[1]})
					inResult[[2]int{p[0], p[1]}] = true
				}
			}
		}
	}
	return result
}
