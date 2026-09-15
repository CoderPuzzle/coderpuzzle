import "math/bits"

// A 0/1 table indexed by set-bit count holds the primality verdict for
// every count the bound allows: right <= 10^6 fits in twenty bits, so the
// count is 1..19 and the primes there are 2, 3, 5, 7, 11, 13, 17, 19.
// Index 1 holds 0 — a lone set bit, the value 1 and every power of two,
// is not prime — so each candidate costs one popcount plus one table read.
func countPrimeSetBits(left int, right int) int {
	isPrime := [21]int{}
	for _, p := range []int{2, 3, 5, 7, 11, 13, 17, 19} {
		isPrime[p] = 1
	}
	count := 0
	for n := left; n <= right; n++ {
		count += isPrime[bits.OnesCount(uint(n))]
	}
	return count
}
