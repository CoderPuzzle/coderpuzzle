import (
	"strconv"
	"strings"
)

func equalPairs(grid [][]int) int {
	// A pair (row, col) counts when both read as the identical sequence,
	// so hash each row once and look every column up in that multiset:
	// the count for a column is how many rows carry its exact sequence.
	// Values are <= 1e5, so a comma separator is unambiguous.
	n := len(grid)
	rowCounts := make(map[string]int)
	for _, row := range grid {
		var key strings.Builder
		for i, value := range row {
			if i > 0 {
				key.WriteByte(',')
			}
			key.WriteString(strconv.Itoa(value))
		}
		rowCounts[key.String()]++
	}
	pairs := 0
	for c := 0; c < n; c++ {
		var key strings.Builder
		for r := 0; r < n; r++ {
			if r > 0 {
				key.WriteByte(',')
			}
			key.WriteString(strconv.Itoa(grid[r][c]))
		}
		pairs += rowCounts[key.String()]
	}
	return pairs
}
