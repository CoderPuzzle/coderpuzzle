import "strings"

// Only a proper divisor length can work: the block must divide n and be
// shorter than it, so s is at least two copies of the block.
func repeatedSubstringPattern(s string) bool {
	n := len(s)
	for d := 1; d <= n/2; d++ {
		if n%d != 0 {
			continue
		}
		if strings.Repeat(s[:d], n/d) == s {
			return true
		}
	}
	return false
}
