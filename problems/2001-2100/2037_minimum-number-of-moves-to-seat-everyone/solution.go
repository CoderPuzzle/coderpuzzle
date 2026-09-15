import "sort"

func minMovesToSeat(seats []int, students []int) int {
	sort.Ints(seats)
	sort.Ints(students)

	moves := 0
	for i, seat := range seats {
		distance := seat - students[i]
		if distance < 0 {
			distance = -distance
		}
		moves += distance
	}
	return moves
}
