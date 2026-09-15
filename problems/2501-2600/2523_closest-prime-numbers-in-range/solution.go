func closestPrimes(left int, right int) []int {
	// Sieve of Eratosthenes up to right marks every prime once; one
	// ascending pass over [left, right] then walks only consecutive
	// primes, since a larger gap spanning a skipped prime can never beat
	// the adjacent gaps inside it. Replacing on strict improvement keeps
	// the earliest num1 among ties.
	sieve := make([]bool, right+1)
	for i := range sieve {
		sieve[i] = true
	}
	if right >= 0 {
		sieve[0] = false
	}
	if right >= 1 {
		sieve[1] = false
	}
	for f := 2; f*f <= right; f++ {
		if !sieve[f] {
			continue
		}
		for m := f * f; m <= right; m += f {
			sieve[m] = false
		}
	}
	bestPair := []int{-1, -1}
	previous := -1
	for n := left; n <= right; n++ {
		if !sieve[n] {
			continue
		}
		if previous != -1 && (bestPair[0] == -1 || n-previous < bestPair[1]-bestPair[0]) {
			bestPair[0], bestPair[1] = previous, n
		}
		previous = n
	}
	return bestPair
}
