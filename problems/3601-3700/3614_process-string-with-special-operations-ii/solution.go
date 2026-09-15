// First pass: the length of the result after each prefix. '#' doubles it,
// '*' drops one (never below zero), a letter adds one, '%' leaves it
// untouched. The result can reach 10^15 characters, so the string itself is
// never built - only these lengths are kept.
func processStr(s string, k int64) string {
	n := len(s)
	length := make([]int64, n+1)
	for i := 0; i < n; i++ {
		switch s[i] {
		case '*':
			length[i+1] = length[i] - 1
			if length[i+1] < 0 {
				length[i+1] = 0
			}
		case '#':
			length[i+1] = length[i] * 2
		case '%':
			length[i+1] = length[i]
		default:
			length[i+1] = length[i] + 1
		}
	}
	if k >= length[n] {
		return "."
	}
	// Walk backwards, undoing each operation to map position k of the final
	// string back to the letter that produced it. The length array pins down
	// where each duplication and reversal boundary sits, so every step is
	// arithmetic, not string work.
	pos := k
	for i := n - 1; i >= 0; i-- {
		switch s[i] {
		case '*':
			// Removing the tail keeps every earlier position.
		case '#':
			if half := length[i]; pos >= half {
				pos -= half
			}
		case '%':
			pos = length[i] - 1 - pos
		default:
			if pos == length[i] {
				return string(s[i])
			}
		}
	}
	return "."
}
