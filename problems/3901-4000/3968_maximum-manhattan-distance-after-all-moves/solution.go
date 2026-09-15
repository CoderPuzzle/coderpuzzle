func maxDistance(moves string) int {
	x, y, wildcard := 0, 0, 0
	for i := 0; i < len(moves); i++ {
		switch moves[i] {
		case 'R':
			x++
		case 'L':
			x--
		case 'U':
			y++
		case 'D':
			y--
		default:
			wildcard++
		}
	}
	if x < 0 {
		x = -x
	}
	if y < 0 {
		y = -y
	}
	return x + y + wildcard
}
