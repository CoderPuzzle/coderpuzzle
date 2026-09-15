func calculateTax(brackets [][]int, income int) float64 {
	// Walk the brackets in order; each is taxed on the slice of income
	// between the previous upper bound and min(income, upper).
	var paid int
	var prev int
	for _, bracket := range brackets {
		upper, percent := bracket[0], bracket[1]
		if income <= upper {
			paid += (income - prev) * percent
			break
		}
		paid += (upper - prev) * percent
		prev = upper
	}
	// The product sum reaches 1e5 in the int; dividing once yields the
	// correctly rounded double of the rational total.
	return float64(paid) / 100
}
