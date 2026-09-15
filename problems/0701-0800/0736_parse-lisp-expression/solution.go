import (
	"strconv"
	"strings"
)

func evaluate(expression string) int {
	spaced := strings.ReplaceAll(strings.ReplaceAll(expression, "(", " ( "), ")", " ) ")
	tokens := strings.Fields(spaced)

	isVar := func(t string) bool {
		c := t[0]
		return c >= 'a' && c <= 'z'
	}

	// A token at position i starts the final expression of a let iff it is
	// "(...", a literal, or a variable immediately followed by ")".
	exprStart := func(i int) bool {
		t := tokens[i]
		if t == "(" || !isVar(t) {
			return true
		}
		return tokens[i+1] == ")"
	}

	var parse func(i int, env map[string]int) (int, int)
	parse = func(i int, env map[string]int) (int, int) {
		token := tokens[i]
		if token != "(" {
			if isVar(token) {
				return env[token], i + 1
			}
			v, _ := strconv.Atoi(token)
			return v, i + 1
		}
		op := tokens[i+1]
		i += 2
		if op == "add" || op == "mult" {
			a, i1 := parse(i, env)
			b, i2 := parse(i1, env)
			if op == "add" {
				return a + b, i2 + 1
			}
			return a * b, i2 + 1
		}
		// let
		local := make(map[string]int, len(env)+4)
		for k, v := range env {
			local[k] = v
		}
		value := 0
		for tokens[i] != ")" {
			if exprStart(i) {
				v, ni := parse(i, local)
				value = v
				i = ni
			} else {
				vr := tokens[i]
				v, ni := parse(i+1, local)
				value = v
				i = ni
				local[vr] = v
			}
		}
		return value, i + 1
	}

	result, _ := parse(0, map[string]int{})
	return result
}
