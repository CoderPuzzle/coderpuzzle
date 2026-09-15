func reconstructMatrix(upper int, lower int, colsum []int) [][]int {
	n := len(colsum)
	twos, ones := 0, 0
	for _, s := range colsum {
		switch s {
		case 2:
			twos++
		case 1:
			ones++
		}
	}
	// Every 2 spends one from each row; the top row cannot exceed its cap.
	if 2*twos+ones != upper+lower || upper < twos || upper > twos+ones {
		return [][]int{}
	}
	// First (upper - twos) free columns go on top; nothing else is chosen.
	freeTop := upper - twos
	top := make([]int, n)
	bottom := make([]int, n)
	for i, s := range colsum {
		if s == 2 {
			top[i], bottom[i] = 1, 1
		} else if s == 1 {
			if freeTop > 0 {
				top[i] = 1
				freeTop--
			} else {
				bottom[i] = 1
			}
		}
	}
	return [][]int{top, bottom}
}
