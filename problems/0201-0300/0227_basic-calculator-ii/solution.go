func calculate(s string) int {
	// The expression is a plain sum of terms, each term a maximal chain of
	// */ : defer the additions and apply the operator that PRECEDED the
	// number just read, keeping fully evaluated terms on a stack.
	var stack []int64
	var num int64
	op := byte('+')
	last := len(s) - 1
	for i := 0; i <= last; i++ {
		ch := s[i]
		if ch >= '0' && ch <= '9' {
			num = num*10 + int64(ch-'0')
		}
		// Two separate ifs: a digit in the last position must both extend num
		// and trigger the final flush (else-if would drop the last term).
		if ch == '+' || ch == '-' || ch == '*' || ch == '/' || i == last {
			switch op {
			case '+':
				stack = append(stack, num)
			case '-':
				stack = append(stack, -num)
			case '*':
				// */ combines with the term currently on top.
				stack[len(stack)-1] *= num
			default:
				stack[len(stack)-1] /= num
			}
			op = ch
			num = 0
		}
	}
	// The answer is the sum of the deferred terms.
	var total int64
	for _, value := range stack {
		total += value
	}
	return int(total)
}
