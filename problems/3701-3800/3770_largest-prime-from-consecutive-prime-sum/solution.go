func largestPrime(n int) int64 {
	// Sieve once: it answers primality for every prime and for every
	// running total the scan below produces.
	sieve := make([]bool, n+1)
	for i := range sieve {
		sieve[i] = true
	}
	sieve[0] = false
	if n >= 1 {
		sieve[1] = false
	}
	for i := 2; int64(i)*int64(i) <= int64(n); i++ {
		if sieve[i] {
			for j := i * i; j <= n; j += i {
				sieve[j] = false
			}
		}
	}
	// Prefix sums of the prime sequence are exactly the consecutive prime
	// sums starting from 2; totals only grow, so the last prime one seen
	// before the total exceeds n is the largest. Totals pass the 32-bit
	// range near n = 5 * 10^5, so they accumulate in an int64.
	var total int64
	var best int64
	for p := 2; p <= n; p++ {
		if !sieve[p] {
			continue
		}
		total += int64(p)
		if total > int64(n) {
			break
		}
		if sieve[total] {
			best = total
		}
	}
	return best
}
