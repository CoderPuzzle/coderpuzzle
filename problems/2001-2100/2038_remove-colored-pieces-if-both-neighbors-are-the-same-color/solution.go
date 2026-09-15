func winnerOfGame(colors string) bool {
	aliceMoves := 0
	bobMoves := 0

	for i := 1; i+1 < len(colors); i++ {
		if colors[i-1] == colors[i] && colors[i] == colors[i+1] {
			if colors[i] == 'A' {
				aliceMoves++
			} else {
				bobMoves++
			}
		}
	}

	return aliceMoves > bobMoves
}
