import (
	"math"
	"math/cmplx"
)

func multiply(poly1 []int, poly2 []int) []int64 {
	// Schoolbook multiplication is 2.5 * 10^9 products at the constraint
	// limits, so the product is computed with an iterative radix-2 FFT
	// over complex128 values: pad to a power of two, transform both
	// polynomials, multiply pointwise, transform back, round. Rounding
	// is exact here -- with coefficients bounded by 10^3 and lengths by
	// 5*10^4 the largest product coefficient is 5*10^10, and the
	// double-FFT error bound (sum of squared inputs < 9*10^14, here
	// 10^11) keeps the error far below the 0.5 rounding threshold.
	// Results reach 5*10^10, past 32-bit range, so int64 is returned.
	resultLen := len(poly1) + len(poly2) - 1
	n := 1
	for n < resultLen {
		n <<= 1
	}
	fa := make([]complex128, n)
	fb := make([]complex128, n)
	for i, v := range poly1 {
		fa[i] = complex(float64(v), 0)
	}
	for i, v := range poly2 {
		fb[i] = complex(float64(v), 0)
	}
	fft(fa, false, n)
	fft(fb, false, n)
	for i := range fa {
		fa[i] *= fb[i]
	}
	fft(fa, true, n)
	result := make([]int64, resultLen)
	for i := range result {
		result[i] = int64(math.Round(real(fa[i])))
	}
	return result
}

func fft(a []complex128, invert bool, n int) {
	for i, j := 1, 0; i < n; i++ {
		bit := n >> 1
		for ; j&bit != 0; bit >>= 1 {
			j ^= bit
		}
		j |= bit
		if i < j {
			a[i], a[j] = a[j], a[i]
		}
	}
	for length := 2; length <= n; length <<= 1 {
		ang := -2 * math.Pi / float64(length)
		if invert {
			ang = -ang
		}
		step := cmplx.Exp(complex(0, ang))
		for i := 0; i < n; i += length {
			w := complex(1, 0)
			for k := i; k < i+length/2; k++ {
				u := a[k]
				v := a[k+length/2] * w
				a[k] = u + v
				a[k+length/2] = u - v
				w *= step
			}
		}
	}
	if invert {
		inv := complex(1/float64(n), 0)
		for i := range a {
			a[i] *= inv
		}
	}
}
