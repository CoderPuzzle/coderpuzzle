// The constraints are tiny, so replay the process literally: for every
// zero cell walk both directions on a scratch copy. A zero cell advances
// curr; a positive cell is decremented and flips the direction before the
// step. A selection counts when the walk leaves the array with every value
// at zero.
func countValidSelections(nums []int) int {
	finishes := func(start, step int) bool {
		cells := append([]int(nil), nums...)
		curr := start
		for curr >= 0 && curr < len(cells) {
			if cells[curr] == 0 {
				curr += step
			} else {
				cells[curr]--
				step = -step
				curr += step
			}
		}
		for _, cell := range cells {
			if cell != 0 {
				return false
			}
		}
		return true
	}
	total := 0
	for i, value := range nums {
		if value == 0 {
			if finishes(i, 1) {
				total++
			}
			if finishes(i, -1) {
				total++
			}
		}
	}
	return total
}
