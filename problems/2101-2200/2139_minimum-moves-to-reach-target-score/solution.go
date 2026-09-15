func minMoves(target int, maxDoubles int) int {
	moves := 0
	for target > 1 && maxDoubles > 0 {
		if target%2 == 1 {
			target--
		} else {
			target /= 2
			maxDoubles--
		}
		moves++
	}
	return moves + target - 1
}
