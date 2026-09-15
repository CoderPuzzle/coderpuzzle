func numberCount(a int, b int) int {
	hasUniqueDigits := func(value int) bool {
		seen := 0
		for value > 0 {
			bit := 1 << (value % 10)
			if seen&bit != 0 {
				return false
			}
			seen |= bit
			value /= 10
		}
		return true
	}
	count := 0
	for value := a; value <= b; value++ {
		if hasUniqueDigits(value) {
			count++
		}
	}
	return count
}
