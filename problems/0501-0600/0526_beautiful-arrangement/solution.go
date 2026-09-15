// candidates[p]: the values position p admits — the divisors of p and the
// multiples of p up to n, the only values that can satisfy either
// divisibility condition at that position.
func countArrangement(n int) int {
	candidates := make([][]int, n+1)
	for p := 1; p <= n; p++ {
		for v := 1; v <= n; v++ {
			if v%p == 0 || p%v == 0 {
				candidates[p] = append(candidates[p], v)
			}
		}
	}
	used := make([]bool, n+1)

	var fill func(pos int) int
	fill = func(pos int) int {
		// Every position holds a value: one complete beautiful arrangement.
		if pos > n {
			return 1
		}
		total := 0
		for _, v := range candidates[pos] {
			if !used[v] {
				used[v] = true
				total += fill(pos + 1)
				used[v] = false
			}
		}
		return total
	}

	return fill(1)
}
