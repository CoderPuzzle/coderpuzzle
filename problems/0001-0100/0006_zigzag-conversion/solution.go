import "strings"

func convert(s string, numRows int) string {
	// One row never turns (the direction flag below could never flip), and
	// a grid taller than the text is a single pass down: either way the
	// zigzag is the string itself.
	if numRows == 1 || numRows >= len(s) {
		return s
	}
	rows := make([]strings.Builder, numRows)
	// Walk the string once, tracking the current row and direction; reverse
	// exactly at the top and bottom rows, where the zigzag turns.
	index, step := 0, -1
	for _, ch := range s {
		rows[index].WriteRune(ch)
		if index == 0 {
			step = 1
		} else if index == numRows-1 {
			step = -1
		}
		index += step
	}
	// Reading the rows top to bottom is the conversion.
	var result strings.Builder
	for i := range rows {
		result.WriteString(rows[i].String())
	}
	return result.String()
}
