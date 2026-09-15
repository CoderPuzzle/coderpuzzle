func queensAttacktheKing(queens [][]int, king []int) [][]int {
	board := [8][8]bool{}
	for _, queen := range queens {
		board[queen[0]][queen[1]] = true
	}
	out := [][]int{}
	for dx := -1; dx <= 1; dx++ {
		for dy := -1; dy <= 1; dy++ {
			if dx == 0 && dy == 0 {
				continue
			}
			// First queen on each ray attacks; she also blocks the rest.
			x, y := king[0]+dx, king[1]+dy
			for x >= 0 && x < 8 && y >= 0 && y < 8 {
				if board[x][y] {
					out = append(out, []int{x, y})
					break
				}
				x += dx
				y += dy
			}
		}
	}
	return out
}
