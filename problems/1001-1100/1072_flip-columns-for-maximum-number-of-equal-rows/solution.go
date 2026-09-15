func maxEqualRowsAfterFlips(matrix [][]int) int {
	// column flips XOR one fixed mask onto every row at once, so a row
	// turns uniform iff it equals the mask or its complement: exactly
	// the identical-or-complementary rows can be fixed together
	counts := make(map[string]int)
	best := 0
	for _, row := range matrix {
		// canonical key: every cell XOR the row's own first cell —
		// identical rows and complementary rows collapse to one key
		key := make([]byte, len(row))
		for i, value := range row {
			key[i] = byte('0' + (value ^ row[0]))
		}
		counts[string(key)]++
		if counts[string(key)] > best {
			best = counts[string(key)]
		}
	}
	return best
}
