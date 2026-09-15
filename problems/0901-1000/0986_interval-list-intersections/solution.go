func intervalIntersection(firstList [][]int, secondList [][]int) [][]int {
	result := [][]int{}
	i, j := 0, 0
	for i < len(firstList) && j < len(secondList) {
		// The overlap of the two current intervals is [max starts,
		// min ends]; lo <= hi means they intersect (closed intervals,
		// so touching endpoints still count).
		lo := firstList[i][0]
		if secondList[j][0] > lo {
			lo = secondList[j][0]
		}
		hi := firstList[i][1]
		if secondList[j][1] < hi {
			hi = secondList[j][1]
		}
		if lo <= hi {
			result = append(result, []int{lo, hi})
		}
		// Retire the interval that ends earlier: later intervals in the
		// other list start strictly after its end, so it is done forever.
		if firstList[i][1] < secondList[j][1] {
			i++
		} else {
			j++
		}
	}
	return result
}
