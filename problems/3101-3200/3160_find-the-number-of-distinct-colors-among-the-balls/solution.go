func queryResults(limit int, queries [][]int) []int {
	// Two maps carry the whole state: ball -> its current color, and
	// color -> how many balls currently wear it. A query is a pair of
	// counter bumps around a map read, and the size of the live-color
	// map answers the query without ever rescanning the balls.
	ballColor := make(map[int]int)
	colorCount := make(map[int]int)
	result := make([]int, 0, len(queries))
	for _, query := range queries {
		ball, color := query[0], query[1]
		if previous, ok := ballColor[ball]; ok {
			// The old color vanishes only when its last ball left.
			colorCount[previous]--
			if colorCount[previous] == 0 {
				delete(colorCount, previous)
			}
		}
		colorCount[color]++
		ballColor[ball] = color
		result = append(result, len(colorCount))
	}
	return result
}
