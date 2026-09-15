import "strconv"
import "strings"

// Stack machine: operands wait on the stack until an operator arrives, pops
// its two operands -- the second pop is the left one -- and pushes the result
// of applying itself.
func evalRPN(tokens []string) int {
	stack := make([]int64, 0, len(tokens)/2+1)
	for _, token := range tokens {
		// A one-character token drawn from the operator set: multi-character
		// tokens are numbers, including negatives like "-11".
		if len(token) == 1 && strings.Contains("+-*/", token) {
			b := stack[len(stack)-1]
			a := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			var result int64
			switch token[0] {
			case '+':
				result = a + b
			case '-':
				result = a - b
			case '*':
				result = a * b
			default:
				// Go's integer division already truncates toward zero.
				result = a / b
			}
			stack = append(stack, result)
		} else {
			value, _ := strconv.ParseInt(token, 10, 64)
			stack = append(stack, value)
		}
	}
	return int(stack[0])
}
