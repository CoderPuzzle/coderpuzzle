import (
	"strings"
)

// One left-to-right pass: a '(' hands control to the matching ')', the
// enclosed key goes through the map, everything else is copied verbatim.
// Values are bracket-free, so nothing emitted is ever re-examined.
func evaluate(s string, knowledge [][]string) string {
	known := make(map[string]string, len(knowledge))
	for _, pair := range knowledge {
		known[pair[0]] = pair[1]
	}
	var out strings.Builder
	i, n := 0, len(s)
	for i < n {
		if s[i] == '(' {
			j := strings.IndexByte(s[i:], ')')
			if v, ok := known[s[i+1:i+j]]; ok {
				out.WriteString(v)
			} else {
				out.WriteByte('?')
			}
			i += j + 1
		} else {
			out.WriteByte(s[i])
			i++
		}
	}
	return out.String()
}
