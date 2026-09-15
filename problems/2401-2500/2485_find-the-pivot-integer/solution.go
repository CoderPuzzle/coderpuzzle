import "math"

func pivotInteger(n int) int {
	// The pivot x satisfies sum(1..x) == sum(x..n). Both sides collapse to
	// x(x+1)/2 and n(n+1)/2 - (x-1)x/2, so 2x^2 = n(n+1): the pivot exists
	// exactly when the total sum is a perfect square, and equals its square
	// root. n <= 1000 keeps the square root exact in double precision.
	total := n * (n + 1) / 2
	r := int(math.Sqrt(float64(total)))
	if r*r == total {
		return r
	}
	return -1
}
