import (
	"sort"
	"strconv"
	"strings"
)

// Scan the formula once with an explicit stack of count maps. '(' opens a
// fresh map; an element name — one uppercase letter plus any lowercase run —
// lands its count (implicit 1) in the top map; ')' pops the top map, reads
// the optional trailing multiplier, and folds every atom into the parent
// scaled by it. The bottom map left at the end holds the totals, written in
// sorted name order with counts of 1 omitted.
func countOfAtoms(formula string) string {
	var stack []map[string]int64
	stack = append(stack, map[string]int64{})
	readCount := func(i int) (int64, int) {
		j := i
		for j < len(formula) && formula[j] >= '0' && formula[j] <= '9' {
			j++
		}
		if j == i {
			return 1, i
		}
		v, _ := strconv.ParseInt(formula[i:j], 10, 64)
		return v, j
	}
	i, n := 0, len(formula)
	for i < n {
		switch formula[i] {
		case '(':
			stack = append(stack, map[string]int64{})
			i++
		case ')':
			mult, j := readCount(i + 1)
			group := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			top := stack[len(stack)-1]
			for name, cnt := range group {
				top[name] += cnt * mult
			}
			i = j
		default:
			j := i + 1
			for j < n && formula[j] >= 'a' && formula[j] <= 'z' {
				j++
			}
			name := formula[i:j]
			cnt, k := readCount(j)
			top := stack[len(stack)-1]
			top[name] += cnt
			i = k
		}
	}
	counts := stack[0]
	names := make([]string, 0, len(counts))
	for name := range counts {
		names = append(names, name)
	}
	sort.Strings(names)
	var out strings.Builder
	for _, name := range names {
		out.WriteString(name)
		if counts[name] > 1 {
			out.WriteString(strconv.FormatInt(counts[name], 10))
		}
	}
	return out.String()
}
