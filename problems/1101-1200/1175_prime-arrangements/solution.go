func numPrimeArrangements(n int) int {
	const MOD = 1000000007

	// Sieve of Eratosthenes up to n.
	isPrime := make([]bool, n+1)
	for m := 2; m <= n; m++ {
		isPrime[m] = true
	}
	for p := 2; p*p <= n; p++ {
		if isPrime[p] {
			for multiple := p * p; multiple <= n; multiple += p {
				isPrime[multiple] = false
			}
		}
	}
	primes := 0
	for m := 0; m <= n; m++ {
		if isPrime[m] {
			primes++
		}
	}

	// Primes may permute over prime indices; everything else (1 and
	// the composites) permutes over the rest. Independent choices.
	result := 1
	for k := 2; k <= primes; k++ {
		result = result * k % MOD
	}
	for k := 2; k <= n-primes; k++ {
		result = result * k % MOD
	}
	return result
}
