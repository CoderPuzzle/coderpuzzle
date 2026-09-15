func findGameWinner(n int) bool {
	twoBack, oneBack := 0, 0
	childXor := 0

	for order := 1; order <= n; order++ {
		childXor = twoBack ^ oneBack
		current := 1 + childXor
		twoBack, oneBack = oneBack, current
	}

	return childXor != 0
}
