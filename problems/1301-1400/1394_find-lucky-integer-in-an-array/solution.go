func findLucky(arr []int) int {
	// Values are bounded by 500, so a fixed tally array replaces a hash
	// map. Scanning it downward returns the largest value whose count
	// equals the value itself; -1 survives when none matches.
	var counts [501]int
	for _, value := range arr {
		counts[value]++
	}
	for value := 500; value > 0; value-- {
		if counts[value] == value {
			return value
		}
	}
	return -1
}
