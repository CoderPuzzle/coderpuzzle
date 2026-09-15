func distinctPrimeFactors(nums []int) int {
	// The prime-support pin is the same; the factor source changes. One
	// sieve pass records the smallest prime factor of every value up to
	// max(nums), and each element then falls apart by repeated division:
	// the next piece of the remaining quotient is always a table lookup,
	// never a candidate search. Peeling each prime out completely keeps
	// the walk on sieve entries; values are <= 1000, so an element holds
	// at most 9 prime pieces (2^10 overshoots).
	limit := 0
	for _, value := range nums {
		if value > limit {
			limit = value
		}
	}
	spf := make([]int, limit+1)
	for i := range spf {
		spf[i] = i
	}
	for i := 2; i*i <= limit; i++ {
		if spf[i] == i {
			for j := i * i; j <= limit; j += i {
				if spf[j] == j {
					spf[j] = i
				}
			}
		}
	}
	primes := make(map[int]bool)
	for _, value := range nums {
		rest := value
		for rest > 1 {
			p := spf[rest]
			primes[p] = true
			for rest%p == 0 {
				rest /= p
			}
		}
	}
	return len(primes)
}
