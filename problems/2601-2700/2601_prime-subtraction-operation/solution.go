import "sort"

// Sieve once up to max(nums): every usable prime sits below nums[i].
func primeSubOperation(nums []int) bool {
	limit := 0
	for _, x := range nums {
		if x > limit {
			limit = x
		}
	}
	composite := make([]bool, limit+1)
	var primes []int
	for i := 2; i <= limit; i++ {
		if !composite[i] {
			primes = append(primes, i)
			for j := i * i; j <= limit; j += i {
				composite[j] = true
			}
		}
	}
	prev := 0
	for _, x := range nums {
		// Want the largest prime p with p < x and x-p > prev, which is the
		// largest p <= x-prev-1 (always < x). Subtracting it then beats
		// leaving x untouched, since the result is smaller yet still above
		// prev. SearchInts(primes, x-prev) - 1 indexes that largest prime.
		index := sort.SearchInts(primes, x-prev) - 1
		if index >= 0 {
			prev = x - primes[index]
		} else if x > prev {
			prev = x
		} else {
			return false
		}
	}
	return true
}
