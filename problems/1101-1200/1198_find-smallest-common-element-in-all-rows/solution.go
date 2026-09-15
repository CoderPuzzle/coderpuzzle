func smallestCommonElement(mat [][]int) int {
	tally := make([]int, 10001)
	for _, row := range mat {
		for _, value := range row {
			tally[value]++
		}
	}
	for value := 1; value <= 10000; value++ {
		if tally[value] == len(mat) {
			// Strictly increasing rows never repeat a value, so only a
			// value present in every row can reach count m.
			return value
		}
	}
	return -1
}
