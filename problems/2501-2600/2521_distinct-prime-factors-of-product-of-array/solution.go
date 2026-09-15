func distinctPrimeFactors(nums []int) int {
	// The product never gets built (per the hint, it is astronomically
	// large): a prime divides the product exactly when it divides some
	// single element. Factor each element by trial division, peeling every
	// copy of a found factor so only primes escape the loop; values are
	// <= 1000, so candidates stay <= 31 once squared.
	primes := make(map[int]bool)
	for _, value := range nums {
		rest := value
		for d := 2; d*d <= rest; d++ {
			if rest%d == 0 {
				primes[d] = true
				for rest%d == 0 {
					rest /= d
				}
			}
		}
		if rest > 1 {
			primes[rest] = true
		}
	}
	return len(primes)
}
