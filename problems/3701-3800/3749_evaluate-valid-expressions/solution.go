import "strconv"

// Intermediate values reach ~2^62, so the whole pipeline is 64-bit.
func evaluateExpression(expression string) int64 {
	pos := 0
	return evalExpr(expression, &pos)
}

// One recursive descent covers the grammar; each call returns the value and
// advances *pos just past what it consumed.
func evalExpr(expr string, pos *int) int64 {
	ch := expr[*pos]
	// A digit or '-' starts a literal: optional sign, then digits.
	if ch == '-' || (ch >= '0' && ch <= '9') {
		j := *pos
		if ch == '-' {
			j++
		}
		for j < len(expr) && expr[j] >= '0' && expr[j] <= '9' {
			j++
		}
		v, _ := strconv.ParseInt(expr[*pos:j], 10, 64)
		*pos = j
		return v
	}
	// Otherwise a three-letter operator; +=4 lands just past "op(".
	op := expr[*pos : *pos+3]
	*pos += 4
	a := evalExpr(expr, pos)
	*pos++ // skip ","
	b := evalExpr(expr, pos)
	*pos++ // skip ")"
	// Apply the operator to the two sub-results as the recursion unwinds.
	switch op {
	case "add":
		return a + b
	case "sub":
		return a - b
	case "mul":
		return a * b
	default:
		return a / b
	}
}
