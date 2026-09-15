func canAliceWin(n int) bool {
	// Simulate the forced play: removal sizes drop 10, 9, 8, ... and
	// whoever faces a pile smaller than their removal size loses.
	aliceToMove := true
	take := 10
	for n >= take {
		n -= take
		take--
		aliceToMove = !aliceToMove
	}
	return !aliceToMove
}
