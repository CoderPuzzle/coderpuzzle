// Every super ugly number past 1 is a listed prime times a smaller one, so
// build the sequence in order: one pointer per prime into the built prefix,
// plus its cached candidate primes[p] * ugly[index[p]]. The next value is
// the smallest candidate; advancing EVERY pointer whose candidate hit that
// minimum keeps duplicates (6 = 2*3 = 3*2) out of the sequence. Candidates
// are int64: they overshoot the 32-bit-fitting answer by up to one factor
// of the largest prime.
func nthSuperUglyNumber(n int, primes []int) int {
	k := len(primes)
	ugly := make([]int64, n)
	candidate := make([]int64, k)
	index := make([]int, k)
	ugly[0] = 1
	for p, prime := range primes {
		candidate[p] = int64(prime)
	}
	for i := 1; i < n; i++ {
		next := candidate[0]
		for _, value := range candidate {
			if value < next {
				next = value
			}
		}
		ugly[i] = next
		for p, prime := range primes {
			if candidate[p] == next {
				index[p]++
				candidate[p] = int64(prime) * ugly[index[p]]
			}
		}
	}
	return int(ugly[n-1])
}
