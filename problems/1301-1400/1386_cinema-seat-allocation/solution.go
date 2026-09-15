func maxNumberOfFamilies(n int, reservedSeats [][]int) int {
	left := 0b0000011110  // seats 2-5
	right := 0b0111100000 // seats 6-9
	middle := 0b0001111000
	masks := make(map[int]int)
	for _, seat := range reservedSeats {
		masks[seat[0]] |= 1 << (seat[1] - 1)
	}
	groups := 2 * (n - len(masks))
	for _, mask := range masks {
		if mask&(left|right) == 0 {
			groups += 2
		} else if mask&left == 0 || mask&middle == 0 || mask&right == 0 {
			groups += 1
		}
	}
	return groups
}
