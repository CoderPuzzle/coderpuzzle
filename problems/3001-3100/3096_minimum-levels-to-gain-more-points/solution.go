func minimumLevels(possible []int) int {
	// Map cleared levels to +1 and failed ones to -1. A split after t
	// levels wins exactly when 2 * prefix(t) > total: Alice's points are
	// her prefix sum, Bob's the remaining suffix, and she ends strictly
	// ahead iff the two differ by more than zero in either direction.
	total := 0
	for _, value := range possible {
		if value == 1 {
			total++
		} else {
			total--
		}
	}
	prefix := 0
	// Scan splits ascending; Bob must play at least one level, so the
	// loop stops one short of the last element.
	for i := 0; i < len(possible)-1; i++ {
		if possible[i] == 1 {
			prefix++
		} else {
			prefix--
		}
		if 2*prefix > total {
			return i + 1
		}
	}
	return -1
}
