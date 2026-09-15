// Each command moves exactly one coordinate by one step; the statement's
// guarantee keeps both within [0, n), so no boundary checks are needed.
func finalPositionOfSnake(n int, commands []string) int {
	row, col := 0, 0
	for _, command := range commands {
		switch command {
		case "UP":
			row--
		case "DOWN":
			row++
		case "LEFT":
			col--
		default: // "RIGHT"
			col++
		}
	}
	return row*n + col
}
