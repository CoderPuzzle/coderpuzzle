// One pass keeping the first and the last prime-bearing index; the answer
// is their distance. Primality by trial division is cheap because values
// never exceed 100 (at most 9 divisor probes).
func maximumPrimeDifference(nums []int) int {
	isPrime := func(v int) bool {
		if v < 2 {
			return false
		}
		for d := 2; d*d <= v; d++ {
			if v%d == 0 {
				return false
			}
		}
		return true
	}
	first, last := -1, -1
	for i, v := range nums {
		if !isPrime(v) {
			continue
		}
		if first == -1 {
			first = i
		}
		last = i
	}
	return last - first
}
