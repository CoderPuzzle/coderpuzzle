func parseBoolExpr(expression string) bool {
	value, _ := parseExpr(expression, 0)
	return value
}

func parseExpr(expression string, index int) (bool, int) {
	ch := expression[index]
	if ch == 't' {
		return true, index + 1
	}
	if ch == 'f' {
		return false, index + 1
	}
	op := ch
	index += 2 // skip the operator and '('
	var values []bool
	for {
		var value bool
		value, index = parseExpr(expression, index)
		values = append(values, value)
		if expression[index] == ',' {
			index += 1
		} else { // ')'
			index += 1
			break
		}
	}
	if op == '!' {
		return !values[0], index
	}
	if op == '&' {
		all := true
		for _, value := range values {
			all = all && value
		}
		return all, index
	}
	any := false
	for _, value := range values {
		any = any || value
	}
	return any, index
}
