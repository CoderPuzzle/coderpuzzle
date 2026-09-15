func queryConversions(conversions [][]int, queries [][]int) []int {
	const mod = 1_000_000_007
	n := len(conversions) + 1
	// The edges form a tree rooted at unit 0. fromRoot[u] is the number of
	// units of type u equivalent to one unit of type 0: the residue of the
	// product of factors along the path from the root. Residues stay below
	// 2^30, but products reach 2^60, so widen to int64.
	children := make([][][2]int, n)
	for _, edge := range conversions {
		children[edge[0]] = append(children[edge[0]], [2]int{edge[1], edge[2]})
	}
	fromRoot := make([]int64, n)
	fromRoot[0] = 1
	stack := make([]int, 0, n)
	stack = append(stack, 0)
	for len(stack) > 0 {
		unit := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, edge := range children[unit] {
			fromRoot[edge[0]] = fromRoot[unit] * int64(edge[1]) % mod
			stack = append(stack, edge[0])
		}
	}
	// 1 unit of type a equals fromRoot[b] / fromRoot[a] units of type b.
	// Every factor is < mod, so no residue is 0 and the Fermat inverse
	// always exists.
	answer := make([]int, len(queries))
	for q, query := range queries {
		a, b := query[0], query[1]
		answer[q] = int(fromRoot[b] * power(fromRoot[a], mod-2, mod) % mod)
	}
	return answer
}

func power(value, exponent, mod int64) int64 {
	result := int64(1)
	for exponent > 0 {
		if exponent&1 == 1 {
			result = result * value % mod
		}
		value = value * value % mod
		exponent >>= 1
	}
	return result
}
