// A boomerang is pinned by its apex: the other two points merely have to sit
// at the same distance from it, so group every other point by squared
// distance — equal squares mean equal lengths, and no square root ever gets
// the chance to round.
func numberOfBoomerangs(points [][]int) int {
	total := 0
	for i, apex := range points {
		counts := make(map[int64]int, len(points))
		for j, other := range points {
			if j == i {
				continue
			}
			dx := int64(other[0] - apex[0])
			dy := int64(other[1] - apex[1])
			counts[dx*dx+dy*dy]++
		}
		// c points at one distance fill the two ordered slots of the tuple in
		// c * (c - 1) ways — either of them may come first.
		for _, c := range counts {
			total += c * (c - 1)
		}
	}
	return total
}
