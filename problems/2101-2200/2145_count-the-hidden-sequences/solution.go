func numberOfArrays(differences []int, lower int, upper int) int {
	prefix := int64(0)
	minimum := int64(0)
	maximum := int64(0)
	for _, difference := range differences {
		prefix += int64(difference)
		if prefix < minimum {
			minimum = prefix
		}
		if prefix > maximum {
			maximum = prefix
		}
	}
	available := int64(upper) - int64(lower) - (maximum - minimum) + 1
	if available < 0 {
		return 0
	}
	return int(available)
}
