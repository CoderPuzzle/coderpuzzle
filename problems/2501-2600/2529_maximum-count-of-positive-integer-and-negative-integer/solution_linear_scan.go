// The statement defines the answer outright: neg counts the entries below
// zero, pos counts the entries above zero, and zeros join neither camp.
// One walk over nums tallies both counts.
func maximumCount(nums []int) int {
	neg := 0
	pos := 0
	for _, value := range nums {
		if value < 0 {
			neg++
		} else if value > 0 {
			pos++
		}
	}
	if neg > pos {
		return neg
	}
	return pos
}
