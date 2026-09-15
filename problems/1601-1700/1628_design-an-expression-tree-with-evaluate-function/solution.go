import "strconv"

func buildAndEvaluate(postfix []string) int64 {
	stack := make([]int64, 0, len(postfix))
	for _, tok := range postfix {
		if len(tok) == 1 && (tok[0] == '+' || tok[0] == '-' || tok[0] == '*' || tok[0] == '/') {
			n := len(stack)
			a, b := stack[n-2], stack[n-1]
			stack = stack[:n-2]
			var value int64
			switch tok[0] {
			case '+':
				value = a + b
			case '-':
				value = a - b
			case '*':
				value = a * b
			default:
				value = a / b // Go's integer division truncates toward zero.
			}
			stack = append(stack, value)
		} else {
			v, _ := strconv.ParseInt(tok, 10, 64)
			stack = append(stack, v)
		}
	}
	return stack[len(stack)-1]
}
