import (
	"strings"
)

// A character missing its case-partner anywhere in the string can
// never sit inside a nice window: split on every offender and
// recurse. Segments with no offenders are entirely nice.
func longestNiceSubstring(s string) string {
	if len(s) < 2 {
		return ""
	}
	for i := 0; i < len(s); i++ {
		c := s[i]
		var other byte
		if c >= 'a' && c <= 'z' {
			other = c - 'a' + 'A'
		} else {
			other = c - 'A' + 'a'
		}
		if !strings.Contains(s, string(other)) {
			left := longestNiceSubstring(s[:i])
			right := longestNiceSubstring(s[i+1:])
			if len(left) >= len(right) {
				return left
			}
			return right
		}
	}
	return s
}
