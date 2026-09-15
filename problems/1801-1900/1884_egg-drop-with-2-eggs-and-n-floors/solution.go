func twoEggDrop(n int) int {
	cover, moves := 0, 0
	// cover = tallest building solvable with `moves` moves and 2 eggs.
	for cover < n {
		moves++
		// First drop goes at cover+1: m-1 floors below for the surviving egg's
		// linear scan, cover(m-1) floors above — so cover(m) = cover(m-1) + m,
		// i.e. the triangular numbers m(m+1)/2.
		cover += moves
	}
	// Smallest move budget whose triangular coverage reaches n.
	return moves
}
