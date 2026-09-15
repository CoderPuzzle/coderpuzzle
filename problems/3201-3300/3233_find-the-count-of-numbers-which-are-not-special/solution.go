import "math"

// A number is special exactly when it is the square of a prime: p*p has
// precisely the proper divisors 1 and p, any other number has more than
// two (three divisors total forces the form prime^2), and 1 itself has
// none. The specials in [l, r] are therefore the squares of primes in
// [ceil(sqrt(l)), floor(sqrt(r))] — at most sqrt(10^9) ~ 31623
// candidates, counted with one sieve. Square roots start from math.Sqrt
// but are corrected with exact integer multiplies; the boundary squares
// are held in int64 explicitly, so rounding can never move a boundary.
func nonSpecialCount(l int, r int) int {
	isqrt := func(x int64) int64 {
		s := int64(math.Sqrt(float64(x)))
		for s*s > x {
			s--
		}
		for (s+1)*(s+1) <= x {
			s++
		}
		return s
	}
	hi := isqrt(int64(r))
	lo := isqrt(int64(l)-1) + 1 // smallest s with s*s >= l
	composite := make([]bool, hi+1)
	specials := int64(0)
	for p := int64(2); p <= hi; p++ {
		if composite[p] {
			continue
		}
		if p >= lo {
			specials++
		}
		for m := p * p; m <= hi; m += p {
			composite[m] = true
		}
	}
	return int(int64(r) - int64(l) + 1 - specials)
}
