import "strings"

// Scan left to right. 'G' emits "G" and advances 1. An open paren
// can only begin "()" or "(al)": peek the next character — ')' emits
// "o" and advances 2, 'a' emits "al" and advances 4.
func interpret(command string) string {
	var out strings.Builder
	out.Grow(len(command))
	i := 0
	for i < len(command) {
		if command[i] == 'G' {
			out.WriteByte('G')
			i++
		} else if command[i+1] == ')' {
			out.WriteByte('o')
			i += 2
		} else {
			out.WriteString("al")
			i += 4
		}
	}
	return out.String()
}
