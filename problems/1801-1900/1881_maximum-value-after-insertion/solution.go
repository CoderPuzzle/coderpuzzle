func maxValue(n string, x int) string {
	// Positive: insert before the first digit < x (else append).
	// Negative: insert before the first digit > x (else append).
	d := byte('0' + x)
	neg := n[0] == '-'
	start := 0
	if neg {
		start = 1
	}
	for i := start; i < len(n); i++ {
		better := false
		if neg {
			better = n[i] > d
		} else {
			better = n[i] < d
		}
		if better {
			return n[:i] + string(d) + n[i:]
		}
	}
	return n + string(d)
}
