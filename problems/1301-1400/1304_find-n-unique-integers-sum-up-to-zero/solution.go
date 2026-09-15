func sumZero(n int) []int {
	// Walk from -n/2 to n/2, skipping 0 for even n; every value pairs with
	// its negation so the array sums to zero with n distinct values.
	half := n / 2
	result := make([]int, 0, n)
	for value := -half; value <= half; value++ {
		if value == 0 && n%2 == 0 {
			continue
		}
		result = append(result, value)
	}
	return result
}
