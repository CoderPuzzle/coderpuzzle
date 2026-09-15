func decimalRepresentation(n int) []int {
	// Each nonzero digit contributes exactly one base-10 component -- its
	// digit times the place it sits at -- and this count is optimal: adding
	// terms can only merge nonzero positions, never create them.
	components := make([]int, 0, 10)
	// The place walks one step past 10^9 on the final multiply, so it is
	// kept in int64 rather than relying on the platform's int width.
	for place := int64(1); n > 0; place *= 10 {
		digit := int64(n % 10)
		if digit > 0 {
			components = append(components, int(digit*place))
		}
		n /= 10
	}
	// Peeled from the ones place up, so reverse into descending order.
	for i, j := 0, len(components)-1; i < j; i, j = i+1, j-1 {
		components[i], components[j] = components[j], components[i]
	}
	return components
}
