import (
	"strconv"
	"strings"
)

// Reverse the digit string, cut it into runs of three, join with '.', then
// reverse back — the chunk boundaries land exactly on multiples of three
// counted from the units digit.
func thousandSeparator(n int) string {
	digits := []byte(strconv.Itoa(n))
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}

	var groups []string
	for i := 0; i < len(digits); i += 3 {
		end := i + 3
		if end > len(digits) {
			end = len(digits)
		}
		groups = append(groups, string(digits[i:end]))
	}
	joined := []byte(strings.Join(groups, "."))
	for i, j := 0, len(joined)-1; i < j; i, j = i+1, j-1 {
		joined[i], joined[j] = joined[j], joined[i]
	}
	return string(joined)
}
