func getNoZeroIntegers(n int) []int {
	// Smallest-a decomposition: arithmetic digit test, no strings.
	noZero := func(x int) bool {
		for x > 0 {
			if x%10 == 0 {
				return false
			}
			x /= 10
		}
		return true
	}
	for a := 1; a < n; a++ {
		if noZero(a) && noZero(n-a) {
			return []int{a, n - a}
		}
	}
	return nil
}
