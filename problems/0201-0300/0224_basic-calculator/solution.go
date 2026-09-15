func calculate(s string) int {
	// Only + and - appear, so the whole expression reduces to summing signed
	// terms: `result` is the running sum, `sign` the pending sign of the next
	// term, `num` the multi-digit number being assembled.
	result := 0
	sign := 1
	num := 0
	stack := []int{}
	for _, ch := range s {
		switch {
		case ch >= '0' && ch <= '9':
			num = num*10 + int(ch-'0')
		case ch == '+':
			// Fold the finished term in and record the next sign.
			result += sign * num
			num = 0
			sign = 1
		case ch == '-':
			// A leading '-' needs no special casing: it simply leaves
			// sign = -1 for the next term or group.
			result += sign * num
			num = 0
			sign = -1
		case ch == '(':
			// Save the outer context and evaluate the group afresh.
			stack = append(stack, result, sign)
			result = 0
			sign = 1
		case ch == ')':
			result += sign * num
			num = 0
			// sign sits at the top (pushed last): apply it to the inner
			// value and add the saved outer result back.
			result = result*stack[len(stack)-1] + stack[len(stack)-2]
			stack = stack[:len(stack)-2]
		}
		// spaces are ignored
	}
	// Fold in the final pending term.
	return result + sign*num
}
