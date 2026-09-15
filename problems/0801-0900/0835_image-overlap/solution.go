// A translation slides every 1 of one image by one shared vector, so a 1
// at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly under the
// shift that carries (i2, j2) onto (i1, j1) — the delta between the two
// cells. Counting over all pairs of 1-cells how often each delta occurs
// scores every shift at once, and the largest count is the largest
// overlap. Delta components lie in [-29, 29], so the packed key
// dr*100 + dc is injective.
func largestOverlap(img1 [][]int, img2 [][]int) int {
	ones1 := make([][2]int, 0)
	ones2 := make([][2]int, 0)
	for i, row := range img1 {
		for j, v := range row {
			if v == 1 {
				ones1 = append(ones1, [2]int{i, j})
			}
		}
	}
	for i, row := range img2 {
		for j, v := range row {
			if v == 1 {
				ones2 = append(ones2, [2]int{i, j})
			}
		}
	}
	counts := make(map[[2]int]int)
	best := 0
	for _, a := range ones1 {
		for _, b := range ones2 {
			delta := [2]int{a[0] - b[0], a[1] - b[1]}
			counts[delta]++
			if counts[delta] > best {
				best = counts[delta]
			}
		}
	}
	return best
}
