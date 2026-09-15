import "strings"

// Strip the separators, then group by remaining length: while more
// than 4 digits remain, cut a block of 3; the final 4, 3, or 2 digits
// are forced — 4 splits into two blocks of 2, the rest stay whole.
func reformatNumber(number string) string {
	digits := make([]byte, 0, len(number))
	for i := 0; i < len(number); i++ {
		if c := number[i]; c >= '0' && c <= '9' {
			digits = append(digits, c)
		}
	}
	var blocks []string
	i := 0
	for len(digits)-i > 4 {
		blocks = append(blocks, string(digits[i:i+3]))
		i += 3
	}
	tail := string(digits[i:])
	if len(tail) == 4 {
		blocks = append(blocks, tail[:2], tail[2:])
	} else {
		blocks = append(blocks, tail)
	}
	return strings.Join(blocks, "-")
}
