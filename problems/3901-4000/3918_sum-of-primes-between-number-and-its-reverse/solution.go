func sumOfPrimesInRange(n int) int {
	limit := 1000
	isPrime := make([]bool, limit+1)
	for i := range isPrime {
		isPrime[i] = true
	}
	isPrime[0] = false
	isPrime[1] = false
	for p := 2; p*p <= limit; p++ {
		if !isPrime[p] {
			continue
		}
		for multiple := p * p; multiple <= limit; multiple += p {
			isPrime[multiple] = false
		}
	}

	prefix := make([]int, limit+1)
	for value := 1; value <= limit; value++ {
		prefix[value] = prefix[value-1]
		if isPrime[value] {
			prefix[value] += value
		}
	}

	reverse := 0
	remaining := n
	for remaining > 0 {
		reverse = reverse*10 + remaining%10
		remaining /= 10
	}

	low, high := n, reverse
	if reverse < low {
		low, high = reverse, n
	}
	return prefix[high] - prefix[low-1]
}
