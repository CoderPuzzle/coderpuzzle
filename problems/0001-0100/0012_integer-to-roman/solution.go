import "strings"

func intToRoman(num int) string {
	// Folding the six subtractive forms into the value table and sorting it
	// descending makes plain greed exact: the largest value that fits is
	// always the symbol the decimal-place rules would pick.
	table := []struct {
		value  int
		symbol string
	}{
		{1000, "M"},
		{900, "CM"},
		{500, "D"},
		{400, "CD"},
		{100, "C"},
		{90, "XC"},
		{50, "L"},
		{40, "XL"},
		{10, "X"},
		{9, "IX"},
		{5, "V"},
		{4, "IV"},
		{1, "I"},
	}
	var result strings.Builder
	// Each value is consumed at most three times, so the walk is bounded by
	// the table, not by num.
	for _, entry := range table {
		for num >= entry.value {
			result.WriteString(entry.symbol)
			num -= entry.value
		}
	}
	return result.String()
}
