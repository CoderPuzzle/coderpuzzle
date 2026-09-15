// One pass remembering the previous seated index. The empties before the
// first person are best entered at seat 0, the empties between two people
// at the middle of the gap.
func maxDistToClosest(seats []int) int {
	n := len(seats)
	prev := -1
	best := 0
	for i, seat := range seats {
		if seat == 1 {
			if prev < 0 {
				// Leading empties: seat 0 is distance i from the person.
				best = i
			} else {
				// Between two people: the middle of the gap wins.
				best = max(best, (i-prev)/2)
			}
			prev = i
		}
	}
	// Trailing empties: the far end of the row, seat n - 1.
	return max(best, n-1-prev)
}
