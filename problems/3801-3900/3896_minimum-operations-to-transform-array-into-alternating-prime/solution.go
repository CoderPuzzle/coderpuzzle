func minOperations(nums []int) int {
	// Sieve of Eratosthenes up to a fixed bound. Every nums[i] is at
	// most 1e5, and the largest prime gap below 1e5 is far smaller
	// than the margin, so the next prime (or next non-prime) after any
	// element always lies inside the table.
	limit := 300000
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	for p := 2; p*p <= limit; p++ {
		if isPrime[p] {
			for multiple := p * p; multiple <= limit; multiple += p {
				isPrime[multiple] = false
			}
		}
	}

	total := 0
	for i, original := range nums {
		x := original
		if i%2 == 0 {
			for !isPrime[x] {
				x++
			}
		} else {
			for isPrime[x] {
				x++
			}
		}
		total += x - original
	}
	return total
}
