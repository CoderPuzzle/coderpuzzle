func myPow(x float64, n int) float64 {
	power := func(base float64, exp int64) float64 {
		// Exponentiation by squaring: x^n = (x^2)^(n/2) when n is even and
		// x * (x^2)^((n-1)/2) when odd, so halving the exponent every step
		// turns the linear chain into O(log n) multiplications. Walk exp's
		// bits from least to most significant.
		result := 1.0
		for exp != 0 {
			// A set bit folds the current square into the result.
			if exp&1 == 1 {
				result *= base
			}
			base *= base
			exp >>= 1
		}
		// result = product of x^(2^k) over exactly the set bits k of the
		// original exponent; exp == 0 skips the loop and yields 1.0.
		return result
	}
	// Widen before negating: -(-2^31) = 2^31 overflows an int32.
	exp := int64(n)
	if exp < 0 {
		// By symmetry x^n = 1 / x^(-n).
		return 1.0 / power(x, -exp)
	}
	return power(x, exp)
}
