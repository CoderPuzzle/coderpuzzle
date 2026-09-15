func nthPersonGetsNthSeat(n int) float64 {
	// The floating claim ends by taking seat 1 or seat n, each equally
	// likely; the last passenger wins exactly when seat 1 goes first.
	if n == 1 {
		return 1.0
	}
	return 0.5
}
