func minimumMoves(s string) int {
	moves := 0
	for index := 0; index < len(s); {
		if s[index] == 'X' {
			moves++
			index += 3
		} else {
			index++
		}
	}
	return moves
}
