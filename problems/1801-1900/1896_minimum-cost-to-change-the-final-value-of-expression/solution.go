func minOperationsToFlip(expression string) int {
	// item: kind 0 -> operator ch; kind 1 -> value/cost pair
	type item struct {
		kind int
		ch   byte
		v    int
		c    int
	}

	combine := func(a, b [2]int, op byte) [2]int {
		va, ca := a[0], a[1]
		vb, cb := b[0], b[1]
		var v, c int
		if op == '&' {
			v = va & vb
			if v == 0 {
				if va == 0 && vb == 0 {
					c = minInt(ca, cb) + 1
				} else if va == 0 { // 0 & 1
					c = minInt(ca, 1)
				} else { // 1 & 0
					c = minInt(cb, 1)
				}
			} else { // 1 & 1
				c = minInt(ca, cb)
			}
		} else { // '|'
			v = va | vb
			if v == 0 { // 0 | 0 -> flip one operand to 1
				c = minInt(ca, cb)
			} else if va == 0 { // 0 | 1 -> flip b to 0 or switch to '&'
				c = minInt(cb, 1)
			} else if vb == 0 { // 1 | 0 -> flip a to 0 or switch to '&'
				c = minInt(ca, 1)
			} else { // 1 | 1 -> both must become 0, or flip one and switch to '&'
				c = minInt(ca, cb) + 1
			}
		}
		return [2]int{v, c}
	}

	evalSeq := func(values [][2]int, ops []byte) [2]int {
		result := values[0]
		for i := range ops {
			result = combine(result, values[i+1], ops[i])
		}
		return result
	}

	var stack []item
	for i := 0; i < len(expression); i++ {
		ch := expression[i]
		switch {
		case ch == '(':
			stack = append(stack, item{kind: 0, ch: '('})
		case ch == '&' || ch == '|':
			stack = append(stack, item{kind: 0, ch: ch})
		case ch == '0' || ch == '1':
			stack = append(stack, item{kind: 1, v: int(ch - '0'), c: 1})
		default: // ')'
			var values [][2]int
			var ops []byte
			for len(stack) > 0 && !(stack[len(stack)-1].kind == 0 && stack[len(stack)-1].ch == '(') {
				it := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				if it.kind == 0 {
					ops = append(ops, it.ch)
				} else {
					values = append(values, [2]int{it.v, it.c})
				}
			}
			stack = stack[:len(stack)-1] // remove '('
			for l, r := 0, len(values)-1; l < r; l, r = l+1, r-1 {
				values[l], values[r] = values[r], values[l]
			}
			for l, r := 0, len(ops)-1; l < r; l, r = l+1, r-1 {
				ops[l], ops[r] = ops[r], ops[l]
			}
			res := evalSeq(values, ops)
			stack = append(stack, item{kind: 1, v: res[0], c: res[1]})
		}
	}
	var values [][2]int
	var ops []byte
	for _, it := range stack {
		if it.kind == 0 {
			ops = append(ops, it.ch)
		} else {
			values = append(values, [2]int{it.v, it.c})
		}
	}
	return evalSeq(values, ops)[1]
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}
