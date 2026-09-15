// Sieve of Eratosthenes marks which indices are prime in O(n log log n); a
// single pass then routes each element to A or B.
func splitArray(nums []int) int64 {
	n := len(nums)
	isPrime := make([]bool, n)
	for i := range isPrime {
		isPrime[i] = true
	}
	if n > 0 {
		isPrime[0] = false
	}
	if n > 1 {
		isPrime[1] = false
	}
	for p := 2; p*p < n; p++ {
		if !isPrime[p] {
			continue
		}
		for multiple := p * p; multiple < n; multiple += p {
			isPrime[multiple] = false
		}
	}

	var sumA, sumB int64
	for index, value := range nums {
		if isPrime[index] {
			sumA += int64(value)
		} else {
			sumB += int64(value)
		}
	}
	// |sum(A) - sum(B)| can reach ~1e14, so the sums are int64.
	diff := sumA - sumB
	if diff < 0 {
		return -diff
	}
	return diff
}
