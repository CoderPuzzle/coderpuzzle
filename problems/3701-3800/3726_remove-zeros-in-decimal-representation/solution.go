func removeZeros(n int64) int64 {
	// Rebuild the answer while peeling digits off n's least significant
	// end: place tracks the slot the next surviving digit occupies, and
	// zero digits fall through without touching result or place. int64
	// keeps n (up to 10^15) and the packed result in range.
	result := int64(0)
	place := int64(1)
	for m := n; m > 0; m /= 10 {
		if digit := m % 10; digit != 0 {
			result += digit * place
			place *= 10
		}
	}
	return result
}
