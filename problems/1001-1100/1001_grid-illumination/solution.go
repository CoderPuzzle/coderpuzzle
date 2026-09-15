func gridIllumination(n int, lamps [][]int, queries [][]int) []bool {
	row := map[int]int{}
	col := map[int]int{}
	diag := map[int]int{}
	antiDiag := map[int]int{}
	on := map[[2]int]bool{}

	for _, lamp := range lamps {
		x, y := lamp[0], lamp[1]
		key := [2]int{x, y}
		if on[key] {
			continue
		}
		on[key] = true
		row[x]++
		col[y]++
		diag[x-y]++
		antiDiag[x+y]++
	}

	ans := make([]bool, len(queries))
	for i, query := range queries {
		x, y := query[0], query[1]
		ans[i] = row[x] > 0 || col[y] > 0 || diag[x-y] > 0 || antiDiag[x+y] > 0

		for dx := -1; dx <= 1; dx++ {
			for dy := -1; dy <= 1; dy++ {
				px, py := x+dx, y+dy
				key := [2]int{px, py}
				if on[key] {
					delete(on, key)
					row[px]--
					col[py]--
					diag[px-py]--
					antiDiag[px+py]--
				}
			}
		}
	}

	return ans
}
