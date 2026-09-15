import (
	"strconv"
	"strings"
)

func maxDiff(num int) int {
	s := strconv.Itoa(num)

	// Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
	big := s
	for i := 0; i < len(s); i++ {
		if s[i] != '9' {
			big = strings.ReplaceAll(s, string(s[i]), "9")
			break
		}
	}

	// Minimum: the leading digit goes to 1 when it can, otherwise the
	// first digit > 1 anywhere after goes to 0.
	small := s
	if s[0] != '1' {
		small = strings.ReplaceAll(s, string(s[0]), "1")
	} else {
		for i := 0; i < len(s); i++ {
			if s[i] != '0' && s[i] != '1' {
				small = strings.ReplaceAll(s, string(s[i]), "0")
				break
			}
		}
	}

	bigValue, _ := strconv.Atoi(big)
	smallValue, _ := strconv.Atoi(small)
	return bigValue - smallValue
}
