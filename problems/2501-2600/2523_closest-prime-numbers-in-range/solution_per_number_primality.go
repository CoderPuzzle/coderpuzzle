func closestPrimes(left int, right int) []int {
	// Per-number trial division judges each candidate in [left, right]
	// on its own: 2 and 3 fall to a single modulo each, and every
	// remaining prime divisor is a neighbor of a multiple of six, so
	// the test tries d and d + 2 while stepping d by six, stopping
	// once d * d passes n. One ascending scan then keeps only the
	// previous prime seen, replacing on strict improvement to keep
	// the earliest p among ties.
	bestPair := []int{-1, -1}
	previous := -1
	for n := left; n <= right; n++ {
		if !isPrime(n) {
			continue
		}
		if previous != -1 && (bestPair[0] == -1 || n-previous < bestPair[1]-bestPair[0]) {
			bestPair[0], bestPair[1] = previous, n
		}
		previous = n
	}
	return bestPair
}

func isPrime(n int) bool {
	if n < 2 {
		return false
	}
	if n < 4 {
		return true
	}
	if n%2 == 0 || n%3 == 0 {
		return false
	}
	for d := 5; d*d <= n; d += 6 {
		if n%d == 0 || n%(d+2) == 0 {
			return false
		}
	}
	return true
}
