func findPrimePairs(n int) [][]int {
	// Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
	// then cross off each prime's multiples. Any composite has a factor
	// <= its square root, so i * i is where the crossing-off starts.
	isPrime := make([]bool, n+1)
	for i := 2; i <= n; i++ {
		isPrime[i] = true
	}
	for i := 2; i*i <= n; i++ {
		if isPrime[i] {
			for multiple := i * i; multiple <= n; multiple += i {
				isPrime[multiple] = false
			}
		}
	}
	// Scan the smaller endpoint only: x <= n / 2 forces y = n - x >= x,
	// so every pair appears once, and ascending x gives the required
	// order for free. The smallest prime pair sums to 2 + 2 = 4, so any
	// n below that leaves the list empty.
	pairs := [][]int{}
	for x := 2; x <= n/2; x++ {
		if isPrime[x] && isPrime[n-x] {
			pairs = append(pairs, []int{x, n - x})
		}
	}
	return pairs
}
