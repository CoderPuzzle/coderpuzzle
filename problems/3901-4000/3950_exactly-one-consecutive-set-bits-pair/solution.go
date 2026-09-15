func consecutiveSetBits(n int) bool {
	pairs := 0
	previous := 0
	for n > 0 {
		current := n & 1
		if current == 1 && previous == 1 {
			pairs++
			if pairs > 1 {
				return false
			}
		}
		previous = current
		n >>= 1
	}
	return pairs == 1
}
