func calculate(s string) int {
	n := len(s)
	i := 0

	var expr func() int64
	var term func() int64
	var factor func() int64

	expr = func() int64 {
		value := term()
		for i < n && (s[i] == '+' || s[i] == '-') {
			op := s[i]
			i++
			rhs := term()
			if op == '+' {
				value += rhs
			} else {
				value -= rhs
			}
		}
		return value
	}

	term = func() int64 {
		value := factor()
		for i < n && (s[i] == '*' || s[i] == '/') {
			op := s[i]
			i++
			rhs := factor()
			if op == '*' {
				value *= rhs
			} else {
				value /= rhs
			}
		}
		return value
	}

	factor = func() int64 {
		if s[i] == '(' {
			i++
			value := expr()
			i++ // closing ')'
			return value
		}
		value := int64(0)
		for i < n && s[i] >= '0' && s[i] <= '9' {
			value = value*10 + int64(s[i]-'0')
			i++
		}
		return value
	}

	return int(expr())
}
