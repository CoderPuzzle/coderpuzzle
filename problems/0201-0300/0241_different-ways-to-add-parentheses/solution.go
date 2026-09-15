import (
	"sort"
	"strconv"
)

// Every operator takes its turn as the root of the expression tree, so each
// split contributes the cross product of the values its two sides can
// produce; a range without an operator is a single operand whose only
// grouping is the number itself.
func values(expression string, lo, hi int) []int64 {
	results := []int64{}
	split := false
	for i := lo; i < hi; i++ {
		op := expression[i]
		if op != '+' && op != '-' && op != '*' {
			continue
		}
		split = true
		for _, left := range values(expression, lo, i) {
			for _, right := range values(expression, i+1, hi) {
				switch op {
				case '+':
					results = append(results, left+right)
				case '-':
					results = append(results, left-right)
				default:
					results = append(results, left*right)
				}
			}
		}
	}
	if !split {
		operand, _ := strconv.ParseInt(expression[lo:hi], 10, 64)
		results = append(results, operand)
	}
	return results
}

func diffWaysToCompute(expression string) []int64 {
	results := values(expression, 0, len(expression))
	// The recursion emits each root operator's cross products in string
	// order; one ascending sort turns that into the pinned order, and
	// nothing dedupes, so equal values from different groupings survive.
	sort.Slice(results, func(a, b int) bool { return results[a] < results[b] })
	return results
}
