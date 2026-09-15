func baseUnitConversions(conversions [][]int) []int {
	// The conversions form a directed tree rooted at unit 0, so one BFS
	// fixes every answer: a child costs `factor` units per unit of its
	// parent, so its value is the parent's value times the factor. A
	// product reaches (10^9 + 6) * 10^9 ~ 10^18, so the multiply is an
	// int64 reduced modulo 10^9 + 7 before storing back into the int
	// result. The slice-as-queue keeps the walk iterative — a 10^5 chain
	// would outrun any recursion if this were depth-first.
	const MOD = 1000000007
	n := len(conversions) + 1
	type edge struct {
		target int
		factor int
	}
	children := make([][]edge, n)
	for _, e := range conversions {
		children[e[0]] = append(children[e[0]], edge{e[1], e[2]})
	}
	result := make([]int, n)
	result[0] = 1
	queue := make([]int, 0, n)
	queue = append(queue, 0)
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		for _, child := range children[node] {
			result[child.target] = int(int64(result[node]) * int64(child.factor) % MOD)
			queue = append(queue, child.target)
		}
	}
	return result
}
