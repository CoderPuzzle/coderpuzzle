// Every insertion of "abc" is reversible: removing an "abc" substring
// from a valid string leaves another valid string, all the way back to
// "". A stack turns that reversal into one pass — whenever the top three
// entries read a, b, c, they are the most recently completed insertion,
// so popping all three undoes it. s was reachable by the operation iff
// nothing is left over once the scan ends.
func isValid(s string) bool {
	stack := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		stack = append(stack, s[i])
		top := len(stack)
		if top >= 3 && stack[top-3] == 'a' && stack[top-2] == 'b' && stack[top-1] == 'c' {
			stack = stack[:top-3]
		}
	}
	return len(stack) == 0
}
