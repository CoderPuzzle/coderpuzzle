import (
	"sort"
	"strconv"
)

func sumOfLargestPrimes(s string) int64 {
	// Collect distinct substring values (leading zeros vanish on parse),
	// walk them from the largest down, and primality-test each by trial
	// division until three primes have been summed.
	n := len(s)
	seen := make(map[int64]bool)
	for i := 0; i < n; i++ {
		for j := i + 1; j <= n; j++ {
			v, _ := strconv.ParseInt(s[i:j], 10, 64)
			seen[v] = true
		}
	}
	values := make([]int64, 0, len(seen))
	for v := range seen {
		values = append(values, v)
	}
	sort.Slice(values, func(a, b int) bool { return values[a] > values[b] })
	total := int64(0)
	found := 0
	for _, v := range values {
		if isPrime(v) {
			total += v
			found++
			if found == 3 {
				break
			}
		}
	}
	return total
}

func isPrime(v int64) bool {
	if v < 2 {
		return false
	}
	if v%2 == 0 {
		return v == 2
	}
	for f := int64(3); f*f <= v; f += 2 {
		if v%f == 0 {
			return false
		}
	}
	return true
}
