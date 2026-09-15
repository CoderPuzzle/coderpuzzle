func chalkReplacer(chalk []int, k int64) int {
	// Whole rounds consume sum(chalk); simulate only the remainder.
	var total int64
	for _, c := range chalk {
		total += int64(c)
	}
	k %= total
	for i, c := range chalk {
		if k < int64(c) {
			return i
		}
		k -= int64(c)
	}
	return -1 // unreachable: remainder < total
}
