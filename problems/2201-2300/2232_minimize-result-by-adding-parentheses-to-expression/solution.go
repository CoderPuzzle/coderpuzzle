import "strconv"
import "strings"

func minimizeResult(expression string) string {
	plus := strings.Index(expression, "+")
	left, right := expression[:plus], expression[plus+1:]
	bestValue := int64(1)<<62 - 1
	bestForm := ""
	for i := 0; i < len(left); i++ {
		outerLeft := int64(1)
		if i > 0 {
			outerLeft, _ = strconv.ParseInt(left[:i], 10, 64)
		}
		innerLeft, _ := strconv.ParseInt(left[i:], 10, 64)
		for j := 1; j <= len(right); j++ {
			innerRight, _ := strconv.ParseInt(right[:j], 10, 64)
			outerRight := int64(1)
			if j < len(right) {
				outerRight, _ = strconv.ParseInt(right[j:], 10, 64)
			}
			value := outerLeft * (innerLeft + innerRight) * outerRight
			if value < bestValue {
				bestValue = value
				bestForm = left[:i] + "(" + left[i:] + "+" + right[:j] + ")" + right[j:]
			}
		}
	}
	return bestForm
}
