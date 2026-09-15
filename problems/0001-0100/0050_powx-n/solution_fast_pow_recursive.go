func myPow(x float64, n int) float64 {
	var power func(base float64, exp int64) float64
	power = func(base float64, exp int64) float64 {
		// Exponentiation by halving: compute the square of the half-size
		// subproblem once, then use it once (even exp) or twice (odd) —
		// x^n = (x^(n/2))^2, times x when exp is odd.
		if exp == 0 {
			// Base case: any nonzero base to the zero is 1.0.
			return 1.0
		}
		half := power(base, exp/2)
		if exp%2 == 0 {
			return half * half
		}
		// One leftover factor of x for the odd exponent.
		return half * half * base
	}
	// Widen before negating: -(-2^31) = 2^31 overflows an int32.
	exp := int64(n)
	if exp < 0 {
		// By symmetry x^n = 1 / x^(-n).
		return 1.0 / power(x, -exp)
	}
	return power(x, exp)
}
