func smallestEvenMultiple(n int) int {
	// A multiple of both 2 and n is a multiple of lcm(2, n). When n is
	// even, n already carries the factor 2 and is its own lcm; odd n
	// needs the 2 supplied, so the answer doubles it.
	if n%2 == 0 {
		return n
	}
	return 2 * n
}
