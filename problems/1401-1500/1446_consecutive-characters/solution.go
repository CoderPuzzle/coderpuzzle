func maxPower(s string) int {
	best, current := 1, 1
	for i := 1; i < len(s); i++ {
		if s[i] == s[i-1] {
			current++
			if current > best {
				best = current
			}
		} else {
			current = 1
		}
	}
	return best
}
