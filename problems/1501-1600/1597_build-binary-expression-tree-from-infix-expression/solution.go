type parser struct {
	text string
	pos  int
}

func (p *parser) parseExpr() int64 {
	value := p.parseTerm()
	for p.pos < len(p.text) && (p.text[p.pos] == '+' || p.text[p.pos] == '-') {
		op := p.text[p.pos]
		p.pos++
		rhs := p.parseTerm()
		if op == '+' {
			value += rhs
		} else {
			value -= rhs
		}
	}
	return value
}

func (p *parser) parseTerm() int64 {
	value := p.parseFactor()
	for p.pos < len(p.text) && (p.text[p.pos] == '*' || p.text[p.pos] == '/') {
		op := p.text[p.pos]
		p.pos++
		rhs := p.parseFactor()
		if op == '*' {
			value *= rhs
		} else {
			value /= rhs // Go's integer division truncates toward zero.
		}
	}
	return value
}

func (p *parser) parseFactor() int64 {
	if p.text[p.pos] == '(' {
		p.pos++
		value := p.parseExpr()
		p.pos++ // skip ')'
		return value
	}
	value := int64(p.text[p.pos] - '0')
	p.pos++
	return value
}

func buildAndEvaluate(s string) int64 {
	p := &parser{text: s}
	return p.parseExpr()
}
