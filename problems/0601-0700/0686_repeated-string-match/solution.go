import "strings"

// q = ceil(m/n) is the least count whose text is even as long as b, and no
// occurrence needs more than q + 1: a repeated forever has period n, so any
// occurrence of b slides into the first q + 1 copies. The answer is q, q+1,
// or -1 once neither text contains b.
func repeatedStringMatch(a string, b string) int {
	n, m := len(a), len(b)
	q := (m + n - 1) / n
	repeated := strings.Repeat(a, q)
	if strings.Contains(repeated, b) {
		return q
	}
	repeated += a
	if strings.Contains(repeated, b) {
		return q + 1
	}
	return -1
}
