func isWinner(player1 []int, player2 []int) int {
	// A turn is worth double the pins when either of the two previous turns
	// was a strike (10); each score is one linear pass.
	score1 := score(player1)
	score2 := score(player2)
	switch {
	case score1 > score2:
		return 1
	case score2 > score1:
		return 2
	default:
		return 0
	}
}

func score(values []int) int {
	total := 0
	for index, pins := range values {
		doubled := false
		for j := index - 2; j < index; j++ {
			if j >= 0 && values[j] == 10 {
				doubled = true
			}
		}
		if doubled {
			total += 2 * pins
		} else {
			total += pins
		}
	}
	return total
}
