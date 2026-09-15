// The rotation is *, /, +, - repeating. * and / bind tighter, so they only
// ever fold into the term on top of the stack; + and - always start a fresh
// term (pushed with its own sign already applied).
func clumsy(n int) int {
	stack := []int{n}
	opIdx := 0
	for i := n - 1; i >= 1; i-- {
		op := opIdx % 4
		opIdx++
		switch op {
		case 0:
			stack[len(stack)-1] *= i
		case 1:
			// Go's / already truncates toward zero, which is exactly what a
			// prior '-' push carrying its sign into this division needs: no
			// separate floor-vs-truncate handling required.
			stack[len(stack)-1] /= i
		case 2:
			stack = append(stack, i)
		default:
			stack = append(stack, -i)
		}
	}
	total := 0
	for _, term := range stack {
		total += term
	}
	return total
}
