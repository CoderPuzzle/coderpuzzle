func processQueries(queries []int, m int) []int {
	p := make([]int, m)
	for i := 1; i <= m; i++ {
		p[i-1] = i
	}
	result := make([]int, len(queries))
	for i, q := range queries {
		pos := 0
		for p[pos] != q {
			pos++
		}
		result[i] = pos
		p = append(p[:pos], p[pos+1:]...)
		p = append([]int{q}, p...)
	}
	return result
}
