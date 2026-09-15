// A point lies in the circle exactly when its squared euclidean distance
// to the center is at most r*r. Squaring keeps everything in integers
// (values stay below 2*500*500), so border points are judged exactly
// where sqrt rounding could misclassify them.
func countPoints(points [][]int, queries [][]int) []int {
	answer := make([]int, len(queries))
	for j, q := range queries {
		xj, yj, rr := q[0], q[1], q[2]*q[2]
		count := 0
		for _, p := range points {
			dx, dy := p[0]-xj, p[1]-yj
			if dx*dx+dy*dy <= rr {
				count++
			}
		}
		answer[j] = count
	}
	return answer
}
