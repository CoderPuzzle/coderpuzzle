// Ternaries group right-to-left, so the subexpression closest to the right
// end is always complete first. Scanning backwards therefore meets every
// operand before the '?' that needs it.
func parseTernary(expression string) string {
	stack := make([]byte, 0, len(expression))
	for i := len(expression) - 1; i >= 0; i-- {
		c := expression[i]
		if c != '?' {
			stack = append(stack, c)
		} else {
			trueBranch := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			stack = stack[:len(stack)-1] // the ':' separating the two branches
			falseBranch := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			// The character just left of the '?' is the condition ('T' or
			// 'F'); it belongs to this conditional, so consume it as well.
			condition := expression[i-1]
			if condition == 'T' {
				stack = append(stack, trueBranch)
			} else {
				stack = append(stack, falseBranch)
			}
			i--
		}
	}
	return string(stack[len(stack)-1])
}
