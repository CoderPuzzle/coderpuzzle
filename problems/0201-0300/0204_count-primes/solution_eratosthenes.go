func countPrimes(n int) int {
	// No primes strictly below 2.
	if n < 3 {
		return 0
	}
	// Sieve of Eratosthenes: whatever is never marked composite was not a
	// multiple of anything smaller, so it is prime.
	isComposite := make([]bool, n)
	count := 0
	for i := 2; i < n; i++ {
		if !isComposite[i] {
			count++
			// Cross off multiples starting at i*i — smaller multiples were
			// marked by their smaller factors.
			if i*i < n {
				for j := i * i; j < n; j += i {
					isComposite[j] = true
				}
			}
		}
	}
	return count
}
