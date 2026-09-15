import "strconv"

func addOperators(num string, target int) []string {
	n := len(num)
	results := []string{}

	// num.length <= 10, so every operand is < 1e10 and any run of '*'
	// operands stays under ~1e10; the running total never exceeds ~1e11,
	// which fits comfortably in an int64.
	// current is the expression's value so far; prev is the trailing
	// multiplicand chain that a later '*' binds to, not all of current.
	// The very first operand seeds both.
	var dfs func(index int, prev, current int64, expression []byte)
	dfs = func(index int, prev, current int64, expression []byte) {
		if index == n {
			// The evaluation travels with the search: one comparison.
			if current == int64(target) {
				results = append(results, string(expression))
			}
			return
		}
		var nxt int64
		// Each gap decides how far the operand extends, then the operator.
		for end := index; end < n; end++ {
			// A '0' at num[index] admits only the single-digit operand 0
			// (lone 0 legal, 01 not), so stop extending.
			if end != index && num[index] == '0' {
				break
			}
			nxt = nxt*10 + int64(num[end]-'0')
			lengthBefore := len(expression)
			if index == 0 {
				// The first operand seeds both the running total and the
				// trailing multiplicand chain.
				dfs(end+1, nxt, nxt, append(expression, []byte(strconv.FormatInt(nxt, 10))...))
			} else {
				// '+'/'-' fold nxt straight into current; the chain resets
				// to nxt (or -nxt so a later '*' reverses the subtraction).
				dfs(end+1, nxt, current+nxt, append(expression, append([]byte{'+'}, []byte(strconv.FormatInt(nxt, 10))...)...))
				dfs(end+1, -nxt, current-nxt, append(expression[:lengthBefore], append([]byte{'-'}, []byte(strconv.FormatInt(nxt, 10))...)...))
				// '*' rewrites the tail in place: drop the chain's old
				// contribution, add prev * nxt.
				dfs(end+1, prev*nxt, current-prev+prev*nxt, append(expression[:lengthBefore], append([]byte{'*'}, []byte(strconv.FormatInt(nxt, 10))...)...))
			}
			expression = expression[:lengthBefore]
		}
	}

	dfs(0, 0, 0, make([]byte, 0, 64))
	return results
}
