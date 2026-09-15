import "strings"

// One left-to-right scan with a stack of open tag names. The outermost tag
// is special: it must open at position 0 and its end tag must be the last
// thing in the string, so any content seen while the stack is empty is an
// immediate rejection.
func isValid(code string) bool {
	var stack []string
	n := len(code)
	i := 0
	for i < n {
		if strings.HasPrefix(code[i:], "<![CDATA[") {
			// Cdata is legal only inside tag content, and its body runs to
			// the first "]]>" — everything between is opaque text.
			if len(stack) == 0 {
				return false
			}
			end := strings.Index(code[i:], "]]>")
			if end < 0 {
				return false
			}
			i += end + 3
		} else if strings.HasPrefix(code[i:], "</") {
			// An end tag's name runs to the next ">"; it must equal the most
			// recently opened tag, or the nesting is unbalanced.
			if len(stack) == 0 {
				return false
			}
			j := strings.IndexByte(code[i:], '>')
			if j < 0 || code[i+2:i+j] != stack[len(stack)-1] {
				return false
			}
			stack = stack[:len(stack)-1]
			if len(stack) == 0 && i+j != n-1 {
				return false // the outer tag closed, yet content remains
			}
			i += j + 1
		} else if code[i] == '<' {
			// A start tag: parse the name to the next ">" and gate it
			// through the strict grammar before it enters the stack.
			j := strings.IndexByte(code[i:], '>')
			if j < 0 {
				return false
			}
			name := code[i+1 : i+j]
			if !tagName(name) {
				return false
			}
			stack = append(stack, name)
			i += j + 1
		} else if len(stack) == 0 {
			return false // plain text outside any tag
		} else {
			i++
		}
	}
	return len(stack) == 0
}

// 1-9 characters, upper-case letters only.
func tagName(name string) bool {
	if len(name) < 1 || len(name) > 9 {
		return false
	}
	for k := 0; k < len(name); k++ {
		if name[k] < 'A' || name[k] > 'Z' {
			return false
		}
	}
	return true
}
