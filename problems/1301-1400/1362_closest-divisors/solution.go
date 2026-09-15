import "math"

func closestDivisors(num int) []int {
	// The closest pair for a product m has its smaller factor as large as
	// possible: the first divisor found walking down from isqrt(m).
	closest := func(m int64) []int {
		d := int64(math.Sqrt(float64(m)))
		for d*d > m {
			d--
		}
		for (d+1)*(d+1) <= m && m%(d+1) == 0 {
			d++
		}
		for m%d != 0 {
			d--
		}
		return []int{int(d), int(m / d)}
	}
	a := closest(int64(num) + 1)
	b := closest(int64(num) + 2)
	if a[1]-a[0] <= b[1]-b[0] {
		return a
	}
	return b
}
