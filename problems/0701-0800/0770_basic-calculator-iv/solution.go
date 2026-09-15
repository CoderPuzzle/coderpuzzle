import (
	"sort"
	"strconv"
	"strings"
)

// One scan, two stacks: a stack of polynomials — each a map from a term
// (its variables, sorted, joined by '*'; "" is the constant term) to its
// coefficient — and a stack of pending operators. Every operand pushes a
// one-term polynomial; a variable listed in evalvars (or a number)
// becomes the constant term. '+' and '-' drain every pending operator
// down to '(', '*' drains only '*', and ')' drains to its matching '(' —
// precedence and brackets in four rules. Multiplying pairs every term of
// both sides, merging the two variable lists into one sorted list;
// adding merges coefficients of equal terms. Zero terms drop out at the
// end, where terms print degree-descending first and lexicographic
// within a degree, coefficient left of its variables. The result starts
// as an empty non-nil slice so a zero polynomial serializes as [].
func basicCalculatorIV(expression string, evalvars []string, evalints []int) []string {
	evalmap := make(map[string]int64, len(evalvars))
	for k, name := range evalvars {
		evalmap[name] = int64(evalints[k])
	}
	splitTerm := func(key string) []string {
		if key == "" {
			return nil
		}
		return strings.Split(key, "*")
	}
	degree := func(key string) int {
		if key == "" {
			return 0
		}
		return strings.Count(key, "*") + 1
	}
	isAlnum := func(ch byte) bool {
		return ch >= 'a' && ch <= 'z' || ch >= '0' && ch <= '9'
	}
	polys := []map[string]int64{}
	ops := []byte{}
	apply := func() {
		op := ops[len(ops)-1]
		ops = ops[:len(ops)-1]
		right := polys[len(polys)-1]
		polys = polys[:len(polys)-1]
		left := polys[len(polys)-1]
		polys = polys[:len(polys)-1]
		if op == '*' {
			product := map[string]int64{}
			for lkey, lcoef := range left {
				lvars := splitTerm(lkey)
				for rkey, rcoef := range right {
					merged := append(append([]string{}, lvars...), splitTerm(rkey)...)
					sort.Strings(merged)
					key := strings.Join(merged, "*")
					product[key] += lcoef * rcoef
				}
			}
			polys = append(polys, product)
		} else {
			sign := int64(1)
			if op != '+' {
				sign = -1
			}
			for key, coef := range right {
				left[key] += sign * coef
			}
			polys = append(polys, left)
		}
	}
	n := len(expression)
	i := 0
	for i < n {
		switch {
		case expression[i] == ' ':
			i++
		case expression[i] == '(':
			ops = append(ops, '(')
			i++
		case expression[i] == ')':
			for ops[len(ops)-1] != '(' {
				apply()
			}
			ops = ops[:len(ops)-1]
			i++
		case expression[i] == '+' || expression[i] == '-' || expression[i] == '*':
			ch := expression[i]
			for len(ops) > 0 {
				top := ops[len(ops)-1]
				if ch == '*' {
					if top != '*' {
						break
					}
				} else if top == '(' {
					break
				}
				apply()
			}
			ops = append(ops, ch)
			i++
		default:
			j := i
			for j < n && isAlnum(expression[j]) {
				j++
			}
			token := expression[i:j]
			poly := map[string]int64{}
			if token[0] >= '0' && token[0] <= '9' {
				value, _ := strconv.ParseInt(token, 10, 64)
				poly[""] = value
			} else if value, ok := evalmap[token]; ok {
				poly[""] = value
			} else {
				poly[token] = 1
			}
			polys = append(polys, poly)
			i = j
		}
	}
	for len(ops) > 0 {
		apply()
	}
	result := polys[0]
	type term struct {
		key  string
		coef int64
	}
	terms := []term{}
	for key, coef := range result {
		if coef != 0 {
			terms = append(terms, term{key, coef})
		}
	}
	sort.Slice(terms, func(x, y int) bool {
		dx, dy := degree(terms[x].key), degree(terms[y].key)
		if dx != dy {
			return dx > dy
		}
		return terms[x].key < terms[y].key
	})
	out := make([]string, 0, len(terms))
	for _, t := range terms {
		if t.key == "" {
			out = append(out, strconv.FormatInt(t.coef, 10))
		} else {
			out = append(out, strconv.FormatInt(t.coef, 10)+"*"+t.key)
		}
	}
	return out
}
