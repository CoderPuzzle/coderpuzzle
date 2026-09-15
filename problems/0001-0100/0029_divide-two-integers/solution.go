import "math"

// Divide by repeated subtraction with exponential search: each pass strips the
// largest power-of-two block of divisors that still fits, built by addition.
func divide(dividend int, divisor int) int {
	// The one quotient that does not fit in 32 bits: -2^31 divided by -1 is 2^31.
	// Clamped up front per the statement's rule.
	if dividend == math.MinInt32 && divisor == -1 {
		return math.MaxInt32
	}
	// MinInt32 has no positive 32-bit counterpart, so widen before magnitudes.
	a := int64(dividend)
	if a < 0 {
		a = -a
	}
	b := int64(divisor)
	if b < 0 {
		b = -b
	}
	// Magnitudes in, sign out: the quotient of the magnitudes with the sign
	// reapplied truncates toward zero by construction.
	negative := (dividend < 0) != (divisor < 0)
	quotient := int64(0)
	for a >= b {
		// Find the largest chunk = b doubled (by addition) that still fits
		// in a; multiple doubles alongside it as the chunk's weight.
		chunk := b
		multiple := int64(1)
		for a >= chunk+chunk {
			chunk += chunk
			multiple += multiple
		}
		a -= chunk
		quotient += multiple
	}
	if negative {
		return -int(quotient)
	}
	return int(quotient)
}
